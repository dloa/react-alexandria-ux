import React from 'react';
import styles from './css/format-selector.module.css';

export default class FormatSelector extends React.Component {
    static defaultProps = {
        options: ['mp3', 'flac', 'WARNING YOU ARE USING DEFAULT PROPS'],
    }

    render() {
        let {options, selected, actions} = this.props;
        console.log ('formatselector', options, selected, actions);
        return (
            <div className={styles.main}>
                {options.map((o, i) => (
                     <button key={i}
                             className={selected === o ? styles.active : ''}
                             onClick={e => actions.setFormat(o)}>
                         {o}
                     </button>
                 ))}
            </div>
        )
    }
}
