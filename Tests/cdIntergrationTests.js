var should = require('should'),
    request = require('supertest'),
    app= require('../express.js'),
    mongoose = require('mongoose'),
    CD = mongoose.model('CD'),
    agent = request.agent(app);


describe('CD Crud Test', function () {
    it('Should allow a cd to be posted and return a read and _id', function (done) {
        var cdPost = {title:'new CD', author:'ray', genre:'Gekkesjit'};

        agent.post('/api/CDs')
            .send(cdPost)
            .expect(200)
            .end(function (err,results) {
                results.body.played.should.equal(false);
                results.body.should.have.property('_id');
                done()
            })
    })
    afterEach(function (done) {
        CD.remove().exec();
        done();
    })
})