const chai = require('chai');
const expect = chai.expect;
const http = require('chai-http');
chai.use(http);

describe('forex_api_test_suite', (done) => {
	//add the solutions here
	const domain = 'http://localhost:5001';

	it('GET / endpoint', (done) => {
        chai.request(domain)
        .get('/') 
        .end((error, res) => 
		{
            expect(res.status).to.equal(200);
            done();
        })
    })

	it('GET /rates endpoint', (done) => {
        chai.request(domain)
        .get('/') 
        .end((error, res) => 
		{
            expect(res.status).to.equal(200);
            done();
        })
    })

	it('POST /currency endpoint name is missing', (done) => {
        chai.request(domain)
        .post('/currency')
        .type('json')
        .send({
			'alias': 'china',
			'ex': {
				'peso': 7.21,
				'usd': 0.14,
				'won': 168.85,
				'yen': 15.45
			  }
        })
        .end((err, res) => {
            expect(res.status).to.equal(400);
            done();
        })
    })

	it('POST /currency endpoint name is not a string', (done) => {
        chai.request(domain)
        .post('/currency')
        .type('json')
        .send({
			'alias': 'china',
			'name': 0,
			'ex': {
				'peso': 7.21,
				'usd': 0.14,
				'won': 168.85,
				'yen': 15.45
			  }
        })
        .end((err, res) => {
            expect(res.status).to.equal(400);
            done();
        })
    })

	it('POST /currency endpoint name is empty', (done) => {
        chai.request(domain)
        .post('/currency')
        .type('json')
        .send({
			'alias': 'china',
			'name': '',
			'ex': {
				'peso': 7.21,
				'usd': 0.14,
				'won': 168.85,
				'yen': 15.45
			  }
        })
        .end((err, res) => {
            expect(res.status).to.equal(400);
            done();
        })
    })

	it('POST /currency endpoint ex is missing', (done) => {
        chai.request(domain)
        .post('/currency')
        .type('json')
        .send({
			'alias': 'china',
			'name': 'Chinese Yuan'

        })
        .end((err, res) => {
            expect(res.status).to.equal(400);
            done();
        })
    })

	it('POST /currency endpoint ex is not an object', (done) => {
        chai.request(domain)
        .post('/currency')
        .type('json')
        .send({
			'alias': 'china',
			'name': 0,
			'ex': [{
				'peso': 7.21,
				'usd': 0.14,
				'won': 168.85,
				'yen': 15.45
			}]
        })
        .end((err, res) => {
            expect(res.status).to.equal(400);
            done();
        })
    })

	it('POST /currency endpoint ex is empty', (done) => {
        chai.request(domain)
        .post('/currency')
        .type('json')
        .send({
			'alias': 'china',
			'name': '',
			'ex': {}
        })
        .end((err, res) => {
            expect(res.status).to.equal(400);
            done();
        })
    })

	it('POST /currency endpoint alias is missing', (done) => {
        chai.request(domain)
        .post('/currency')
        .type('json')
        .send({
			'name': 'United States Dollar',
			'ex': {
			  'peso': 50.73,
			  'won': 1187.24,
			  'yen': 108.63,
			  'yuan': 7.03
		  }
        })
        .end((err, res) => {
            expect(res.status).to.equal(400);
            done();
        })
    })

	it('POST /currency endpoint alias is not a string', (done) => {
        chai.request(domain)
        .post('/currency')
        .type('json')
        .send({
			'alias': 1,
			'name': 0,
			'ex': {
				'peso': 7.21,
				'usd': 0.14,
				'won': 168.85,
				'yen': 15.45
			  }
        })
        .end((err, res) => {
            expect(res.status).to.equal(400);
            done();
        })
    })

	it('POST /currency endpoint ex is empty', (done) => {
        chai.request(domain)
        .post('/currency')
        .type('json')
        .send({
			'alias': '',
			'name': 'Philippine Peso',
			'ex':{
			  'usd': 0.020,
			  'won': 23.39,
			  'yen': 2.14,
			  'yuan': 0.14
			}
        })
        .end((err, res) => {
            expect(res.status).to.equal(400);
            done();
        })
    })

	it('POST /currency endpoint all fields are complete, duplicate values in alias', 
		(done) => {
        chai.request(domain)
        .post('/currency')
        .type('json')
        .send({
			'alias': 'Philippines',
			'alias': 'Philippines',
			'name': 'Philippine Peso',
			'ex':{
			  'usd': 0.020,
			  'won': 23.39,
			  'yen': 2.14,
			  'yuan': 0.14
			}
        })
        .end((err, res) => {
            expect(res.status).to.equal(400);
            done();
        })
    })

	it('POST /currency endpoint all fields are complete', (done) => {
		chai.request(domain)
		.post('/currency')
		.type('json')
		.send({
			'alias': 'usa',
			'name': 'United States Dollar',
			'ex': {
			  'peso': 50.73,
			  'won': 1187.24,
			  'yen': 108.63,
			  'yuan': 7.03
			}
		})
		.end((err, res) => {
			expect(res.status).to.equal(200);
			done();
	})

	it('POST /currency endpoint is running', (done) => {
		chai.request(domain)
		.post('/currency')
		.send()
		.end((error, res) => {
			expect(res.status).to.equal(200);
			done();
			})
		})	
	})
	
})
