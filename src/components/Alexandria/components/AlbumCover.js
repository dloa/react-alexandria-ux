import React from 'react';
import styles from './css/media-info.module.css';

var AlbumCover = ({cover, servers, ipfs, src}) => (
    <div className={styles.cover}>
        <img src={cover?`http://${servers.ipfs}/ipfs/${ipfs.root}/${cover}`:src} />
    </div>
);

AlbumCover.defaultProps = {
    src: 'http://teamclermont.com/i/cover_placeholder.jpg'
};

export default AlbumCover;
