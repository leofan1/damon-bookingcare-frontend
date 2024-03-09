import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import cl from 'classnames';
import { Buffer } from 'buffer';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCircleArrowLeft, faLeftRight, faLongArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { specialtyService } from '../../services';
import styles from './TopSpecialtyViewAll.module.scss';
import { faCircleLeft } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

const getDoctorIntro = (doctor) => {
    let pos = doctor ? doctor.positionData.valueVi : null;
    return doctor ? (pos !== 'Bác sĩ' ? `${pos}, ` : '') + `Bác sĩ ${doctor.firstName} ${doctor.lastName}` : '';
};

function TopSpecialtyViewAll() {
    const [specialty, setSpecialty] = useState();
    const navigate = useNavigate();

    const getSpecialties = async () => {
        try {
            let res = await specialtyService.getAllSpecialtiesService('ALL');
            if (res.errCode === 0 && res.data.length > 0) {
                setSpecialty(res.data);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getSpecialties();
    }, []);

    const handleSpecialtyOnClick = (e, id) => {
        if (e.ctrlKey) {
            window.open(`specialty-detail/${id}`);
        } else {
            navigate(`/specialty-detail/${id}`);
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
                <span>Specialties</span>
            </header>
            <div className={cx('specialty-list')}>
                {specialty &&
                    specialty.map((item, index) => {
                        return (
                            <div key={index} className={cx('specialty-section')}>
                                <div
                                    className={cx('specialty-wrapper')}
                                    onClick={(e) => handleSpecialtyOnClick(e, item.id)}
                                >
                                    <div className={cx('avartar')}>
                                        <img src={item.image} alt="error" />
                                    </div>
                                    <div className={cx('right-text')}>
                                        <h3>{item.name}</h3>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </React.Fragment>
    );
}

export default TopSpecialtyViewAll;
