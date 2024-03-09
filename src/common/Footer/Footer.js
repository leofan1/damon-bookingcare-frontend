import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheck,
    faLocationDot,
    faMobile,
    faMobileAndroid,
    faMobileScreenButton,
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import cl from 'classnames';
import { useParams } from 'react-router-dom';
import { Buffer } from 'buffer';

import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('footer')}>
            <div className={cl('container', cx('custom'))}>
                <div className={cl('col-lg-6')}>
                    <img className={cx('logo')} src="/images/bookingcare-2020.svg" alt="Booking Care" />
                    <div className={cx('left')}>
                        <h2>Công ty Cổ phần Công nghệ BookingCare</h2>
                        <p>
                            <span>
                                <FontAwesomeIcon icon={faLocationDot} />
                            </span>
                            28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội
                        </p>
                        <p>
                            <span>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015
                        </p>
                    </div>
                    <div className={cx('permission')}>
                        <a>
                            <img src="/images/permission.svg" alt="" />
                        </a>
                        <a>
                            <img src="/images/permission.svg" alt="" />
                        </a>
                    </div>
                </div>
                <div className={cl('col-lg-3', cx('contact'))}>
                    <ul>
                        <li>Liên hệ hợp tác</li>
                        <li>Gói chuyển đổi số doanh nghiệp</li>
                        <li>Tuyển dụng</li>
                        <li>Câu hỏi thường gặp</li>
                        <li>Điều khoản sử dụng</li>
                        <li>Chính sách Bảo mật</li>
                        <li>Quy trình hỗ trợ giải quyết khiếu nại</li>
                        <li>Quy chế hoạt động</li>
                    </ul>
                </div>
                <div className={cl('col-lg-3', cx('support'))}>
                    <div>
                        <strong>Trụ sở tại Hà Nội</strong>
                        <br />
                        28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội
                    </div>
                    <div>
                        <strong>Văn phòng tại TP Hồ Chí Minh</strong>
                        <br />
                        Số 01, Hồ Bá Kiện, Phường 15, Quận 10
                    </div>
                    <div>
                        <strong>Hỗ trợ khách hàng</strong>
                        <br />
                        support@bookingcare.vn (7h30 - 18h)
                    </div>
                </div>
            </div>
            <div className={cl('container', cx('app-download'))}>
                <hr />
                <div>
                    <span>
                        <FontAwesomeIcon icon={faMobileScreenButton} />
                    </span>
                    Tải ứng dụng BookingCare cho điện thoại hoặc máy tính bảng: <a>Android</a>
                    {' - '}
                    <a>iPhone/iPad</a>
                    {' - '}
                    <a>Khác</a>
                </div>
            </div>
        </div>
    );
}

export default Footer;
