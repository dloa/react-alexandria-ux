import React from 'react';
import styles from './css/media-info.module.css';

var AlbumCover = ({src}) => (
    <div className={styles.cover}>
        <img src={src} />
    </div>
);

AlbumCover.defaultProps = {
    src: 'http://teamclermont.com/i/cover_placeholder.jpg'
};

export default AlbumCover;
