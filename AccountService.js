const axios = require('axios');
const paystackApiKey = process.env.PAYSTACK_API_KEY;
const paystackApiUrl = process.env.PAYSTACK_API_URL;

module.exports = {
    async validateAccountDetails(accountNumber, bankCode, accountName) {
        const config = {
            headers: { Authorization: `Bearer ${paystackApiKey}` }
        };

        return axios.get(`${paystackApiUrl}/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`, config);
        

    }
}