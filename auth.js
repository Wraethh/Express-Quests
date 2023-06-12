const argon2 = require("argon2");

const hashPassword = (req, res, next) => {
  argon2
    .hash(req.body.password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 2,
      parallelism: 1,
    })
    .then((hashedPassword) => {
      req.body.hashedPassword = hashedPassword;
      delete req.body.password;
      next();
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};

module.exports = {
  hashPassword,
};
