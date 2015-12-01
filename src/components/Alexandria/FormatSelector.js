import React from 'react';
import styles from './css/format-selector.module.css';

export default class FormatSelector extends React.Component {
    static defaultProps = {
        options: ['mp3', 'flac', 'WARNING YOU ARE USING DEFAULT PROPS'],
        selected: 'mp3'
    }

    render() {
        return (
            <div className={styles.main}>
                {this.props.options.map((o, i) => {
                     return (
                         <button key={i} className={this.props.selected===o?styles.active:''}>
                             {o}
                         </button>
                     )
                 })}
            </div>
        )
    }
}
