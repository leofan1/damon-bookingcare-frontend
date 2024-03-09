import React, { useEffect, useState, createContext, memo } from 'react';

import classNames from 'classnames/bind';
import cl from 'classnames';

import styles from './BookingDetail.module.scss';
import { ViCurrencyFormat } from '../../common';
import { userService } from '../../services';

const cx = classNames.bind(styles);

function BookingDetail({ data, className: propClass }) {
    const [viewPriceDetail, setViewPriceDetail] = useState(true);
    const [viewInsuranceDetail, setViewInsuranceDetail] = useState(true);
    const [allCode, setAllCode] = useState();
    const handleViewPrice = () => {
        setViewPriceDetail((prev) => !prev);
    };

    const handleViewInsurance = () => {
        setViewInsuranceDetail((prev) => !prev);
    };
    const displayNone = { display: 'none' };

    const getAllCode = async () => {
        try {
            let res = await userService.getAllCodeService();
            if (res && res.data.length > 0) {
                setAllCode(res.data);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const getPrice = (arr) => {
        let value = '';
        if (arr) {
            for (let i = 0; i < allCode.length; i++) {
                if (allCode[i].keyMap === data.priceId) {
                    value = allCode[i].valueVi;
                }
            }
        }
        return value;
    };

    const price = getPrice(allCode);

    useEffect(() => {
        getAllCode();
    }, []);

    return (
        <div className={cl(cx('booking-detail-wrapper'), { [propClass]: propClass })}>
            <div className={cx('booking-detail-section', 'pdb-custom')}>
                <h4>ĐỊA CHỈ KHÁM</h4>
                <p style={{ fontWeight: '600' }}>{data ? data.nameClinic : ''}</p>
                {data ? data.addressClinic : ''}
            </div>
            <div className={cx('booking-detail-section', 'pdb-custom')}>
                <div className={cx('view-show-hide')}>
                    <h4>
                        {`GIÁ KHÁM: ${price ? ViCurrencyFormat(price) : '....000'}`}
                        <sup>đ</sup>
                    </h4>

                    <span style={!viewPriceDetail ? displayNone : null} onClick={() => handleViewPrice()}>
                        . <span className={cx('view-detail')}>View more</span>
                    </span>
                </div>
                <div className={cx('payment-detail')} style={viewPriceDetail ? displayNone : null}>
                    <p>Được ưu tiên khám trước khi đật khám qua BookingCare. Giá khám cho người nước ngoài là 30 USD</p>
                    <p>
                        Người bệnh thanh toán chi phí bằng hình thức tiền mặt
                        {data.paymentId ? ` hoặc ${data.paymentId}` : ''}
                    </p>
                    <span onClick={() => handleViewPrice()} className={cx('hide-detail')}>
                        Hide
                    </span>
                </div>
            </div>
            <div className={cx('booking-detail-section')}>
                <div className={cx('view-show-hide')}>
                    <h4>LOẠI BẢO HIỂM ÁP DỤNG</h4>
                    <span style={!viewInsuranceDetail ? displayNone : null} onClick={() => handleViewInsurance()}>
                        . <span className={cx('view-detail')}>View more</span>
                    </span>
                </div>
                <div className={cx('insurance-detail')} style={viewInsuranceDetail ? displayNone : null}>
                    <p>
                        <span>Bảo hiểm Y tế nhà nước</span>
                        <br />
                        Không áp dụng
                    </p>
                    <p>
                        <span>Bảo hiểm bảo lãnh trực tiếp</span>
                        <br />
                        Phòng khám hiện không áp dụng bảo hiểm bảo lạnh trực tiếp và chưa có xuất hóa đơn tài chính (hóa
                        đơn đỏ)
                    </p>

                    <span onClick={() => handleViewInsurance()} className={cx('hide-detail')}>
                        Hide
                    </span>
                </div>
            </div>
        </div>
    );
}

export default memo(BookingDetail);
