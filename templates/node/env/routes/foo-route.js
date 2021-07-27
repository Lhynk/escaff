const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { validateSchema } = require('../helpers/validators');

const { foo } = require('../controllers');

// Validator Scheme
const fooSchema = [
  body('name', 'Name is required').exists(),
  body('float').exists().isFloat(),
  body('range').exists().isInt({ gt: 0, lt: 3 }),
  body('int').exists().isInt(),
  body('optional').optional().isInt(),
];

router.get('/', foo.getFoo);

router.post('/:parameter', foo.postFoo);

router.put('/', foo.putFoo);

router.delete('/', validateSchema(fooSchema), foo.deleteFoo);

module.exports = router;
