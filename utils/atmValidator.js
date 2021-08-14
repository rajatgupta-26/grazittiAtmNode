const constants = require('../utils/constants')

const validateRequiredCurrency = ({requiredCurreny}) =>{

	let isSupported = true;
    const unSupportedCurrencies = [];
    requiredCurreny.map(requiredNote => {
        let j;
        for ( j = 0; j < constants.DEFAULT_CURRENCY_AVAILABLE.length; j++) {
            if (requiredNote == constants.DEFAULT_CURRENCY_AVAILABLE[j])
                break;
        }
        if(j == constants.DEFAULT_CURRENCY_AVAILABLE.length){
            isSupported = false;
            unSupportedCurrencies.push(requiredNote);
        }
    })


    if(!isSupported){
        throw `${unSupportedCurrencies} are not supported`;
    }

    return true;
}

const validateAmount = ({amount}) => {
    if (amount < 10){
    	throw 'Amount is less than 10';
    }
    return true;
}

module.exports ={
	validateRequiredCurrency,
	validateAmount
}