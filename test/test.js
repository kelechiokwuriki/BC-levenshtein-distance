require('dotenv').config()
const expect = require('chai').expect;
const nock = require('nock');
const AccountService = require('../AccountService');
const paystackApiKey = process.env.PAYSTACK_API_KEY;

const config = {
    headers: { Authorization: `Bearer ${paystackApiKey}` }
};

const response = {
    status: true,
    message: 'Account number resolved',
    data: {
      account_number: '2058559716',
      account_name: 'KELECHI MATHEW OKWURIKI',
      bank_id: 18
    }
}

describe('Validate user account details test', () => {
  beforeEach(() => {
    nock('https://api.paystack.co')
    .get(`/bank/resolve?account_number=2058559716&bank_code=033`)
      .reply(200, response);
  });

  it('Should validate bank account details of a user', () => {
    return AccountService.validateAccountDetails('2058559716', '033')
      .then(response => {
        expect(typeof response).to.equal('object');
        expect(response.data.account_number).to.equal(response.data.account_number);
        expect(response.data.account_name).to.equal(response.data.account_name)
      });
  });
});