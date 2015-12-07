import alt from '../alt';
import utils from '../utils';

import TXIDSearch from '../sources/TXID';
import {BTCAverageSource} from '../sources/BitCoinAverage';

export const Actions = {
    PWYWActions: alt.generateActions('showPWYW', 'hidePWYW'),
    TXIDActions: utils.generateSourceActions('TXID'),
    FormatActions: alt.generateActions('setFormat')
}

const AlexandriaSource = utils.simpleCachingSource(
    'TXID', Actions.TXIDActions, (state, txid) => {
        return TXIDSearch(state.servers.libraryd, txid)
    }
)

class StoreModel {
    constructor() {
        Object.keys(Actions).map(k => this.bindActions(Actions[k]));
        this.registerAsync(AlexandriaSource);
        this.registerAsync(BTCAverageSource);

        this.state = {
            servers: {
                libraryd: 'libraryd.alexandria.media',
                ipfs: 'ipfs.alexandria.media'
            },
            results: {},
            mediaInfo: {
                artist: null,
                title: null,
            },
            formats: {
                options: [],
                selected: null
            },
            PWYW: {
                shown: false,
                type: 'pin'
            },
            tracks: [],
            cover: null,
            prices: {},
            failed: false
        };
    }

    onTXIDSuccess(state) {
        this.setState(state)
    }

    onTXIDLoading(e) {
        console.error('loading TXID', e)
        this.state.txid = e
    }
    
    onTXIDFailed(e) {
        this.state.failed = 'Could not get TX object from TXID';
    }

    onBTCAverageSuccess(avg) {
        this.state.btcAvg = avg;
    }

    onShowPWYW(type) {
        this.state.PWYW.shown = true;
        this.state.PWYW.type  = type;
    }

    onHidePWYW() {
        this.state.PWYW.shown = false
    }

    onSetFormat(format) {
        this.state.formats.selected = format
    }
}

export default alt.createStore(StoreModel);
