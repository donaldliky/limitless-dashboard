import React, { useState, useEffect } from 'react'
import HeaderPart from '../../components/HeaderPart';
import styles from './index.module.scss';

const Disconnected = () => {
    return (
        <div className={styles.startup_page}>
            <HeaderPart />
            <div className={styles.authorize_discord_phrase}>
                Please connect and authorize your Discord user account.
            </div>
        </div>
    )
}

export default Disconnected