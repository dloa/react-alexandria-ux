import React from 'react';
import AltContainer from 'alt-container';

import styles from './css/media.module.css';

import TXIDSearch from './search';

import InfoBox from './InfoBox';
import AlbumCover from './AlbumCover';
import PlayList from './PlayList';
import PWYW from './PWYW';

import testData from './tests/data.json';

import alt from './alt';

const Actions = {
    PWYWActions: alt.generateActions('showPWYW', 'hidePWYW'),
    TXIDActions: alt.generateActions('loadingTXID', 'recievedTXID', 'failedTXID'),
    FormatActions: alt.generateActions('setFormat')
}

const AlexandriaSource = {
    fetchTXID: {
        // remotely fetch something (required)
        remote(state, txid) {
            return TXIDSearch(state.servers.libraryd, txid)
        },

        local(state, txid) {
            return state.results[txid] ? state.results : null;
        },

        loading: Actions.TXIDActions.loadingTXID,
        success: Actions.TXIDActions.recievedTXID,
        error:   Actions.TXIDActions.failedTXID,

        shouldFetch(state) {
            return true
        }
    }
};

class StoreModel {
    constructor() {
        Object.keys(Actions).map(k => this.bindActions(Actions[k]));

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
        };

        this.registerAsync(AlexandriaSource);
    }

    onRecievedTXID(state) {
        this.setState(state)
    }

    onLoadingTXID(e) {
        console.error('loading TXID', e)
    }
    onFailedTXID(e) {
        console.error('failed TXID', e)
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

const Store = alt.createStore(StoreModel);

export default class Component extends React.Component {
    static defaultProps = {
        txid: 'fc9220025df5f2bf76fcda8f66bced4c95846e136ff3f5ff4c36fede3a5e3fc5'
    }

    constructor(props) {
        super(props);

        this.state = {
            txid: location.hash?location.hash.replace('#', ''):this.props.txid
        }

        Store.fetchTXID(this.state.txid);
    }

    render() {
        return (
                <AltContainer stores={{state: Store}} actions={Actions}
                render={props => {
                        if (Store.isLoading())
                            return <p>Loading Please Wait...</p>
                       return <Alexandria {...props}/>
                    }}/>
                )
    }
}

export class Alexandria extends React.Component {
    render() {
        let {state, PWYWActions} = this.props;
        console.log (this.props, this.state)

            return (
                <div className={styles.main}>
                    {state.PWYW.shown?
                     <PWYW {...state.PWYW} actions={PWYWActions} />:null
                    }
                     <div className={styles.container}>
                         <div className={styles.top}>
                             <InfoBox {...this.props} />
                             <AlbumCover {...state.cover}/>
                         </div>
                         <div className={styles.bottom}>
                             <PlayList tracks={state.tracks} author={state.mediaInfo.artist}/>
                         </div>
                     </div>
                </div>
            )
    }
}


