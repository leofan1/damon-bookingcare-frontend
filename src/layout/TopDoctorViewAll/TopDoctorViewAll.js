import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import cl from 'classnames';
import { Buffer } from 'buffer';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

import { doctorService } from '../../services';
import styles from './TopDoctorViewAll.module.scss';

// import abc from '../../../public/images';

const cx = classNames.bind(styles);

const getDoctorIntro = (doctor) => {
    let pos = doctor ? doctor.positionData.valueVi : null;
    return doctor ? (pos !== 'Bác sĩ' ? `${pos}, ` : '') + `Bác sĩ ${doctor.firstName} ${doctor.lastName}` : '';
};

function TopDoctorViewAll() {
    const [topDoctor, setTopDoctor] = useState();
    const navigate = useNavigate();

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

    const handleDoctorOnClick = (e, id) => {
        if (e.ctrlKey) {
            window.open(`doctor-detail/${id}`);
        } else {
            navigate(`/doctor-detail/${id}`);
        }
    };

    const handleHomeOnClick = (e) => {
        if (e.ctrlKey) {
            window.open(`/`);
        } else {
            navigate(`/`);
        }
    };

    return (
        <React.Fragment>
            <header className={cx('header')}>
                <div className={cx('home-icon')} onClick={(e) => handleHomeOnClick(e)}>
                    <img src="/images/arrow-thick-left.svg" alt="Home" />
                </div>
                <span>Doctors</span>
            </header>
            <div className={cx('outstanding-doctor-list')}>
                <h2>Top doctors</h2>
                {topDoctor &&
                    topDoctor.map((item, index) => {
                        return (
                            <div key={index} className={cx('doctor-section')}>
                                <div className={cx('doctor-wrapper')} onClick={(e) => handleDoctorOnClick(e, item.id)}>
                                    <div className={cx('avartar')}>
                                        <img src={item.image} alt="error" />
                                    </div>
                                    <div className={cx('right-text')}>
                                        <h3>{getDoctorIntro(item)}</h3>
                                        <p>{item.Doctor_Infor.nameSpecialty}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </React.Fragment>
    );
}

export default TopDoctorViewAll;
