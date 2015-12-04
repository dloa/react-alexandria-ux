import React from 'react';
import styles from './css/format-selector.module.css';

export default class FormatSelector extends React.Component {
    static defaultProps = {
        options: ['mp3', 'flac', 'WARNING YOU ARE USING DEFAULT PROPS'],
    }

    constructor(props) {
        super(props);

        this.state = {
            selected: props.selected || props.options[0]
        }
    }

    render() {
        let selected = this.state.selected;

        console.log ('formatselector', this.props)
        return (
            <div className={styles.main}>
                {this.props.options.map((o, i) => {
                     return (
                         <button key={i} className={selected === o ? styles.active : ''}>
                             {o}
                         </button>
                     )
                 })}
            </div>
        )
    }
}
