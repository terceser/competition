const user = require('../models').user;
module.exports = {
  list(req, res) {
    return user
      .findAll({
        attributes: { exclude: ['hash_password'] },
        order: [
          ['id', 'ASC']
        ],
      })
      .then((usersBdd) => {
        res.status(200).send(usersBdd)
      }
      )
      .catch((error) => res.status(400).send(error));
  },

  retrieve(req, res) {
    return user.
      findById(req.params.id).then((userBdd) => res.status(200).send(userBdd))
      .catch((error) => res.status(400).send(error));
  },
}