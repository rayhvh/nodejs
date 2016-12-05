var express = require('express');

var routes = function (CD) {
    var cdRouter = express.Router(); // we gebruiken de routing functie van express om de routes naar cds te maken
    var cdController = require('../Controllers/cdController')(CD);

    cdRouter.route('/') // de route als je /cds intyped in de client.  dan gaat die dit volgen
        .post(cdController.post)
        .get(cdController.get)

         .options(function (err,res) {
             res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
             res.sendStatus(200);
        // res.header('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    });
cdRouter.use('/:cdId', function (req,res,next) { // middelware waar je req als eerst aankomt

    CD.findById(req.params.cdId,function (err,CD) {//zoekt op id. via mongoose? en returned single
        if(err)
            res.status(500).send(err);
        else if (CD) // als cd bestaat op id.
        {
            req.CD = CD; // voeg aan de req je complete gevonden cd object toe
            next();
        }
        else
        {
            res.status(404).send('no cd found');
        }
    });
});
    cdRouter.route('/:cdId')  // als de route is bvb CDs/7123 zoekt mongoose op CDs database naar cd met id = 7123
        .get(function (req,res) {

            var newCD = req.CD.toJSON();
            newCD._links = {};
            newCD._links.self = {};
            newCD._links.self.href = 'http://' + req.headers.host + '/api/CDs/' + newCD._id;
            newCD._links.collection = {};
            newCD._links.collection.href = 'http://' + req.headers.host + '/api/CDs/';
            res.json(newCD);
            console.log("astublieft enkele cd");
        })
        .put (function (req,res) {
            if (req.body.title && req.body.author && req.body.genre){
                req.CD.title = req.body.title;
                req.CD.author = req.body.author;
                req.CD.genre = req.body.genre;
                req.CD.played = req.body.played;

                req.CD.save(function (err) {
                    if(err)
                        res.status(500).send(err);
                    else
                        res.json(req.CD);
                });
                console.log('putted new data');
            }
           else
            {
                var err = "empty";
                res.status(400).send(err);
            }

        })
        .patch(function (req,res) {
            if(req.body._id)
                delete req.body._id;
            for (var p in req.body)
            {
                req.CD[p] = req.body[p];
            }

            req.CD.save(function (err) {
                if(err)
                    res.status(500).send(err);
                else
                    res.json(req.CD);
            });
        })
        .delete(function (req,res) {
            req.CD.remove(function (err) {
                if(err)
                    res.status(500).send(err);
                else
                   res.status(204).send("removed");
            });
        });
    return cdRouter;
};

module.exports = routes;