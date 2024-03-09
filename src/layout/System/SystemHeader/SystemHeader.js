import React, { useState } from 'react';
import cl from 'classnames';
import classNames from 'classnames/bind';

import { connect } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'; // optional
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

import styles from './SystemHeader.module.scss';
import * as actions from '../../../store/actions';

const cx = classNames.bind(styles);

function SystemHeader(props) {
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState(false);

    const { userLogout } = props;

    const dropDisable = () => {
        setDisabled(false);
    };

    const handleNavigateClick = (e, url, hasTippy = false) => {
        if (hasTippy) {
            setDisabled(true);
        }
        if (e.ctrlKey) {
            var win = window.open(url, '_blank');
            win.focus();
        } else {
            navigate(url);
            window.scrollTo(0, 0);
        }
    };

    const handleLogout = () => {
        userLogout();
    };

    return (
        <section className={cx('header')}>
            <div className={cl('container', cx('container-custom'))}>
                <span className={cx('logo')} onClick={(e) => handleNavigateClick(e, '/')}>
                    <FontAwesomeIcon icon={faHome} />
                </span>

                <ul className={cx('navbar')}>
                    <Tippy
                        interactive={true}
                        disabled={disabled}
                        hideOnClick={false}
                        placement="bottom-start"
                        onHidden={dropDisable}
                        render={(attrs) => (
                            <div className={cx('doctor-tippy')} tabIndex="-1" {...attrs}>
                                <div
                                    className={cx('tippy-child')}
                                    onClick={(e) => handleNavigateClick(e, '/system/doctor-manager', true)}
                                >
                                    Manage doctors information
                                </div>
                                <div
                                    className={cx('tippy-child')}
                                    onClick={(e) => handleNavigateClick(e, '/system/doctor-schedule', true)}
                                >
                                    Manage doctors schedule time
                                </div>
                            </div>
                        )}
                    >
                        <li className={cx('doctor-navigate')}>Manage doctors</li>
                    </Tippy>
                    <li onClick={(e) => handleNavigateClick(e, '/system/specialty-manager')}>Add new specialty</li>
                    <li onClick={(e) => handleNavigateClick(e, '/system/user-manager')}>
                        Add new admin/doctor/patient account
                    </li>
                </ul>
                <div onClick={() => handleLogout()} className={cx('log-out')}>
                    Log out
                </div>
            </div>
        </section>
    );
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        userLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SystemHeader);
