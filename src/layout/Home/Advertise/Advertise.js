import classNames from 'classnames/bind';
import cl from 'classnames';
import styles from './Advertise.module.scss';

const cx = classNames.bind(styles);

function Advertise() {
    return (
        <div className={cx('advertise')}>
            <div className={cl('container', cx('custom'))}>
                <ul>
                    <li>
                        <div
                            style={{
                                backgroundImage: `url('https://cdn.bookingcare.vn/fo/2022/05/18/115424-221d510df8a339fd60b2.jpg')`,
                            }}
                        ></div>
                        <h3>Tư vấn phẫu thuật bao quy đầu trọn gói</h3>
                        <ul>
                            <li>Khuyến mãi 1</li>
                            <li>Khuyến mãi 2</li>
                        </ul>
                        <span>NOT ACTIVE YET</span>
                    </li>
                    <li>
                        <div
                            style={{
                                backgroundImage: `url('https://cdn.bookingcare.vn/fo/2023/01/06/160930-084937-102909-tri-mun-phong-kham-da-lieu-ha-noi.jpg')`,
                            }}
                        ></div>
                        <h3>Giờ vàng trị mụn chỉ từ 350k/buổi tại Phòng khám Da liễu Hà Nội</h3>
                        <ul>
                            <li>Khuyến mãi 1</li>
                            <li>Khuyến mãi 2</li>
                        </ul>
                        <span>NOT ACTIVE YET</span>
                    </li>
                    <li>
                        <div
                            style={{
                                backgroundImage: `url('https://cdn.bookingcare.vn/fo/2022/10/20/144100-152409-uu-dai-di-kham-mediplus.jpg')`,
                            }}
                        ></div>
                        <h3>Ưu đãi 50% phí khám với bác sĩ tại Phòng khám Mediplus</h3>
                        <ul>
                            <li>Khuyến mãi 1</li>
                            <li>Khuyến mãi 2</li>
                        </ul>
                        <span>NOT ACTIVE YET</span>
                    </li>
                    <li>
                        <div
                            style={{
                                backgroundImage: `url('https://cdn.bookingcare.vn/fo/2022/08/16/141010-cds.png')`,
                            }}
                        ></div>
                        <h3>Giải pháp chuyển đổi số toàn diện cho bệnh viện, phòng khám</h3>
                        <ul>
                            <li>Khuyến mãi 1</li>
                            <li>Khuyến mãi 2</li>
                        </ul>
                        <span>NOT ACTIVE YET</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Advertise;
