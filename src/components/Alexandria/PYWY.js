import React from 'react';

import style from 'css/pwyw.css';

export default class PWYW extends React.Component {
    render() {
        return (
            <div className="pwwy-stuff">
                <div className="pwyw-close"></div>
                <div className="pwyw-container pwyw-activate-pin">
                    <div clas="pinning-info" style={{display: 'none'}}>
                        <i className="pwyw-pin-pretext">currently there are</i>
                        <div className="pwyw-pinning-info pwyw-suggest">
                            <span className="pwyw-currently-pinning">497</span> users pinning this file
                        </div>
                    </div>
                    <div className="pwyw-pinning-suggestion">
                        if you pin it, you can play the song for free!
                    </div>
                    <span className="pwyw-pinning-suggest pwyw-suggest">
                        $<span className="pwyw-pin-price pwyw-suggested-price">0.00</span> per play
                    </span>
                    <span className="pwyw-pinning-error"></span>
                    <button className="pwyw-pin-it">Pin It!</button>
                </div>
                <div className="pwyw-container pwyw-activate-download">
                    <div className="pwyw-paybox">
                        <div className="pwyw-payinfo">
                            The suggested price is:
                            <span className="pwyw-suggest">
                                $<span className="pwyw-price-suggest-download pwyw-suggested-price">suggest-dl</span> to buy
                            </span>
                            <br />
                            <span>
                                $
                                <input className="pwyw-usd-price-input pwyw-usd-download-price-input" maxlength="4" /> USD
                            </span>
                            <div className="pwyw-somespace"></div>
                        </div>
                    </div>
                    <div className="pwyw-footer">
                        <span className="pwyw-btc-download-price">dl-price</span> BTC to<br />
                        <div className="pwyw-qrcode">
                            <img src="" />
                        </div>
                        <span className="pwyw-btc-address">                            </span>
                    </div>
                </div>
                <div className="pwyw-container pwyw-activate-play">
                    <div className="pwyw-paybox">
                        <div className="pwyw-payinfo">
                            The suggested price is:
                            <span className="pwyw-suggest">
                                $<span className="pwyw-price-suggest-play pwyw-suggested-price">suggest-play</span> to play
                            </span>
                            <br />
                            <span>
                                $
                                <input className="pwyw-usd-price-input pwyw-usd-play-price-input" maxlength="4" /> USD
                            </span>
                            <div className="pwyw-somespace"></div>
                        </div>
                    </div>
                    <div className="pwyw-footer">
                        <span className="pwyw-btc-play-price">play-price</span> BTC to
                        <div className="pwyw-qrcode">
                            <img src="http://www.wired.com/images_blogs/magazine/2013/04/qrcode_f.jpg" />
                        </div>
                        <span className="pwyw-btc-address">1CvDLWNzX4PEkzMU7t2pVGsT858pMiNorQ
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}
