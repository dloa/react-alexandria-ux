import React from 'react';
import AltContainer from 'alt-container';

import styles from './css/media.module.css';

import InfoBox from './InfoBox';
import AlbumCover from './AlbumCover';
import PlayList from './PlayList';
import PWYW from './PWYW';

import testData from './tests/data.json';

import alt from './alt';

const Actions = alt.generateActions('showPWYW', 'hidePWYW');
class StoreModel {
    constructor() {
        this.bindActions(Actions);

        this.PWYW = {
            shown: false,
            type: null
        };
    }

    onShowPWYW(type) {
        console.log ('show', type)
        this.setState({
            PWYW: {
                shown: true,
                type: type
            }
        })
    }

    onHidePWYW(state) {
        this.setState({
            PWYW: {
                shown: false
            }
        })
    }
}

const Store = alt.createStore(StoreModel);

export default class Component extends React.Component {
    constructor(props) {
        super(props);

        console.error ('test data', testData)
        this.state = testData['media-data']['alexandria-media']['info']
    }

    render() {
        //console.log (this.props, this.state)
        return (
            <AltContainer stores={{state: Store}} actions={{actions: Actions}}>
                <Alexandria {...this.state}/>
            </AltContainer>
        )
    }
}

export class Alexandria extends React.Component {
    render() {
        let {state, actions} = this.props;
        let xinfo = this.props['extra-info'];

        return (
            <div className={styles.main}>
                {state.PWYW.shown?
                 <PWYW {...state.PWYW} actions={actions} />:null
                }
                <div className={styles.container}>
                    <div className={styles.top}>
                        <InfoBox {...this.props}/>
                        <AlbumCover {...xinfo}/>
                    </div>
                    <div className={styles.bottom}>
                        <PlayList tracks={xinfo.elements} author={xinfo.author}/>
                    </div>
                </div>
            </div>
        )
    }
}


