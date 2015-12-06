import axios from 'axios';
import alt from '../alt';
import utils from '../utils';

export const BTCAverageActions = utils.generateSourceActions('BTCAverage');
export const BTCAverageSource = utils.simpleCachingSource(
    'BTCAverage', BTCAverageActions, () => (
        axios.get('https://api.bitcoinaverage.com/ticker/global/USD/')
            .then(res => (res.data['24h_avg']))
    )
)
