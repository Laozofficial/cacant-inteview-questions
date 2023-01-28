const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it } = require('mocha');
const server = require('./index');

chai.should();
chai.use(chaiHttp);

describe('User API', () => {
    const token = process.env.BEARER_TOKEN;

    // TEST THE GET ROUTE
    describe('GET /api/user/', () => {
        it('it should GET logged in user information', (done) => {
            chai.request(server)
                .get('/api/user/')
                .set({ "Authorization": `Bearer ${token}` })
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    done();
                })
        })
    })

    describe('GET /api/user/users', () => {
        it('it should GET all users', (done) => {
            chai.request(server)
                .get('/api/user/users')
                .set({ "Authorization": `Bearer ${token}` })
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    done();
                })
        })
    })


    describe('GET /api/user/login', () => {
        it('it should POST user Login details', (done) => {
            chai.request(server)
                .get('/api/user/login')
                .send({
                    'email': 'laozofficial@gmail.com',
                    'password': '123456789'
                })
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    done();
                })
        })
    })

    describe('GET /api/user/store-user', () => {
        it('it should POST signup detail', (done) => {
            chai.request(server)
                .get('/api/user/store-user')
                .send({
                    'email': 'laozofficial@gmail.com',
                    'assword': '123456789',
                    'firstName': 'Loaz',
                    'lastName': 'ellison',
                })
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    done();
                })
        })
    })

})