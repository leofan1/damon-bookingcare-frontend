import classNames from 'classnames/bind';
import cl from 'classnames';
import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import "../../../node_modules/bootstrap/scss/bootstrap.scss";

import styles from './Handbook.module.scss';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

const cx = classNames.bind(styles);

function Handbook() {
    return (
        <div className={cx('handbook')}>
            <div className={cl('container', cx('custom'))}>
                <div className={cx('img-layout')}>
                    <table className={cx('table')}>
                        <thead>
                            <tr>
                                <th className={cx('email')}>Email</th>
                                <th className={cx('firstname')}>Firstname</th>
                                <th className={cx('lastname')}>Lastname</th>
                                <th className={cx('address')}>Address</th>
                                <th className={cx('action')}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={cx('email')}>john@example.com</td>
                                <td className={cx('firstname')}>John</td>
                                <td className={cx('lastname')}>Doe</td>
                                <td className={cx('address')}>No 1</td>
                                <td className={cx('action')}>Sửa Xóa</td>
                            </tr>
                            <tr>
                                <td className={cx('email')}>john@example.com</td>
                                <td className={cx('firstname')}>John</td>
                                <td className={cx('lastname')}>Doe</td>
                                <td className={cx('address')}>No 1</td>
                                <td className={cx('action')}>Sửa Xóa</td>
                            </tr>
                            <tr>
                                <td className={cx('email')}>john@example.com</td>
                                <td className={cx('firstname')}>John</td>
                                <td className={cx('lastname')}>Doe</td>
                                <td className={cx('address')}>No 1</td>
                                <td className={cx('action')}>Sửa Xóa</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div style={{ height: '700px' }}></div>
        </div>
    );
}

export default Handbook;
