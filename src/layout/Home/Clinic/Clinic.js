import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import cl from 'classnames';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import styles from './Clinic.module.scss';
import { clinicService } from '../../../services';
import './Clinic.scss';

const cx = classNames.bind(styles);

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
};

function Clinic() {
    const [clinic, setClinic] = useState();

    const getClinics = async () => {
        try {
            let res = await clinicService.getAllClinicsService();

            if (res.errCode === 0 && res.data.length > 0) {
                setClinic(res.data);
            }
        } catch (e) {}
    };

    useEffect(() => {
        getClinics();
    }, []);

    return (
        <div className={cx('clinic')} id="clinic-section">
            <div className={cl('container', cx('custom'))}>
                <div className={cx('header')}>
                    <h2 className={cx('headerTitle')}>Cơ sở y tế nổi bật</h2>
                </div>
                <Slider {...settings}>
                    {clinic &&
                        clinic.map((item, index) => {
                            return (
                                <div key={index} className={cl('specialty-slider')}>
                                    <div onClick={() => {}}>
                                        <img src={item.image} alt="" />
                                        <p>{item.name}</p>
                                    </div>
                                </div>
                            );
                        })}
                </Slider>
            </div>
        </div>
    );
}

export default Clinic;
