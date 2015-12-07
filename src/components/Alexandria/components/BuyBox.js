import React from 'react';
import styles from './css/pwyw.module.css';

let imgs = {
    play: require('./svg/paywall-play.svg'),
    buy:   require('./svg/paywall-download.svg'),
    pin:  require('./svg/paywall-pin.svg')
};

var PWIWItem = ({type, prices, actions, children}) => (
    <li className={styles.item}
        onClick={e => actions.showPWYW(type)}>
        <img className={styles.buttonSVG} src={imgs[type]} />
        <span className="price">
            {prices[type]?(<span>${prices[type].suggested}</span>):null}
            {children}
        </span>
    </li>
);

export default class BuyBox extends React.Component {
    static defaultProps = {
        prices: {
            play: {
                suggested: 0.0125,
                min: 0.0001
            },
            buy: {
                suggested: 1,
                min: 0.01
            }
        }
    }

    render() {
        let props = this.props;
        return (
            <div className="buybox">
                <ul className={styles.list}>
                    <PWIWItem type={'play'} {...props}>
                        to Play
                    </PWIWItem>
                    <PWIWItem type={'buy'} {...props}>
                        to Buy
                    </PWIWItem>
                    <PWIWItem type={'pin'} {...props}>
                        Pin to Play
                    </PWIWItem>
                </ul>
            </div>
        )
    }
}
