import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import cl from 'classnames';
import Select from 'react-select';
import { Buffer } from 'buffer';
import { useParams } from 'react-router-dom';

import styles from './SpecialtyDetail.module.scss';
import { doctorService, specialtyService } from '../../services';
import { Header } from '../Home/Header';
import BookingDetail from '../DoctorDetail/BookingDetail';
import DoctorBooking from '../../common/DateScheduleTimes/DoctorBooking';
import { Footer } from '../../common/Footer';

const cx = classNames.bind(styles);

const optionArr = [
    { value: 'ALL', label: 'Toàn quốc' },
    { value: 'PRO1', label: 'Hà Nội' },
    { value: 'PRO2', label: 'Hồ Chí Minh' },
];

const getDoctorIntro = (doctor) => {
    let pos = doctor ? doctor.positionData.valueVi : null;
    return doctor ? (pos !== 'Bác sĩ' ? `${pos}, ` : '') + `Bác sĩ ${doctor.firstName} ${doctor.lastName}` : '';
};
const getBase64 = (doctor) => {
    return doctor && doctor.image ? Buffer.from(doctor.image, 'base64').toString('binary') : '';
};

function SpecialtyDetail() {
    const [positionSelect, setPositionSelect] = useState(optionArr[0]);
    const [allDoctors, setAllDoctors] = useState();
    const [doctors, setDoctors] = useState();
    const [specialty, setSpecialty] = useState();
    const [toggleBtn, setToggleBtn] = useState(true);
    const navigate = useNavigate();

    let { id } = useParams();

    const handleOnchangeSelect = (option) => {
        setPositionSelect(option);

        if (allDoctors && allDoctors.length > 0) {
            if (option.value === 'ALL') {
                setDoctors(allDoctors);
            } else {
                let newArr = [];
                allDoctors.map((item) => {
                    if (option.value === item.Doctor_Infor.provinceId) {
                        newArr.push(item);
                    }
                });
                setDoctors(newArr);
            }
        }
    };

    const getAllDoctors = async () => {
        try {
            let res = await doctorService.getAllDoctorService();

            if (res && res.data.length > 0) {
                let newArr = [];
                res.data.map((item) => {
                    if (item.Doctor_Infor.specialtyId === +id) {
                        newArr.push(item);
                    }
                });

                setDoctors(newArr);
                setAllDoctors(newArr);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const getSpecialtyById = async (inputId) => {
        try {
            let res = await specialtyService.getAllSpecialtiesService(inputId);

            if (res.errCode === 0) {
                setSpecialty(res.data);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getSpecialtyById(+id);
        getAllDoctors();
    }, []);

    const handleToggleBtn = () => {
        let status = toggleBtn;
        setToggleBtn(!status);
    };

    const handleViewDoctorDetail = (e, doctorId) => {
        if (e.ctrlKey) {
            window.open(`/doctor-detail/${doctorId}`);
        } else {
            navigate(`/doctor-detail/${doctorId}`);
        }
    };

    return (
        <React.Fragment>
            <Header home={false} />
            <div style={{ backgroundImage: specialty ? `url(${specialty.image})` : '' }} className={cx('introduce')}>
                <div className={cx('introduce-custom')}>
                    <div className={cl('container')}>
                        <div
                            className={cx('introduce-content', { 'fixed-height': toggleBtn })}
                            dangerouslySetInnerHTML={{
                                __html: specialty ? specialty.descriptionHTML : '',
                            }}
                        />
                        <div className={cx('toggle-btn')}>
                            <button onClick={() => handleToggleBtn()}>
                                {toggleBtn ? 'Đọc thêm ...' : 'Ẩn bớt <<'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('booking')}>
                <div className={cl('container', cx('booking-custom'))}>
                    <div className={cx('select')}>
                        <Select value={positionSelect} onChange={handleOnchangeSelect} options={optionArr} />
                    </div>

                    <div className={cx('doctor-booking')}>
                        {doctors &&
                            doctors.length > 0 &&
                            doctors.map((item, index) => {
                                return (
                                    <div key={index} className={cx('doctor-section')}>
                                        <div className={cl('col-7', cx('doctor-introduce'))}>
                                            <div className={cx('doctor-introduce-left')}>
                                                <div className={cx('doctor-avatar')}>
                                                    <img
                                                        src={item.image ? getBase64(item) : '/images/wait-avartar.jpg'}
                                                        alt="Error"
                                                    />
                                                </div>
                                                <div
                                                    onClick={(e) => handleViewDoctorDetail(e, item.id)}
                                                    className={cx('view-more')}
                                                >
                                                    Xem thêm
                                                </div>
                                            </div>
                                            <div className={cx('text')}>
                                                <h1>{getDoctorIntro(item)}</h1>
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: item.Markdown ? item.Markdown.discriptionHTML : '',
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className={cl('col-5', cx('col-5-custom'))}>
                                            <DoctorBooking doctorId={item.id} className={cx('doctor-booking')} />
                                            <BookingDetail
                                                data={item ? item.Doctor_Infor : ''}
                                                className={cx('booking-detail')}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
            <Footer />
        </React.Fragment>
    );
}

export default SpecialtyDetail;
