import React from 'react';

import styles from './css/playlist.module.css'

var prettyTime = (t) => {
    let h = Math.floor(t/3600)%24,
        m = Math.floor(t/60)%60,
        s = t%60;

    return h?h+':':'' + m + ':' + s
}

var Price = ({price}) => (
    <span className={styles.price}>$<span className={styles.price}>
        {price}
    </span></span>
)

export default class PlayList extends React.Component {
    static defaultProps = {
        author:'Imogen Heap',
        prices: {
            play: 0.0125,
            dl: 1
        },
        tracks: [
            {
                title: 'Tiny Human',
                runtime: 394
            },
            {
                title: 'Another Tiny Human',
                author: 'another Himogen Heap',
                runtime: 3339
            }
        ]
    }

    render() {
        console.log (this.props);
        let {tracks, prices, ...other} = this.props;
        if (!tracks) return (<p>No Tracks to show</p>)

        return (
            <div className={styles.main}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Artist</th>
                            <th>Time</th>
                            <th>Price/Play</th>
                            <th>Price/Buy</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tracks}>
                        {tracks.map((track, i) => {
                             return (
                                 <tr key={i}>
                                     <td>{i + 1}</td>
                                     <td>{track.title}</td>
                                     <td>{track.author || this.props.author}</td>
                                     <td>{prettyTime(track.runtime)}</td>
                                     <td><Price price={prices.play} /></td>
                                     <td><Price price={prices.dl} /></td>
                                 </tr>
                             )
                         })}
                    </tbody>
                </table>
            </div>
        )
    }
}
