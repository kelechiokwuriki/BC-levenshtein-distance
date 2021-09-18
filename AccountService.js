const axios = require('axios');
const paystackApiKey = process.env.PAYSTACK_API_KEY;
const paystackApiUrl = process.env.PAYSTACK_API_URL;

module.exports = {
    validateAccountDetails(accountNumber, bankCode, accountName) {
        const config = {
            headers: { Authorization: `Bearer ${paystackApiKey}` }
        };

        axios.get(`${paystackApiUrl}/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`, config)
        .then(result => {
                console.log('result', result.data);
        }).catch(error => {
            console.log('error', error);
        });
    }
}