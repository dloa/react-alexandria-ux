import React from 'react';
import styles from './css/media.module.css';

import MediaInfo from './MediaInfo';
import PlayList from './PlayList';

export default class Alexandria extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.top}>
                    <MediaInfo />
                </div>
                <div className={styles.bottom}>
                    <PlayList />
                </div>
            </div>
        )
    }
}


