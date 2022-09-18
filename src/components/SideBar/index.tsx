import { useMemo, useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';
import styles from './index.module.scss';
import { useHistory, useLocation } from "react-router-dom";

// redux import
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hook";

const SideBar = () => {
  const base_URL = '/';
  const history = useHistory();
  const location = useLocation();
  const global = useAppSelector((state) => state.global);

  return (
    <div className={`${styles.root}`}>
      <div className={`${styles.side_header}`}>
        <div className={styles.side_title}>
          LIMITLESS
        </div>
      </div>

      <div className={styles.side_content}>
        <div className={`${styles.link} ${location.pathname == '/dashboard' ? styles.active : ''}`} onClick={() => history.push('/dashboard')}>
          <div id="dashboard" className={styles.link_content}>DashBoard</div>
        </div>
        {global.discord.username === null ?
          <>
            <div className={styles.link_disabled} onClick={() => history.push('/services')}>
              <div id="services_integration" className={styles.link_content}>Services Integration</div>
            </div>
            <div className={styles.link_disabled} onClick={() => history.push('/whitelist')}>
              <div id="obtain_whitelist" className={styles.link_content}>Obtain Whitelist</div>
            </div>
          </>
          :
          <>
            <div className={`${styles.link} ${location.pathname == '/services' ? styles.active : ''}`} onClick={() => history.push('/services')}>
              <div id="services_integration" className={styles.link_content}>Services Integration</div>
            </div>
            <div className={`${styles.link} ${location.pathname == '/whitelist' ? styles.active : ''}`} onClick={() => history.push('/whitelist')}>
              <div id="obtain_whitelist" className={styles.link_content}>Obtain Whitelist</div>
            </div>
          </>
        }

        <div className={`${styles.link} ${location.pathname == '/support' ? styles.active : ''}`} onClick={() => history.push('/support')}>
          <div id="support" className={styles.link_content}>Support</div>
        </div>
      </div>
    </div >
  )
}

export default SideBar;