const router = require("express").Router();
const axios = require('axios');

router.get('/zipcode/:zipcode', function(req,res) {
	axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${req.params.zipcode || 5000}&destinations=27510&key=AIzaSyCEBI9Lm5hy3v-Dx18hokmV6_fXbVbXEm0`).then(result=>{
		res.json(result.data)
	})
})
router.get('/destinations/:destinations', function(req,res) {
	axios.post(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${req.params.destinations || 5000}&destinations=27510&key=AIzaSyCEBI9Lm5hy3v-Dx18hokmV6_fXbVbXEm0`).then(result=>{
		res.json(result.data)
	})
})
module.exports = router;