# 💻 Escaff 💻
## _Scaffold tool for projects_

Escaff is a tool to create easy and quick projects using already created templates

- Select type of project
- Choose what template to use
- ✨Magic ✨

Escaff uses
- [caporal](https://github.com/mattallty/Caporal.js)
- [colors](https://github.com/Marak/colors.js)
- [prompt](https://github.com/flatiron/prompt#readme)
- [shelljs](http://github.com/shelljs/shelljs)

Also is inspired on this [article](https://www.sitepoint.com/scaffolding-tool-caporal-js/)

## Installation
Install dependencies and link escaff to your system
 <pre><code>
 cd escaff
 npm install
 npm link
 </code></pre>
 
## How to use
Run Escaff inside the container folder, this folder needs to be empty.
Currently only support Node project with .env file

<pre><code>
escaff create node --variant env
<br>
</code></pre>

