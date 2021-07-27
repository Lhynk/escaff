const prompt = require('prompt');
const shell = require('shelljs');
const fs = require('fs');
const colors = require('colors/safe');
var spawnSync = require('child_process').spawnSync;

prompt.message = colors.magenta('Replace');

module.exports = async (args, option, logger) => {
  const variant = option.variant || 'default';
  const templatePath = `${__dirname}/../templates/${args.template}/${variant}`;
  const variables = require(`${__dirname}/../templates/${args.template}/_variables.js`);
  const localPath = process.cwd();

  // Copy files
  if (fs.existsSync(templatePath)) {
    logger.info('📲 Creating project structure...');
    shell.cp('-r', `${templatePath}/*`, localPath);
    shell.cp('-r', `${templatePath}/.*`, localPath);
    logger.info(colors.green('👌 Project structure created!'));
  } else {
    logger.error(`The requested template for ${args.template} wasn't found`);
    process.exit(1);
  }

  prompt.start();

  // Replace values on package.json
  await fillVariables(variables, logger);

  await initializeGit(logger);

  await installDependencies(logger);

  logger.info('🍾 Success!');
};

async function fillVariables(variables, logger) {
  prompt.message = colors.magenta('Replace');

  logger.info();

  logger.info('📝 Please fill the following values...');

  const result = await prompt.get(variables);
  shell.ls('-Rl', '.').forEach(entry => {
    if (entry.isFile()) {
      variables.forEach(variable => {
        shell.sed('-i', `\\[${variable.toUpperCase()}\\]`, result[variable], entry.name);
      });
    }
  });
}

async function installDependencies(logger) {
  const property = {
    name: 'yesno',
    message: 'Install all the dependencies? (y/n)',
    validator: /y[es]*|n[o]?/,
    default: 'n',
  };

  logger.info();
  prompt.message = '💻';

  const { yesno } = await prompt.get(property);

  if (yesno === 'y') {
    logger.info('⏰ Installing dependencies...');

    runCommand('npm install');
    logger.info();
    logger.info(colors.green('👌 Dependencies Installed!'));
    logger.info();
  }
}

async function initializeGit(logger) {
  const property = {
    name: 'yesno',
    message: 'Initialize git repository? (y/n)',
    validator: /y[es]*|n[o]?/,
    default: 'n',
  };

  logger.info();
  prompt.message = '💻';

  const { yesno } = await prompt.get(property);

  if (yesno === 'y') {
    runCommand('git init');

    logger.info(colors.green('👌 Git Initialized!'));
  }
}

function runCommand(command) {
  spawnSync(command, { stdio: 'inherit', shell: true });
}
