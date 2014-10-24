/**
 * Created by Sarah on 10/23/2014.
 *
 * expect(res).to.exist;
 expect(res.status).to.equal(200);
 expect(res.body).to.contain('world');
 */


var request = require('superagent');
var expect = require('expect.js');



describe('Client-Side', function(){
    var request = require('superagent');
    var expect = require('expect.js');

    describe('Main page', function(){
        it("should get 'Hello World!'", function(done){
            request.get('localhost:3000').end(function(res){
                expect(res).to.exist;
                expect(res.status).to.equal(200);
                expect(res.text).to.contain("World");
                done();
            });
        });

        it("should display input text from a form.", function(done){
            request.post('localhost:3000')
                .send({field: "Test string."})
                .end(function(res){
                    expect(res).to.exist;
                    expect(res.status).to.equal(200);
                    expect(res.text).to.contain("Test");
                    done();
                })
        });
    });
});

/*
 multiple revisions for a file
 multiple revisions for multiple files
 files in conflicted SVN states
 files that were SVN merged
 files that were deleted
 etc...*/
describe('ParseTests', function(){
    it("should take the most recent revision for a file", function(done){

    });
    it("should take the most recent revision for multiple files", function(done) {

    });
    it("should ")
});