import React from 'react';
import styles from './css/media-info.module.css';

import FormatSelector from './FormatSelector';
import ReleaseInfo from './ReleaseInfo';
import PWYW from './PWYW';

export default class MediaInfo extends React.Component {
    render () {
        return (
            <div>
                <div className={styles.main}>
                    <h1 className="media-title">Title</h1>
                    <div className="row">
                        <h2 className={styles.meta}>
                            <span className="media-artist">Artist</span>
                            <div className="tipbox">
                                <span className="tip">Tip</span>
                                <span className="share"><img src="./svg/share.svg" /></span>
                            </div>
                        </h2>
                    </div>
                    <FormatSelector />
                    <ReleaseInfo />
                    <PWYW />
                    <div className="buybox">
                        <ul className="pwyw-list">
                            <li className="pwyw-item pwyw-action-play">
                                <img className="button-svg" src="svg/paywall-play.svg" />
                                <span className="price">
                                    $<span className="pwyw-price-play">play-price</span> to Play
                                </span>
                            </li>
                            <li className="pwyw-item pwyw-action-download">
                                <img className="button-svg" src="svg/paywall-download.svg" />
                                <span className="price">
                                    $<span className="pwyw-price-download">dl-price</span> to Buy</span>
                            </li>
                            <li className="pwyw-item pwyw-action-pin">
                                <img className="button-svg" src="svg/paywall-pin.svg" />
                                <span className="price price-pin">
                                    Pin to Play
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className="media-data" style={{display: 'none'}}>
                        <ul>
                            <li className="md-title">title</li>
                            <li className="md-tracks">title</li>
                        </ul>
                    </div>
                </div>
                <div className={styles.cover}>
                    <img src="http://teamclermont.com/i/cover_placeholder.jpg" />
                </div>
            </div>
        )
    }
}
