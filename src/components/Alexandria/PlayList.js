import React from 'react';

import styles from './css/playlist.module.css'

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
                time: '3:39',
            },
            {
                title: 'Another Tiny Human',
                author: 'another Himogen Heap',
                time: '33:39',
            }
        ]
    }

    render() {
        console.log (this.props);
        if (! this.props.tracks) return (<p>No Tracks to show</p>)
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
                        {this.props.tracks.map((track, i) => {
                             return (
                                 <tr key={i}>
                                     <td>{i}</td>
                                     <td>{track.title}</td>
                                     <td>{track.author || this.props.author}</td>
                                     <td>{track.time}</td>
                                     <td>$<span className="price-play">{this.props.prices.play}</span></td>
                                     <td>$<span className="price-download">{this.props.prices.dl}</span></td>
                                 </tr>
                             )
                         })}
                    </tbody>
                </table>
            </div>
        )
    }
}
