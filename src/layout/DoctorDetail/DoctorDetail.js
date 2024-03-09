import React, { useEffect, useState, createContext, memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import cl from 'classnames';
import { useParams } from 'react-router-dom';
import { Buffer } from 'buffer';
import moment from 'moment';
import 'moment/locale/vi';

import styles from './DoctorDetail.module.scss';
import { doctorService } from '../../services';
import { Header } from '../Home/Header';
import BookingDetail from './BookingDetail';
import DoctorBooking from '../../common/DateScheduleTimes/DoctorBooking';
import { Footer } from '../../common/Footer';

const cx = classNames.bind(styles);

function DoctorDetail() {
    const [doctorInfo, setDoctorInfo] = useState();
    let { id } = useParams();

    const getDoctorInfoApi = async (doctorId) => {
        try {
            let res = await doctorService.getDetailInfoDoctor(doctorId);
            if (res && res.data) {
                setDoctorInfo(res.data);
            }
        } catch (e) {}
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        getDoctorInfoApi(id);
    }, []);

    const pos = doctorInfo ? doctorInfo.positionData.valueVi : null;
    const doctorTitle = doctorInfo
        ? (pos !== 'Bác sĩ' ? `${pos}, ` : '') + `Bác sĩ ${doctorInfo.firstName} ${doctorInfo.lastName}`
        : '';

    const imageBase64 = doctorInfo && doctorInfo.image ? new Buffer(doctorInfo.image, 'base64').toString('binary') : '';

    return (
        <React.Fragment>
            <Header home={false} />
            <div className={cx('doctor-detail')}>
                <div className={cl('container', cx('content-custom'))}>
                    <div className={cx('breadcrum')}>
                        {`Khám chuyên khoa`}
                        <span>/</span>
                        {`${doctorInfo ? doctorInfo.Doctor_Infor.nameSpecialty : ''}`}
                    </div>
                    <div className={cl(cx('doctor-introduce'))}>
                        <div className={cx('doctor-avatar')}>
                            <img src={imageBase64 ? imageBase64 : '/images/wait-avartar.jpg'} alt="Error" />
                        </div>
                        <div className={cx('text')}>
                            <h1>{doctorTitle}</h1>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: doctorInfo ? doctorInfo.Markdown.discriptionHTML : '',
                                }}
                            />
                        </div>
                    </div>
                    <div className={cx('booking')}>
                        <div style={{ width: '55%' }}>
                            <DoctorBooking doctorId={id} />
                        </div>

                        <div style={{ paddingTop: '75px', width: '45%' }}>
                            <BookingDetail
                                data={doctorInfo ? doctorInfo.Doctor_Infor : ''}
                                className={cx('col-45-custom')}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('doctor-background')}>
                <div className={cl('container', cx('content-custom'))}>
                    <div
                        className={cx('background-content')}
                        dangerouslySetInnerHTML={{
                            __html: doctorInfo ? doctorInfo.Markdown.contentHTML : '',
                        }}
                    />
                </div>
            </div>
            <Footer />
        </React.Fragment>
    );
}

export default DoctorDetail;
