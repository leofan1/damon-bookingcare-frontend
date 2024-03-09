import React, { createContext } from 'react';
import classNames from 'classnames/bind';
import cl from 'classnames';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './VideoCall.module.scss';
import './VideoCall.scss';

const cx = classNames.bind(styles);
export const DoctorContext = createContext();

function VideoCall() {
    const navigate = useNavigate();

    const hanleSlideClick = (id) => {
        navigate(`doctor-detail/${id}`);
    };

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
    };

    return (
        <DoctorContext.Provider value="chieu311">
            <div className={cx('videoCall')} id="videoCall">
                <div className={cl('container', cx('custom'))}>
                    <div className={cx('header')}>
                        <h2 className={cx('headerTitle')}>Bác sĩ từ xa qua Video</h2>
                    </div>
                    <Slider {...settings}>
                        <div className={cl('video-slider')}>
                            <div>
                                <img src="https://cdn.bookingcare.vn/fr/w300/2018/08/09/184703noi-tiet.jpg" />
                                <p>Bác sĩ Nội tiết từ xa</p>
                            </div>
                        </div>

                        <div className={cl('video-slider')}>
                            <div>
                                <img src="https://cdn.bookingcare.vn/fr/w300/2019/05/31/170831kham-tim-mach-4.jpg" />
                                <p>Bác sĩ Tim mạch từ xa</p>
                            </div>
                        </div>
                        <div className={cl('video-slider')}>
                            <div>
                                <img src="https://cdn.bookingcare.vn/fr/w300/2017/12/19/173328kham-nhi-khoa.jpg" />
                                <p>Bác sĩ Nhi từ xa</p>
                            </div>
                        </div>
                        <div className={cl('video-slider')}>
                            <div>
                                <img src="https://cdn.bookingcare.vn/fr/w300/2018/08/18/095722tai-mui-hong.jpg" />
                                <p>Bác sĩ Tai-Mũi-Họng từ xa</p>
                            </div>
                        </div>
                        <div className={cl('video-slider')}>
                            <div>
                                <img src="https://cdn.bookingcare.vn/fr/w300/2020/07/17/085420-dia-chi-kham-san-phu-khoa-ha-noi.jpg" />
                                <p>Bác sĩ Sản phụ khoa từ xa</p>
                            </div>
                        </div>
                    </Slider>
                </div>
            </div>
        </DoctorContext.Provider>
    );
}

export default VideoCall;
