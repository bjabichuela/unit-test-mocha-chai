const { exchangeRates } = require('../src/util.js');

module.exports = (app) => {
	app.get('/', (req, res) => {
		return res.send();
	});

	app.get('/rates', (req, res) => {
		return res.send({ex: exchangeRates});
	})

	app.post('/currency', (req, res) => {
		//create if conditions here to check the currency
	
		if(!req.body.hasOwnProperty('name')){
            return res.status(400).send({
                'Error': 'Bad request - missing required parameter name'
            })
        }
		if(typeof(req.body.hasOwnProperty('name')) !== 'string'){
            return res.status(400).send({
                'Error': 'Bad request - name is not a string'
            })
        }
		if(req.body.hasOwnProperty('name').length == 0){
            return res.status(400).send({
                'Error': 'Bad request - name is empty'
            })
        }
		if(!req.body.hasOwnProperty('ex')){
            return res.status(400).send({
                'Error': 'Bad request - missing required parameter ex'
            })
        }
		if(typeof(req.body.hasOwnProperty('ex')) !== 'object'){
            return res.status(400).send({
                'Error': 'Bad request - ex is not an object'
            })
        }
		if(req.body.hasOwnProperty('ex').length == 0){
            return res.status(400).send({
                'Error': 'Bad request - ex is empty'
            })
        }
		if(!req.body.hasOwnProperty('alias')){
            return res.status(400).send({
                'Error': 'Bad request - missing required parameter alias'
            })
        }
		if(typeof(req.body.hasOwnProperty('alias')) !== 'string'){
            return res.status(400).send({
                'Error': 'Bad request - alias is not an object'
            })
        }
		if(req.body.hasOwnProperty('alias').length == 0){
            return res.status(400).send({
                'Error': 'Bad request - alias is empty'
            })
        }
        const noDuplicate = new Set(exchangeRates.filter((value, index, self) => self.indexOf(value) === index));
		if(!noDuplicate && !req.body.hasOwnProperty('alias', 'name', 'ex').length == 0){
			return res.status(400).send({
                'Error': 'Bad request - alias has a duplicate value'
            })
		}
		if(noDuplicate && req.body.hasOwnProperty('name', 'ex')){
                return res.status(200).send({
                    'Message': 'Fields are complete'
                })
		}
            return res.status(200).send({
                'Message': 'Route is running'
            })		
	})
}

