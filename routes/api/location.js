const router = require("express").Router();
const axios = require('axios');
//================================================================
//fix the destination and origin issue by making get route a post.
//================================================================
router.get('/zipcode/:zipcode', async function(req,res) {
	const queryUrl = `https://www.zipcodeapi.com/rest/vnI7ZbrLcsJ1kwwkXWeBOM2dkWu0Fn63eNKWAwWAVYuvypn5p20NeIaiIHLeQntK/info.json/${req.params.zipcode}/degrees`;
	const result = await axios.get(queryUrl);
	res.json(result.data);
})
router.get('/destinations/:destinations', function(req,res) {
	console.log(req.params.destinations);
	axios.post(`https://maps.googleapis.com/maps/api/distancematrix/json?${req.params.destinations}&key=AIzaSyCEBI9Lm5hy3v-Dx18hokmV6_fXbVbXEm0`).then(result=>{
		res.json(result.data)
	})
})
module.exports = router;