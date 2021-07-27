const getFoo = async (req, res, next) => {
  return res.json('getFoo');
};
const postFoo = async (req, res, next) => {
  return res.json('postFoo');
};
const putFoo = async (req, res, next) => {
  return res.json('postFoo');
};
const deleteFoo = async (req, res, next) => {
  return res.json('postFoo');
};

module.exports = {
  getFoo,
  postFoo,
  putFoo,
  deleteFoo,
};
