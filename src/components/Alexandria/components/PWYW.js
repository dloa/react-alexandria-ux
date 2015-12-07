import React from 'react';

import styles from './css/paywall-overlay.module.css';

var PWYWPin = ({pinning, price, onClick}) => (
    <div className={styles.container}>
        <div className={styles.pinInfo} style={{display: 'none'}}>
            <i className={styles.pinPretext}>currently there are</i>
            <div className={styles.pinInfo}>
                <span>{pinning}</span> users pinning this file
            </div>
        </div>
        <div className={styles.pinSuggestion}>
            if you pin it, you can play the song for free!
        </div>
        <span className={styles.suggest} style={{fontSize: 30}}>
            $<span>{price.suggested}</span> per play
        </span>
        <span className={styles.pinError}></span>
        <button onClick={onClick}>Pin It!</button>
    </div>
);

var PWYWQRCode = ({address, price, size}) => (
    <div className={styles.qrcode}>
        {address?
         <img src={'http://api.qrserver.com/v1/create-qr-code/?size=' + size.w + 'x' + size.h + '&data=bitcoin:' + address + '?amount=' + price} />:
         <img src='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==' />}
    </div>);

PWYWQRCode.defaultProps = {
    size: {h: 300, w:300}
};

class PWYWPayBTC extends React.Component {
    constructor(props) {
        super(props);

        console.log ('paybtc', props)
        this.state = {
            price: props.price.suggested
        }

        this.onChange = e => {
            this.setState({
                price: e.target.value / this.props.btcusd
            })
        }
    }

    render() {
        let {price, address, type, onClick} = this.props;
        console.log (this.props)
        return (
            <div className={styles.container}>
                <div className={styles.paybox}>
                    <div className={styles.payinfo}>
                        The suggested price is:
                        <span className={styles.suggest}>
                            $<span>{price.suggested}</span> to {type}
                        </span>
                        <br />
                        <span>
                            $<input maxLength="4" 
                                    onChange={this.onChange}/> USD 
                        </span>
                        <div className={styles.somespace}></div>
                    </div>
                </div>
                <div className={styles.footer}>
                    <span>{this.state.price}</span> BTC to<br />
                    <PWYWQRCode address={address} price={this.state.price}
                                size={{h: 300, w: 300}} />
                    <span>{address}</span>
                </div>
            </div>
        )
    }
}

export default class PWYW extends React.Component {
    static defaultProps = {
        type: 'pin',
        prices: {
            play: {
                suggested: 0.0125,
                min: 0.0001
            },
            buy: {
                suggested: 1,
                min: 0.01
            }
        },
        address: '1DefaultPropBTCAddressW298xk0'
    }
    render() {
        let {type, prices, ...other} = this.props;
        let {actions} = this.props;

        return (
            <div className={styles.overlay} onClick={actions.hidePWYW}>
                <div className={styles.main}>
                    <div className={styles.close}></div>
                    {type==='pin'?
                     <PWYWPin type="pin" price={prices.pin || 0} {...other}/>:
                     <PWYWPayBTC type={type}
                                 price={prices[type]}
                                 {...other} />
                    }
                </div>
            </div>
        )
    }
}
