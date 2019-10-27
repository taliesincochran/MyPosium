const router = require("express").Router();
const axios = require('axios');
const apiKey = '';
//================================================================
//fix the destination and origin issue by making get route a post.
//================================================================
router.get('/zipcode/:zipcode', function(req,res) {
	const queryUrl = `https://www.zipcodeapi.com/rest/${apiKey}/info.json/${req.params.zipcode}/degrees`;
	axios.get(queryUrl).then(result => res.json(result.data));
});

router.post('/destinations', function(req,res) {
	// const queryUrl = `https://www.zipcodeapi.com/rest/${apiKey}/multi-distance.json/${zip}/${destinations}/mile`;
	// axios.get(queryUrl).then(result=> {
		// console.log('result: ', result);

	return res.json({data: {}});
	// });
});
module.exports = router;