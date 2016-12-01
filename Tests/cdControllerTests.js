var should = require('should'),
    sinon = require('sinon');

describe('Book controller tests:', function () {
    describe('Post', function () {
        it('should not allow an empty title on post', function () {
            var CD = function (cd) {this.save = function () {}};

            var req = {
                body: {
                    author:'ray'
                }
            }

            var res = {
                status: sinon.spy(),
                send:sinon.spy()
            }

            var cdController = require('../Controllers/cdController')(CD);

            cdController.post(req,res);
            res.status.calledWith(400).should.equal(true, 'Bad Status' + res.status.args[0][0]);
            res.send.calledWith('Title is required').should.equal(true);
        })
    })
})