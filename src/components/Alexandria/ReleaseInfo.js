import React from 'react';

import styles from './css/release-info.module.css';

export default class ReleaseInfo extends React.Component {
    static defaultProps = {
        publisher: 'Publisher Name',
        btcAddress: 'BTC Address',
        published: new Date(),
        runtime: 0,
        audio: [],
        xfiles: []
    }

    render() {
        return (
            <ul className="release-info">
                <li className={styles.publisher}>{this.props.publisher}</li>
                <li className={styles.btcAddress}>{this.props.btcAddress}</li>
                <li>Published <span className={styles.date}>{this.props.published.toString()}</span></li>
                <li className={styles.trackCount}><span className={styles.audioCount}>
                    {this.props.audio.length}
                </span> Audio Track</li>
                <li className={styles.runtime}>{this.props.runtime}</li>
                <li className={styles.xfileContainer}><span className={styles.xfileCount}>
                    {this.props.xfiles.length}
                </span> extra files</li>
            </ul>
        )
    }
}
