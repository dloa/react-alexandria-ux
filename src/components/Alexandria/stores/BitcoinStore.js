import axios from 'axios';

import alt from '../alt';
import utils from '../utils';

import {BTCAverageSource, BTCAverageActions} from '../sources/BitCoinAverage';

export const Actions = {
    PaymentAddress: utils.generateSourceActions('PaymentAddress', ['payToAddress']),
    CheckPayment: utils.generateSourceActions('CheckPayment')
}

export const PaymentAddressSource = utils.simpleCachingSource(
    'PaymentAddress', Actions.PaymentAddress, (state, address) => {
            return axios.get('https://blockchain.info/api/receive', {
                params: {
                    method: 'create',
                    address: address
                }
            }).then(res => (res.data.input_address))
        }
)

export const CheckPaymentSource = utils.simpleCachingSource (
    'CheckPayment', Actions.CheckPayment, (state, address, amount) => {
        return axios.get('https://blockchain.info/q/getreceivedbyaddress/' + address)
            .then(res => (res.data))
            .then(paidAmount => {
                if (paidAmount < amount)
                    throw new Error ('not paid')
                return paidAmount
            })
    }
);

class StoreModel {
    constructor() {
        Object.keys(Actions).map(k => this.bindActions(Actions[k]));
        this.registerAsync(PaymentAddressSource);
        this.registerAsync(CheckPaymentSource);

        this.bindActions(BTCAverageActions);
        this.registerAsync(BTCAverageSource);

        this.state = {
            address: null,
            status: false,
            paid: 0,
            required: 0
        }

    }

    onPayToAddress(address) {
        console.log ('getting new address')
        this.getInstance().payToAddress(address)
    }

    onPaymentAddressSuccess(address) {
        this.state.address = address;
        this.getInstance().checkPaymentDone(address, this.state.required)
    }

    onPaymentAddressLoading(e) {
        console.error('loading Address', e)
    }
    onPaymentAddressError(e) {
        console.error('failed Address', e)
    }
    onCheckPaymentLoading(required) {
        this.state.required = required
    }

    onCheckPaymentSucess(amount) {
        console.log ('payment done', amount);
        this.state.paid = amount
    }

    onCheckPaymentError(e) {
        console.error ('couldn\'t check payment', e)
    }

    onBTCAverageSuccess(avg) {
        this.state.btcusd = avg;
    }

    onBTCAverageFailed(e) {
        console.error ('avgbtc', e)
    }

}

export default alt.createStore(StoreModel);
