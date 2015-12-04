import React from 'react';
import styles from './css/media-info.module.css';

let shareImg = require('./svg/share.svg');

var MediaInfo = ({title, artist}) => (
    <div>
        <h1 className={styles.title}>{title}</h1>
        <div className="row">
            <h2 className={styles.meta}>
                <span className="media-artist">{artist}</span>
                <div className="tipbox">
                    <span className="tip">Tip</span>
                    <span className="share"><img src={shareImg} /></span>
                </div>
            </h2>
        </div>
    </div>
)

MediaInfo.defaultProps = {
    title: 'Tiny Human (defaultProp)',
    artist: 'Imogen Heap (defaultProp)'
}

export default MediaInfo;
