const round = require('../models').round;
const trigger = require('../models').trigger;
const user = require('../models').user;

module.exports = {
    list(req, res) {
        return round
            .findAll({
                order: [
                    ['id', 'DESC']
                ],
                include: [
                    {
                        model: trigger,
                        as: 'triggers',
                        include: [{
                            model: user,
                            as: 'source',
                            attributes: ['id']
                        }],
                        order: [
                            ['id', 'DESC']
                        ],
                    },
                    {
                        model: user,
                        as: 'author',
                        attributes: ['id']
                    }]
            })
            .then((roundsBdd) => {
                res.status(200).send(roundsBdd)
            }
            )
            .catch((error) => {
                console.log(error);
                res.status(400).send(error)
            });
    },
    retrieve(req, res) {
        return round.
            findById(req.params.id, {
                include: [
                    {
                        model: trigger,
                        as: 'triggers',
                        include: [{
                            model: user,
                            as: 'source',
                            attributes: ['id']
                        }],
                        order: [
                            ['id', 'DESC']
                        ],
                    },
                    {
                        model: user,
                        as: 'author',
                        attributes: ['id']
                    }]
            }).then((roundBdd) => res.status(200).send(roundBdd))
            .catch((error) => res.status(400).send(error));
    },
    create(req, res) {
        const created_date = new Date();
        return round.
            create({
                title: req.body.title,
                description: req.body.description,
                max_trigger: req.body.max_trigger,
                created_date: created_date,
                id_author: req.body.author.id,
                url_image: req.body.url_image
            }).then((roundBdd) => {
                user.findById(req.body.author.id).then(author => {
                    let bodyText = "<h3>Informations :</h3><br>";
                    bodyText += "<p>Created by : " + author.nickname + "</p>";
                    bodyText += "<p>Created at : " + created_date + "</p>";
                    bodyText += "<p>Title : " + req.body.title + "</p>";
                    bodyText += "<p>Description : " + req.body.description + "</p>";
                    bodyText += "<p>Max Trigger : " + req.body.max_trigger + "</p>";
                    bodyText += "<p>URL Image : " + req.body.url_image + "</p>";
                    require('../tools/mailing').sendMail("Round created : " + req.body.title, bodyText);
                });

                res.status(200).send(roundBdd)
            }
            )
            .catch((error) => res.status(400).send(error));
    },
    update(req, res) {
        round.
            findById(req.params.id).then(round => {
                round.update({
                    url_image: req.body.url_image
                }).then(roundBdd => {
                    res.status(200).send(roundBdd)
                }).catch((error) => res.status(400).send(error));
            })
    }
}