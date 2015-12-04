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
        let xinfo = this.props['extra-info'];

        let {title, price, ...other} = this.props;
        let {artist} = xinfo;

        return (
            <div className={styles.main}>
                <MediaInfo title={title} artist={artist}/>
                <FormatSelector options={xinfo.formats} />
                <ReleaseInfo />
                <BuyBox price={price} {...other}/> 
                <PlayBarShadow />
            </div>
        )
    }
}

