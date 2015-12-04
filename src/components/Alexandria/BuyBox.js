import React from 'react';
import styles from './css/pwyw.module.css';

let imgs = {
    play: require('./svg/paywall-play.svg'),
    dl:   require('./svg/paywall-download.svg'),
    pin:  require('./svg/paywall-pin.svg')
};

var PWIWItem = ({img, type, prices, actions, children}) => (
    <li className={styles.item}
        onClick={() => actions.showPWYW(type)}>
        <img className={styles.buttonSVG} src={img} />
        <span className="price">
            {prices[type]?(<span>${prices[type]}</span>):null}
            {children}
        </span>
    </li>
);

export default class BuyBox extends React.Component {
    static defaultProps = {
        prices: {
            play: 0.0125,
            buy: 1
        }
    }

    render() {
        let props = this.props;
        return (
            <div className="buybox">
                <ul className={styles.list}>
                    <PWIWItem img={imgs.play} type={'play'} {...props}>
                        to Play
                    </PWIWItem>
                    <PWIWItem img={imgs.dl} type={'buy'} {...props}>
                        to Buy
                    </PWIWItem>
                    <PWIWItem img={imgs.pin} type={'pin'} {...props}>
                        Pin to Play
                    </PWIWItem>
                </ul>
            </div>
        )
    }
}
