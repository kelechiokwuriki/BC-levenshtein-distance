const axios = require('axios');


module.exports = {
    validateAccountDetails(accountNumber, bankCode, accountName) {
        const paystackApiKey = process.env.PAYSTACK_API_KEY;
        let paystackApiUrl = process.env.PAYSTACK_API_URL;
        console.log(paystackApiUrl);
        // const config = {
        //     headers: { Authorization: `Bearer ${paystackApiKey}` }
        // };

        // const result = axios.get(`${paystackApiUrl}/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`, '', config).then(
        //     result => {
        //         console.log('result', result.data);
        //     }
        // ).catch(error => {
        //     console.log('error', error);
        // });

        // console.log(result);
    }
}