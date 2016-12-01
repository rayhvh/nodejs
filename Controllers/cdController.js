var cdController = function (CD) {

  var post = function (req,res) {
      var cd = new CD(req.body);

      if(!req.body.title){
          res.status(400);
          res.send('Title is required');
      }
      else {
          cd.save();
          res.status(201);
          res.send(cd);
      }
  }
  var get = function (req,res) {// als de methode get gebruikt word. doe het volgende

      var query = {}; // lege query

      if(req.query.genre) // als de user ?genre parameter gebruikt dan add deze in query
      {
          query.genre = req.query.genre;
      }
      CD.find(query,function (err,CDs) { // zoek met mongoose idk how. uit de db via het model de cd's in array json
          if(err)
              res.status(500).send(err);
          else
              res.json(CDs);// response in json met cd models gevonden
      });
  }

  return {
      post:post,
      get:get
  }

}
module.exports = cdController;