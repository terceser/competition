const trigger = require('../models').trigger;
const round = require('../models').round;
const user = require('../models').user;

module.exports = {
  create(req, res) {
    const created_date = new Date();
    return trigger.
      create({
        comment: req.body.comment,
        created_date: created_date,
        id_source: req.body.source.id,
        id_round: req.params.idRound,
        id_author: req.body.author.id,
      }).then((triggerBdd) => {
        round.findById(req.params.idRound, {
          include: [
            {
              model: trigger,
              as: 'triggers'
            }
          ]
        }).then(roundBdd => {
          const triggersByPerson = roundBdd.triggers.filter(r => { return r.id_source == req.body.source.id });
          if (triggersByPerson.length == roundBdd.max_trigger) {
            //winner here
            console.log("winner");
            roundBdd.update({ id_winner: req.body.source.id }).then(roundBddUpdated => {
              console.log(roundBddUpdated);
            })
              .catch(error => res.status(400).send(error))
          }
        })
      }
      )
      .catch((error) => {
        console.log(error);
        res.status(400).send(error)
      });
  },
  addTrigger(req, res) {
    return round.findById(req.params.idRound, {
      include: [
        {
          model: trigger,
          as: 'triggers'
        }
      ]
    }).then(roundBdd => {
      if (roundBdd.id_winner) {
        res.status(400).send({ message: "ALREADY TERMINATED" });
      }
      else {
        const created_date = new Date();
        trigger.
          create({
            comment: req.body.comment,
            created_date: created_date,
            id_source: req.body.source.id,
            id_round: req.params.idRound,
            id_author: req.body.author.id,
          }).then(triggerCreated => {

            const triggersByPersonLength = roundBdd.triggers.filter(r => { return r.id_source == req.body.source.id }).length + 1;
            if (triggersByPersonLength == roundBdd.max_trigger) {
              user.findById(req.body.author.id).then(author => {
                user.findById(req.body.source.id).then(source => {
                  let bodyText = "<h3>Informations :</h3><br>";
                  bodyText += "<p>Added by : " + author.nickname + "</p>";
                  bodyText += "<p>Added to : " + source.nickname + "</p>";
                  bodyText += "<p>Added at : " + created_date + "</p>";
                  bodyText += "<p>Comment : " + req.body.comment + "</p>";
                  require('../tools/mailing').sendMail("[Winner] Final Trigger added for Round : " + roundBdd.title, bodyText);
                });
              });

              //winner here
              roundBdd.update({ id_winner: req.body.source.id }).then(roundBddUpdated => {
                res.status(200).send(roundBddUpdated);
              })
                .catch(error => res.status(400).send(error))
            }
            else {
              user.findById(req.body.author.id).then(author => {
                user.findById(req.body.source.id).then(source => {
                  let bodyText = "<h3>Informations :</h3><br>";
                  bodyText += "<p>Added by : " + author.nickname + "</p>";
                  bodyText += "<p>Added to : " + source.nickname + "</p>";
                  bodyText += "<p>Added at : " + created_date + "</p>";
                  bodyText += "<p>Comment : " + req.body.comment + "</p>";
                  require('../tools/mailing').sendMail("Trigger added for Round : " + roundBdd.title, bodyText);
                });
              });
              res.status(200).send(roundBdd);
            }
          });
      }
    }).catch(error => {
      console.log(error);
      res.status(400).send(error);
    })
  }
}