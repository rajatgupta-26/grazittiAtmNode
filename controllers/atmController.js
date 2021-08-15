const HttpStatus = require('http-status-codes');
const validator = require('../utils/atmValidator')
const constants = require('../utils/constants')

const dispense = async (req, res) => {
	let { amount, requiredNotes} = req.query;
	console.log(`recieved request for ${amount} with ${requiredNotes}`);
	
	let requiredCurreny = []
	let isCurrencySpecified = false;

	try{
		if(requiredNotes){
			requiredCurreny = requiredNotes.split(',');
			requiredCurreny = sortCurrency(requiredCurreny);
			validator.validateRequiredCurrency({requiredCurreny})
			isCurrencySpecified = true;
		}
		validator.validateAmount({amount});
		const resp = calculateCurrency({requiredCurreny, amount, isCurrencySpecified});

		res.status(HttpStatus.OK).json({
	      RESPONSE_DESC: resp,
	      RESPONSE_CODE: constants.SUCCESS_CODE,
	      RESPONSE_STATUS: constants.SUCCESS
	    });

	} catch (e){
		res.status(HttpStatus.BAD_REQUEST).json({
	      RESPONSE_DESC: e,
	      RESPONSE_CODE: constants.FAIL_CODE,
	      RESPONSE_STATUS: constants.FAIL
	    });
	}
}

const calculateCurrency = ({requiredCurreny, amount, isCurrencySpecified}) => {
	const notesCounter = getNumberOfNotes({requiredCurreny, amount});
	try{
		let resp = {};
		for (let i = 0; i < notesCounter.length; i++) {
	        if(isCurrencySpecified){
	            if (notesCounter[i] != 0) {
					resp[requiredCurreny[i]] =  notesCounter[i]
	            }
	        } else{
	            if (notesCounter[i] != 0) {
	                resp[constants.DEFAULT_CURRENCY_AVAILABLE[i]] = notesCounter[i]
	            }
	        }
	    }
    	return resp;
	} catch(e){
		throw e;
	}
}

const getNumberOfNotes = ({amount,requiredCurreny}) => {
    try{
    	let numOfCurrencyAvailable = constants.DEFAULT_CURRENCY_AVAILABLE.length;
	    let currencyValue = constants.DEFAULT_CURRENCY_AVAILABLE;
	    if(requiredCurreny.length != 0){
	        numOfCurrencyAvailable = requiredCurreny.length;
	        currencyValue = requiredCurreny;
	    }
	    let {leftAmount, noteCounter} = compute(numOfCurrencyAvailable, amount, currencyValue);
	    if(leftAmount != 0){
	        throw "Amount entered can not be dispensed, Please select currency in multiple of 100";
	    }
	    return noteCounter;
	} catch(e){
		throw e;
	}
}

const compute = (length, amount, currencyValue) => {
	try{
		let currencyValueInt = currencyValue.map(function(item) {
			return parseInt(item, 10);
		});
		let noteCounter = [];
		let leftAmount=parseInt(amount, 10);

		for (let i = 0; i < length; i++) {
			let noteValue = currencyValueInt[i];
			if (leftAmount >= noteValue) {
			    noteCounter[i] = parseInt(leftAmount / noteValue);
			    leftAmount -= noteCounter[i] * noteValue;
			}
		}
		return {leftAmount, noteCounter};
	}catch(e){
		throw e;
	}
}


const sortCurrency = (arr) => {
	for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] < arr[j]) {
                let temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}



module.exports = {
	dispense
}