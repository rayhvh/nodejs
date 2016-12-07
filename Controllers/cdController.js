var cdController = function (CD) {
    var newPageNext, newPagePrev;

    var post = function (req, res) {
        var cd = new CD(req.body);


        if (!req.body.title || !req.body.genre || !req.body.author) {
            res.status(400);
            res.send('Title and genre and author is required');
        }
        else {
            cd.save();
            res.status(201);
            res.send(cd);
        }
    }
    var get = function (req, res) {// als de methode get gebruikt word. doe het volgende

        var query = {}; // lege query
        var page = parseInt(req.query.start) || 1; // haalt pagina uit GET of is 1

        if (req.accepts('JSON')) {
            if (req.query.genre) // als de user ?genre parameter gebruikt dan add deze in query
            {
                query.genre = req.query.genre;
            }
            CD.find(query, function (err, CDs) { // zoek met mongoose idk how. uit de db via het model de cd's in array json
                if (err)
                    res.status(500).send(err);
                else

                    var countItems = CDs.length; // aantal cds
                    var limit = parseInt(req.query.limit) || countItems; // limiet uit GET of totaal items.
                    if(limit > countItems){ // als limiet groter is als items dan is limiet nu evengroot.
                    limit = countItems;
                    }
                    var totalPages = Math.ceil(countItems / limit); // paginas is aantal items door limiet. 100/20 = 5
                   if(page < totalPages){ // huidige page 1 of uit get. = kleiner als totaal paginas? dan is de volgende pagina huidige pagina +1
                        newPageNext = page + 1;
                   }
                    if(page > 1){
                        newPagePrev = page - 1; // lees hierboven als pagina 2 of meer is dan is vorige huidige p -1
                    }
                    if (page == totalPages)
                    {
                        newPageNext = page;
                    }
                    if (page == 1)
                    {
                        newPagePrev = page;
                    }

                var returnCollection = {};
                    returnCollection.items = []; // word later ingevuld door cds foreach.
                    returnCollection._links = {};
                    returnCollection._links.self = {};
                    returnCollection._links.self.href = 'http://' + req.headers.host + '/api/CDs/';


                    returnCollection.pagination = {};
                    returnCollection.pagination.currentPage = page;
                    returnCollection.pagination.currentItems = limit;
                    returnCollection.pagination.totalPages = totalPages;
                    returnCollection.pagination.totalItems = countItems;

                    var paginationLinks = returnCollection.pagination._links = {};
                    paginationLinks.first = {page: 1, href: 'http://' + req.headers.host + '/api/CDs/?' + 'start=' + 1 + '&limit=' + limit};
                    paginationLinks.last = {page: totalPages, href:'http://' + req.headers.host + '/api/CDs/?' + 'start=' + totalPages + '&limit=' + limit};
                    paginationLinks.previous = {page: newPagePrev, href:'http://' + req.headers.host + '/api/CDs/?' + 'start=' + newPagePrev + '&limit=' + limit};
                    paginationLinks.next = {page: newPageNext, href:'http://' + req.headers.host + '/api/CDs/?' + 'start=' + newPageNext + '&limit=' + limit};

                CDs.forEach(function (element, index, array) {
                    var newCD = element.toJSON();
                    newCD._links = {};
                    newCD._links.self = {};
                    newCD._links.self.href = 'http://' + req.headers.host + '/api/CDs/' + newCD._id;
                    newCD._links.collection = {};
                    newCD._links.collection.href = 'http://' + req.headers.host + '/api/CDs/';
                    returnCollection.items.push(newCD);
                });
                res.json(returnCollection);//
            });
        }
        else {
            var err = "no support json";
            res.status(400).send(err);
        }

    }

    return {
        post: post,
        get: get
    }

}

function currentItems(total,start,limit) {

}

function numberOfPages(total,start,limit) {

}

function currentPage(total,start,limit) {

}

function getFirstQueryString(total,start,limit) {

}

function getLastQueryString(total,start,limit) {

}

function getPreviousQueryString(total,start,limit) {

}

function getNextString(total,start,limit) {

}

function getPagination(total,start,limit) {

}

module.exports = cdController;