var cdController = function (CD) {

  var post = function (req,res) {
      var cd = new CD(req.body);

      if(!req.body.title || !req.body.genre || !req.body.author ){
          res.status(400);
          res.send('Title and genre and author is required');
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

          var returnCollection={};
              returnCollection.items = [];
              returnCollection._links = {};
              returnCollection._links.self = {};
              returnCollection._links.self.href = 'http://' + req.headers.host + '/api/CDs/';
              returnCollection.pagination = {};
              returnCollection.pagination.currentPage = 1;

              CDs.forEach(function (element,index,array) {
                  var newCD = element.toJSON();
                    newCD._links = {};
                    newCD._links.self={};
                    newCD._links.self.href = 'http://' + req.headers.host + '/api/CDs/' + newCD._id;
                    newCD._links.collection = {};
                    newCD._links.collection.href = 'http://' + req.headers.host + '/api/CDs/';
                    returnCollection.items.push(newCD);
              });
              res.json(returnCollection);//
      });
  }

  return {
      post:post,
      get:get
  }

}
module.exports = cdController;