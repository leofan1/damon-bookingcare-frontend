import React, { useState } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import cl from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as actions from '../../store/actions';
import styles from './Login.module.scss';
import { handleLoginApi } from '../../services/userService';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Login(props) {
    const [username, setUsername] = useState('admin@gmail.com');
    const [password, setPassword] = useState('123456');
    const [errMessage, setErrMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [dotsize, setDotsize] = useState(true);

    const { userLoginSuccess } = props;

    const handleOnchageUsername = (event) => {
        setUsername(event.target.value);
    };

    const handleOnchagePassword = (event) => {
        if (event.target.value === '') {
            if (dotsize) {
                setDotsize(false);
            }
        } else {
            if (!dotsize) {
                setDotsize(true);
            }
        }
        setPassword(event.target.value);
    };

    // Login
    const handleLogin = async () => {
        try {
            let data = await handleLoginApi(username, password);
            if (data && data.errCode !== 0) {
                setErrMessage(data.message);
            } else if (data && data.errCode === 0) {
                userLoginSuccess(data.user);
            }
        } catch (error) {
            if (error.response.data) {
                setErrMessage(error.response.data.message);
            }
        }
    };

    const handleKeydown = (e) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            this.handleLogin();
        }
    };

    return (
        <div className={cx('login-section')}>
            <div className={cx('login-container')}>
                <div className={cx('login-content')}>
                    <div className={cl('col-12', cx('text-login'))}>Admin login</div>
                    <div className={cl('col-12', cx('login-input'))}>
                        <label>Username:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(event) => handleOnchageUsername(event)}
                        />
                    </div>
                    <div className={cl('col-12', cx('login-input'))}>
                        <label>Password:</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className={cl('form-control', cx({ password: dotsize }))}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(event) => handleOnchagePassword(event)}
                            onKeyDown={(e) => handleKeydown(e)}
                        />
                        <span
                            className={cx('eye', { show: !showPassword })}
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            <FontAwesomeIcon icon={faEyeSlash} />
                        </span>
                        <span
                            className={cx('eye', { show: showPassword })}
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            <FontAwesomeIcon icon={faEye} />
                        </span>
                    </div>
                    <div className={cx('col-12')} style={{ color: 'red' }}>
                        {errMessage}
                    </div>
                    <div className={cx('col-12')}>
                        <button className={cx('btn-login')} onClick={() => handleLogin()}>
                            Login
                        </button>
                    </div>
                    {/* <div className={cx('col-12')}>
                        <span className={cx('forgot-password')}>Forgot your password</span>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

// Rexdux
const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
