import { useMemo, useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import MenuIcon from '@mui/icons-material/Menu';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import { toast } from 'react-toastify'

import { useResize } from "./../../utils/Helper";
import Avatar_img from "./../../assets/images/avatar.svg";

import styles from './index.module.scss';

import { DISCORD_REDIRECT_URL } from '../../config'
// redux import
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hook";

import { setAuthorizeInfo, getDiscordAccountInfo, setDiscordAccountInfo } from '../../redux/actions'

const HeaderPart = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const { isMobile, isResponsive } = useResize();
    const dispatch = useDispatch();
    const global = useAppSelector((state) => state.global);
    const history = useHistory();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleClickAway = () => {
        setIsOpen(false);
    };

    const handleConnectDiscord = () => {
        window.location.href = DISCORD_REDIRECT_URL
        // setIsClicked(!isClicked);
        // history.push('/dashboard');
    };

    const handleLogoutClick = () => {
        setIsClicked(!isClicked);
        // history.push('/dashboard');
    };

    const handleLogout = () => {
        console.log("logout")
        localStorage.removeItem('authorize')
        localStorage.removeItem('lastAuthTime')

        setAuthorizeInfo({
            access_token: null,
            token_type: null,
            expires_in: null,
            scope: null
        }, dispatch)

        setDiscordAccountInfo({
            id: null,
            username: null,
            avatar: null,
            avatar_decoration: null,
            discriminator: null,
            public_flags: null,
            flags: null,
            banner: null,
            banner_color: null,
            accent_color: null,
            locale: null,
            mfa_enabled: null
        }, dispatch)

    };

    const getAuthFromStorage = () => {
        const authorize = localStorage.getItem('authorize')
        if (authorize === null) {
            return false
        } else {
            return JSON.parse(localStorage.getItem('authorize')!)
        }
    }

    const parseHash = (type: String) => {
        const lochash = window.location.hash.substring(1)
        let value = ''
        switch (type) {
            case 'token_type':
                value = lochash.substring(lochash.search(/(?<=^|&)token_type=/)).split('&')[0].split('=')[1]
                break
            case 'access_token':
                value = lochash.substring(lochash.search(/(?<=^|&)access_token=/)).split('&')[0].split('=')[1]
                break
            case 'expires_in':
                value = lochash.substring(lochash.search(/(?<=^|&)expires_in=/)).split('&')[0].split('=')[1]
                break
            case 'scope':
                value = lochash.substring(lochash.search(/(?<=^|&)scope=/)).split('&')[0].split('=')[1]
                break
        }
        return value
    }

    const setAuthFromStorage = (data: any) => {
        localStorage.setItem('lastAuthTime', Date.now().toString())
        localStorage.setItem('authorize', JSON.stringify(data))
    }

    useEffect(() => {
        let authorize: any
        if (!!window.location.hash) {
            authorize = {
                token_type: parseHash('token_type'),
                access_token: parseHash('access_token'),
                expires_in: parseHash('expires_in'),
                scope: parseHash('scope'),
            }
            setAuthFromStorage(authorize)
        } else {
            const currentTime = Date.now()
            const lastTime = parseInt(localStorage.getItem('lastAuthTime') || '0')

            if (currentTime - lastTime > 6048000) {
                localStorage.removeItem('authorize')
            }
            authorize = getAuthFromStorage()
        }

        authorize = {
            access_token: "ne9hfrCzfWS3GmaRpqznpX4VtU720n",
            expires_in: "604800",
            scope: "identify+guilds",
            token_type: "Bearer",
        }
        setAuthorizeInfo(authorize, dispatch)
        setDiscordAccountInfo({
            accent_color: 1913814,
            avatar: "f81fb33d77f5fae354b713a10a46d741",
            avatar_decoration: null,
            banner: null,
            banner_color: "#1d33d6",
            discriminator: "8898",
            flags: 0,
            id: "934002267340828682",
            locale: "en-US",
            mfa_enabled: false,
            public_flags: 0,
            username: "Megaman"
        }, dispatch)

        // if (global.authorize.access_token === null && !!authorize) {
        //     setAuthorizeInfo(authorize, dispatch)
        //     // Set Discord Account Info to Global Store
        //     getDiscordAccountInfo({
        //         token_type: authorize['token_type'],
        //         access_token: authorize['access_token']
        //     }, dispatch)

        //     toast.success("Discord Authorization Success!", { theme: 'dark' })
        // }

    }, [])

    return (
        <div>
            {!isMobile ?
                <div className={styles.root}>
                    <div className={styles.header_content}>
                        {global.discord.username === null ?

                            <div className={styles.connect_btn} onClick={handleConnectDiscord}>
                                CONNNECT DISCORD
                            </div>
                            :
                            <div className={styles.header_account}>
                                <div className={styles.account_name}>
                                    {global.discord.username} #{global.discord.discriminator}
                                </div>
                                <div className={styles.account_avatar}>
                                    <div className={styles.img_btn} onClick={handleLogoutClick}><img className={styles.img_avatar} src={global.discord.avatar === null ? '/avatar.png' : `https://cdn.discordapp.com/avatars/${global.discord.id}/${global.discord.avatar}.png?size=128`}></img></div>
                                    {isClicked ?
                                        <div className={styles.logout_btn} onClick={handleLogout}>Log Out</div>
                                        :
                                        <></>
                                    }
                                </div>
                            </div>
                        }
                    </div>
                </div>
                :
                <ClickAwayListener onClickAway={handleClickAway}>
                    <div>
                        <div className={styles.root}>
                            <div className={styles.header_menubar}>
                                <a onClick={toggleMenu}><MenuIcon style={{ marginTop: '10px' }} sx={{ color: '#FFFFFF' }}></MenuIcon></a>
                            </div>
                            <div className={styles.header_content}>

                                <div className={styles.header_account}>
                                    <div className={styles.account_name}>
                                        {global.discord.username} #{global.discord.discriminator}
                                    </div>
                                    <div className={styles.account_avatar}>
                                        <div className={styles.img_btn} onClick={handleLogoutClick}><img className={styles.img_avatar} src={global.discord.avatar === null ? '/avatar.png' : `https://cdn.discordapp.com/avatars/${global.discord.id}/${global.discord.avatar}.png?size=128`}></img></div>
                                        {isClicked ?
                                            <div className={styles.logout_btn} onClick={handleLogout}>Log Out</div>
                                            :
                                            <></>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.side_content} style={{ visibility: isOpen ? `visible` : `hidden`, opacity: isOpen ? 1 : 0 }}>
                            <div className={`${styles.link}`} onClick={() => history.push('/dashboard')}>
                                <div id="dashboard" className={styles.link_content}>DashBoard</div>
                            </div>
                            {global.discord.username ?
                                <>
                                    <div className={styles.link} onClick={() => history.push('/services')}>
                                        <div id="services_integration" className={styles.link_content}>Services Integration</div>
                                    </div>
                                    <div className={styles.link} onClick={() => history.push('/whitelist')}>
                                        <div id="obtain_whitelist" className={styles.link_content}>Obtain Whitelist</div>
                                    </div>
                                </>
                                :
                                <>
                                    <div className={styles.link_disabled} onClick={() => history.push('/services')}>
                                        <div id="services_integration" className={styles.link_content}>Services Integration</div>
                                    </div>
                                    <div className={styles.link_disabled} onClick={() => history.push('/whitelist')}>
                                        <div id="obtain_whitelist" className={styles.link_content}>Obtain Whitelist</div>
                                    </div>
                                </>
                            }
                            <div className={styles.link} onClick={() => history.push('/support')}>
                                <div id="support" className={styles.link_content}>Support</div>
                            </div>
                        </div>
                    </div>
                </ClickAwayListener>
            }
        </div>
    )
}

export default HeaderPart;