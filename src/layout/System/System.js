import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import cl from 'classnames';

import styles from './System.module.scss';
import { SystemHeader } from '../System';
import { Footer } from '../../common/Footer';

const cx = classNames.bind(styles);

function System(props) {
    const { children } = props;

    return (
        <div className={cx('system-layout')}>
            <SystemHeader />
            <React.Fragment>{children}</React.Fragment>
            <Outlet />
            <Footer />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        navigateUrl: state.user.navigateUrl,
    };
};

export default connect(mapStateToProps, null)(System);
// export default System;
