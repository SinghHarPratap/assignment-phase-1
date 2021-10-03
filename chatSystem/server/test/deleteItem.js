var assert = require('assert')
var app = require('../server.js')
var request = require('supertest')
var http = require('http')
let chai = require('chai')
let chaiHttp = require('chai-http')
let should = chai.should()
chai.use(chaiHttp)
const { expect } = require('chai');

describe.only('DELETE A USER via /api/deleteItem', function() {
  it('should give an error if user id not provided', function(done) {
    request(app)
      .post('/createUser')
      .end((err, res) => {
        if (err) done(err);
        expect(res.statusCode).to.be.equal(400);
        done();
      });
  })
  it('should delete a user whose user id is passed', function(done) {
    request(app)
      .post('/createUser')
      .send({
        id: 1,
        username: 'superadmin',
        pwd: 'abc123',
        role: 'superAdmin'
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res.statusCode).to.be.equal(200);
        done();
      });
  })
})
