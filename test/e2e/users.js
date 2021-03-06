const chai = require('chai');
const expect = chai.expect;
const helper = require('./helper');
let users

/**
 * Synchronous code
 * When testing synchronous code, omit the callback and Mocha will automatically continue on to the next test.
 */
describe('#Users', () => {
    // before hook
    before(() => {
        return helper.login()
                .then((res) => {
                    users = res
                })
    })

    let userId
    let userRole
    describe('#ADMIN', () => {
        it('should create new user with SELLER role', () => {
            return users.admin
                    .post('/api/users')
                    .send({
                        ...userPartial,
                        full_name: 'Lewis Hamilton',
                        username: 'lewis',
                        password: 'abc123',
                        email: 'lewis@f1.com',
                        role: 'SELLER'
                    })
                    .then((res) => {
                        expect(res.statusCode).to.be.equal(200)
                    })
                    .catch(error => console.log(error))
        })

        it('should create new user with BUYER role', () => {
            return users.admin
                    .post('/api/users')
                    .send({
                        ...userPartial,
                        full_name: 'Fernando Alonso',
                        username: 'alonso',
                        password: 'abc123',
                        email: 'alonso@f1.com',
                        role: 'BUYER'
                    })
                    .then((res) => {
                        userId = res.body.id
                        userRole = res.body.role
                        expect(res.statusCode).to.be.equal(200)
                    })
                    .catch(error => console.log(error))
        })

        it('should view user', () => {
            return users.admin
                    .get(`/api/users/${userId}`)
                    .then((res) => {
                        expect(res.statusCode).to.be.equal(200)
                        expect(res.body.id).to.be.equal(userId)
                        expect(res.body.role).to.be.equal(userRole)
                    })
                    .catch(error => console.log(error))
        })
        it('should return todos list', () => {
            return users.admin.get('/api/todos-local')
                    .then((res) => {
                        expect(res.statusCode).to.be.equal(200)
                    })
        })
        it.skip('should logout', function () {
            // this.timeout(10000) // this does not work if we use arrow functions.
            return users.admin.get('/api/auth/logout-local')
                    .then((res) => {
                        expect(res.statusCode).to.be.equal(200)
                    })
        })
    
        it.skip('should forbidden to access todo list', function () {
            // this.timeout(10000) // this does not work if we use arrow functions.
            return users.admin.get('/api/todos-local')
                    .then((res) => {
                        expect(res.statusCode).to.be.equal(401)
                    })
        })
    })

    describe('#SELLER', () => {
        it('should NOT allowed to create new user', () => {
            return users.buyer
                    .post('/api/users')
                    .send({
                        ...userPartial,
                        full_name: 'Lewis Hamilton',
                        username: 'lewis',
                        password: 'abc123',
                        email: 'lewis@f1.com',
                        role: 'SELLER'
                    })
                    .then((res) => {
                        expect(res.statusCode).to.be.equal(403)
                    })
        })
        it('should view user', () => {
            return users.admin
                    .get(`/api/users/${userId}`)
                    .then((res) => {
                        expect(res.statusCode).to.be.equal(200)
                        expect(res.body.id).to.be.equal(userId)
                        expect(res.body.role).to.be.equal(userRole)
                    })
                    .catch(error => console.log(error))
        })
        it('should return todos list', () => {
            return users.admin.get('/api/todos-local')
                    .then((res) => {
                        expect(res.statusCode).to.be.equal(200)
                    })
        })
    })

    describe('#BUYER', () => {
        it('should NOT allowed to create new user', () => {
            return users.buyer
                    .post('/api/users')
                    .send({
                        ...userPartial,
                        full_name: 'Lewis Hamilton',
                        username: 'lewis',
                        password: 'abc123',
                        email: 'lewis@f1.com',
                        role: 'SELLER'
                    })
                    .then((res) => {
                        expect(res.statusCode).to.be.equal(403)
                    })
        })
        it('should view user', () => {
            return users.admin
                    .get(`/api/users/${userId}`)
                    .then((res) => {
                        expect(res.statusCode).to.be.equal(200)
                        expect(res.body.id).to.be.equal(userId)
                        expect(res.body.role).to.be.equal(userRole)
                    })
                    .catch(error => console.log(error))
        })
        it('should return todos list', () => {
            return users.admin.get('/api/todos-local')
                    .then((res) => {
                        expect(res.statusCode).to.be.equal(200)
                    })
        })
    })

    it('pending test => should return all users');
    // it.only('exclusive tests');
    // it.skip('inclusive tests');
});

// Source: Mocha documentation
describe.skip('Retries', function() {
    // Retry all tests in this suite up to 4 times
    this.retries(4);
  
    beforeEach(function() {
      browser.get('http://www.yahoo.com');
    });
  
    it('should succeed on the 3rd try', function() {
      // Specify this test to only retry up to 2 times
      this.retries(2);
      expect($('.foo').isDisplayed()).to.eventually.be.true;
    });
});

const userPartial = {
    type: 'PUBLIC',
    phone: 1234455,
    city: 'KL',
    state: 'WP',
    post_code: 12121212,
    country: 'Malaysia',
    status: 1,
}