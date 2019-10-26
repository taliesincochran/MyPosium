const router = require("express").Router();
const axios = require('axios');
//================================================================
//fix the destination and origin issue by making get route a post.
//================================================================
router.get('/zipcode/:zipcode', function(req,res) {
	const queryUrl = `https://www.zipcodeapi.com/rest/vnI7ZbrLcsJ1kwwkXWeBOM2dkWu0Fn63eNKWAwWAVYuvypn5p20NeIaiIHLeQntK/info.json/${req.params.zipcode}/degrees`;
	axios.get(queryUrl).then(result => res.json(result.data));
});

router.post('/destinations', function(req,res) {
	const { destinations, zip } = req.body;
	const queryUrl = `https://www.zipcodeapi.com/rest/vnI7ZbrLcsJ1kwwkXWeBOM2dkWu0Fn63eNKWAwWAVYuvypn5p20NeIaiIHLeQntK/multi-distance.json/${zip}/${destinations}/mile`;
	axios.get(queryUrl).then(result=> res.json(result.data));
});
module.exports = router;