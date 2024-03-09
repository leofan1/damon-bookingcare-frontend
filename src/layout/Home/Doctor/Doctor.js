import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import cl from 'classnames';
import { Buffer } from 'buffer';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { doctorService } from '../../../services';
import styles from './Doctor.module.scss';
import './Doctor.scss';

const cx = classNames.bind(styles);

const getDoctorIntro = (doctor) => {
    let pos = doctor ? doctor.positionData.valueVi : null;
    return doctor ? (pos !== 'Bác sĩ' ? `${pos}, ` : '') + `Bác sĩ ${doctor.firstName} ${doctor.lastName}` : '';
};

function Doctor() {
    const [topDoctor, setTopDoctor] = useState([]);
    const navigate = useNavigate();

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3,
    };

    const getTopDoctor = async (limit) => {
        try {
            const response = await doctorService.getTopDoctorHomeService(limit);
            if (response && response.errCode === 0) {
                const doctors = [];
                if (response.data.length > 0) {
                    response.data.map((item, index) => {
                        if (item.image) {
                            item.image = Buffer.from(item.image, 'base64').toString('binary');
                        }
                        doctors.push(item);
                    });
                }
                setTopDoctor(doctors);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getTopDoctor(10);
    }, []);

    const handleViewDetailOnClick = (e) => {
        if (e.ctrlKey) {
            var win = window.open(`/doctors`, '_blank');
            win.focus();
        } else {
            navigate(`/doctors`);
        }
    };

    const handleSlideClick = (e, id) => {
        if (e.ctrlKey) {
            var win = window.open(`/doctor-detail/${id}`, '_blank');
            win.focus();
        } else {
            navigate(`/doctor-detail/${id}`);
        }
    };

    return (
        <div className={cx('doctor')} id="doctor-section">
            <div className={cl('container', cx('custom'))}>
                <div className={cx('header')}>
                    <h2 className={cx('headerTitle')}>Outstanding doctors</h2>
                    <button onClick={(e) => handleViewDetailOnClick(e)}>VIEW MORE</button>
                </div>

                <Slider {...settings}>
                    {topDoctor &&
                        topDoctor.length > 0 &&
                        topDoctor.map((item, index) => {
                            return (
                                <div key={index} className={cl('doctor-slider')}>
                                    <div onClick={(e) => handleSlideClick(e, item.id)}>
                                        <img src={item.image} alt="" />
                                        <p>
                                            {getDoctorIntro(item)}
                                            <br />
                                            {item.Doctor_Infor.nameSpecialty}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                </Slider>
            </div>
        </div>
    );
}

export default Doctor;
