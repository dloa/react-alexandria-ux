import React from 'react';
import styles from './css/media-info.module.css';

import MediaInfo from './MediaInfo';
import FormatSelector from './FormatSelector';
import ReleaseInfo from './ReleaseInfo';
import PWYW from './PWYW';
import BuyBox from './BuyBox';
import {PlayBarShadow} from './PlayBar';

export default class InfoBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showPwyw: this.props.showPwyw || false,
            showBuyBox: this.props.showBuyBox || false
        }
    }

    render() {

        let {state, PWYWActions, FormatActions} = this.props;
        let {mediaInfo, price, formats, data, ...other} = state;

        console.log ('INFOBOX', this.props, mediaInfo, formats);
        return (
            <div className={styles.main}>
                <MediaInfo {...mediaInfo}/>
                <FormatSelector  actions={FormatActions} {...formats}/>
                <ReleaseInfo />
                <BuyBox price={price} actions={PWYWActions} {...other}/>
                <PlayBarShadow />
            </div>
        )
    }
}

