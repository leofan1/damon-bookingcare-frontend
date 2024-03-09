import styles from './Cover.module.scss';
import classNames from 'classnames/bind';
import cl from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Cover() {
    return (
        <div className={cx('cover')}>
            <div className={cx('search')}>
                <div className={cl('container', cx('content'))}>
                    <h1>
                        Nền tảng y tế
                        <br />
                        <b>Chăm sóc sức khỏe toàn diện</b>
                    </h1>
                    <div className={cx('search-box')}>
                        <div className={cx('icon')}>
                            <FontAwesomeIcon icon={faSearch} />
                        </div>
                        <input type="search" placeholder="Not active yet" />
                    </div>
                </div>
            </div>
            <div className={cx('navbar')}>
                <ul>
                    <li>
                        <div
                            style={{
                                backgroundImage:
                                    'url(https://cdn.bookingcare.vn/fo/2021/12/08/133537-khamchuyenkhoa.png)',
                            }}
                        ></div>
                        <p>
                            Khám
                            <br />
                            Chuyên Khoa
                        </p>
                    </li>
                    <li>
                        <div
                            style={{
                                backgroundImage: 'url(https://cdn.bookingcare.vn/fo/2021/12/08/133657-khamtuxa.png)',
                            }}
                        ></div>
                        <p>
                            Khám
                            <br />
                            Từ xa
                        </p>
                    </li>
                    <li>
                        <div
                            style={{
                                backgroundImage:
                                    'url(https://cdn.bookingcare.vn/fo/2021/12/08/133744-khamtongquat.png)',
                            }}
                        ></div>
                        <p>
                            Khám
                            <br />
                            Tổng quát
                        </p>
                    </li>
                    <li>
                        <div
                            style={{
                                backgroundImage:
                                    'url(https://cdn.bookingcare.vn/fo/2021/12/08/133744-dichvuxetnghiem.png)',
                            }}
                        ></div>
                        <p>
                            Xét nghiệm
                            <br />y học
                        </p>
                    </li>
                    <li>
                        <div
                            style={{
                                backgroundImage:
                                    'url(https://cdn.bookingcare.vn/fo/2021/12/08/133744-suckhoetinhthan.png)',
                            }}
                        ></div>
                        <p>
                            Sức khỏe
                            <br />
                            tinh thần
                        </p>
                    </li>
                    <li>
                        <div
                            style={{
                                backgroundImage: 'url(https://cdn.bookingcare.vn/fo/2022/05/19/104635-khamnhakhoa.png)',
                            }}
                        ></div>
                        <p>
                            Khám
                            <br />
                            Nha khoa
                        </p>
                    </li>
                    <li>
                        <div
                            style={{
                                backgroundImage: 'url(https://cdn.bookingcare.vn/fo/2022/05/16/151930-phau-thuat.jpg)',
                            }}
                        ></div>
                        <p>
                            Gói
                            <br />
                            Phẫu thuật
                        </p>
                    </li>
                    <li>
                        <div
                            style={{
                                backgroundImage: 'url(https://cdn.bookingcare.vn/fo/2021/12/08/133744-khamtainha.png)',
                            }}
                        ></div>
                        <p>
                            Sản phẩm
                            <br />Y tế
                        </p>
                    </li>
                    <li>
                        <div
                            style={{
                                backgroundImage:
                                    'url(https://cdn.bookingcare.vn/fo/2022/07/29/101157-icon-lich-su.jpg)',
                            }}
                        ></div>
                        <p>
                            Sức khỏe
                            <br />
                            Doanh nghiệp
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Cover;
