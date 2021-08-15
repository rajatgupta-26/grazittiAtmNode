const HttpStatus = require('http-status-codes');

const ping = async (req, res) => {
	res.status(HttpStatus.OK).json({RESPONSE_DESC: "app is heathly"});
}

module.exports ={
	ping
}
