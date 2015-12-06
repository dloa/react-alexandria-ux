import alt from './alt';
import axios from 'axios';

const Actions = alt.generateActions('payToAddress', 'AddressLoading', 'AddressCreated', 'AdressError', 'CheckingPayment', 'PaymentDone');

const PaymentSource = {
    payToAddress: {
        remote(state, address) {
            return axios.get('https://blockchain.info/api/receive', {
                params: {
                    method: 'create',
                    address: address
                }
            }).then(res => (res.data.input_address))
        },

        loading: Actions.AddressLoading,
        success: Actions.AddressCreated,
        error:   Actions.AddressError
    }
};

const PaymentDoneSource = {
    checkPaymentDone: {
        remote(state, address, amount) {
            return axios.get('https://blockchain.info/q/getreceivedbyaddress/' + address)
                .then(res => (res.data))
                .then(paidAmount => {
                    if (paidAmount < amount)
                        throw new Error ('not paid')
                    return paidAmount
                })
        },

        loading: Actions.CheckingPayment,
        success: Actions.PaymentDone,
    }
};

class StoreModel {
    constructor() {
        this.bindActions(Actions)

        this.state = {
            address: null,
            status: false,
            paid: 0,
            required: 0
        }

        this.registerAsync(PaymentSource);
        this.registerAsync(PaymentDoneSource);
    }

    onPayToAddress(address) {
        this.getInstance().payToAddress(address)
    }

    onAddressCreated(address) {
        this.state.address = address;
        this.getInstance().checkPaymentDone(address, this.state.required)
    }

    onAddressLoading(e) {
        console.error('loading Address', e)
    }
    onAddressError(e) {
        console.error('failed Address', e)
    }
    onCheckingPayment(required) {
        this.state.required = required
    }

    onPaymentDone(amount) {
        console.log ('payment done', amount);
        this.state.paid = amount
    }
}

export default alt.createStore(StoreModel);
