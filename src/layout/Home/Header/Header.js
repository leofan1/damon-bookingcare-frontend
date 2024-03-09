import React from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import classNames from 'classnames/bind';
import cl from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHome, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header({ home = false, ...props }) {
    const { isLoggedIn } = props;
    const navigate = useNavigate();

    const handleHomeOnClick = (e) => {
        if (e.ctrlKey) {
            var win = window.open(`/`, '_blank');
            win.focus();
        } else {
            navigate(`/`);
        }
    };

    const handleDoctorClick = (e) => {
        if (e.ctrlKey) {
            var win = window.open(`/doctors`, '_blank');
            win.focus();
        } else {
            navigate(`/doctors`);
        }
    };

    const handleSpecialtyClick = (e) => {
        if (e.ctrlKey) {
            window.open(`/specialties`);
        } else {
            navigate(`/specialties`);
        }
    };

    const navigatoToManageSystem = (e) => {
        if (e.ctrlKey) {
            window.open(`/system`);
        } else {
            navigate(`/system`);
        }
    };

    return (
        <div className={cx('header', { 'header-blue': !home })} id="header">
            <div className={cl('container')}>
                <div className={cl(cx('custom'))}>
                    {home && (
                        <div className={cx('left')}>
                            <div className={cx('menu')}>
                                <FontAwesomeIcon icon={faBars} />
                            </div>
                            <img className={cx('logo')} src="/images/bookingcare-2020.svg" alt="Booking Care" />
                        </div>
                    )}
                    {!home && (
                        <div className={cx('left')} onClick={(e) => handleHomeOnClick(e)}>
                            <div className={cx('home')}>
                                <FontAwesomeIcon icon={faHome} />
                            </div>
                        </div>
                    )}

                    <div className={cx('navbar')}>
                        <div className={cx('navbarItem')} onClick={(e) => handleSpecialtyClick(e)}>
                            <h4 className={cx('title')}>Specialties</h4>
                            <p className={cx('desc')}>Choose doctor by specialty</p>
                        </div>

                        <div className={cx('navbarItem')} onClick={(e) => handleDoctorClick(e)}>
                            <h4 className={cx('title')}>Doctors</h4>
                            <p className={cx('desc')}>Choose doctor</p>
                        </div>
                    </div>
                    <div className={cx('admin')}>
                        <div
                            className={cx('authen-btn', { 'authen-btn-home': !home }, { active: true })}
                            onClick={(e) => navigatoToManageSystem(e)}
                        >
                            {isLoggedIn && (
                                <span className={cx('admin-icon')}>
                                    <FontAwesomeIcon icon={faUnlock} />
                                </span>
                            )}
                            {!isLoggedIn && (
                                <span className={cx('admin-icon')}>
                                    <FontAwesomeIcon icon={faLock} />
                                </span>
                            )}
                            ADMIN MANAGE
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        navigateUrl: state.user.navigateUrl,
    };
};

export default connect(mapStateToProps, null)(Header);
