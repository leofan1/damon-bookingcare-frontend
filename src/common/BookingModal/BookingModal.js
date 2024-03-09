import React, { useEffect, useState, memo } from 'react';
import classNames from 'classnames/bind';
import cl from 'classnames';
import { Buffer } from 'buffer';
import { Modal } from 'reactstrap';
import moment from 'moment';
import 'moment/locale/vi';
import { toast } from 'react-toastify';

import './BookingModal.scss';
import { doctorService, userService } from '../../services';
import ViCurrencyFormat from '../ViCurrencyFormat';

function BookingModal({ doctorId, time, toggleModal, className: propClass, handleToggle = (e) => {} }) {
    const [doctorInfo, setDoctorInfo] = useState();
    const [allCode, setAllCode] = useState();
    const [bookingData, setBookingData] = useState({
        doctorId: '',
        dateTimestamp: '',
        time: '',
        fullName: '',
        email: '',
        phone: '',
        address: '',
        gender: 'M',
        birthYear: '',
        reason: '',
    });

    const handleInputOnchange = (e, type) => {
        let copyState = { ...bookingData };
        copyState[type] = e.target.value;
        setBookingData(copyState);
    };

    const getDoctorInfoApi = async (doctorId) => {
        try {
            let res = await doctorService.getDetailInfoDoctor(doctorId);
            if (res && res.data) {
                setDoctorInfo(res.data);
            }
        } catch (e) {}
    };

    const handleSubmit = async () => {
        let copyState = {
            ...bookingData,
            doctorId: doctorId,
            time: time.hoursRange,
            dateTimestamp: time.dateStamp,
        };
        try {
            let res = await userService.postPatientBookAppointment(copyState);
            if (res.errCode === 0) {
                toast.success(res.errMessage);
                setBookingData({
                    doctorId: '',
                    dateTimestamp: '',
                    time: '',
                    fullName: '',
                    email: '',
                    phone: '',
                    address: '',
                    gender: 'M',
                    birthYear: '',
                    reason: '',
                });
                handleToggle(false);
            } else {
                toast.error(res.errMessage);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getAllCode();
        getDoctorInfoApi(doctorId);
    }, []);

    const pos = doctorInfo ? doctorInfo.positionData.valueVi : null;
    const doctorTitle = doctorInfo
        ? (pos !== 'Bác sĩ' ? `${pos}, ` : '') + `Bác sĩ ${doctorInfo.firstName} ${doctorInfo.lastName}`
        : '';

    const imageBase64 =
        doctorInfo && doctorInfo.image ? Buffer.from(doctorInfo.image, 'base64').toString('binary') : '';

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
            if (doctorInfo) {
                for (let i = 0; i < allCode.length; i++) {
                    if (allCode[i].keyMap === doctorInfo.Doctor_Infor.priceId) {
                        value = allCode[i].valueVi;
                    }
                }
            }
        }
        return value;
    };

    const price = getPrice(allCode) ? ViCurrencyFormat(getPrice(allCode)) : '';

    return (
        <div className={cl('booking-modal')}>
            <Modal isOpen={toggleModal} className={propClass} size="lg">
                <div className="modal-header">
                    <h2>MAKE A APPOINTMENT</h2>
                    <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        onClick={() => handleToggle(false)}
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="doctor-info">
                        <img src={imageBase64} alt="" />
                        <div>
                            <h1>{doctorTitle}</h1>
                            <p>{`Thời gian: ${time.timeDetail}`}</p>
                            <span>
                                {`Giá khám: ${price ? price : '....0'}`}
                                <sup>đ</sup>
                            </span>
                        </div>
                    </div>
                    <div className={cl('col-6', 'form-group')}>
                        <label>Full Name</label>
                        <input
                            className={cl('form-control')}
                            value={bookingData.fullName}
                            onChange={(e) => handleInputOnchange(e, 'fullName')}
                        />
                    </div>
                    <div className={cl('col-6', 'form-group')}>
                        <label>Email</label>
                        <input
                            className={cl('form-control')}
                            value={bookingData.email}
                            onChange={(e) => handleInputOnchange(e, 'email')}
                        />
                    </div>
                    <div className={cl('col-6', 'form-group')}>
                        <label>Phone</label>
                        <input
                            className={cl('form-control')}
                            value={bookingData.phone}
                            onChange={(e) => handleInputOnchange(e, 'phone')}
                        />
                    </div>

                    <div className={cl('col-6', 'form-group')}>
                        <label>Address</label>
                        <input
                            className={cl('form-control')}
                            value={bookingData.address}
                            onChange={(e) => handleInputOnchange(e, 'address')}
                        />
                    </div>
                    <div className={cl('col-6', 'form-group')}>
                        <label>Date of birth</label>
                        <input
                            className={cl('form-control')}
                            value={bookingData.birthYear}
                            onChange={(e) => handleInputOnchange(e, 'birthYear')}
                        />
                    </div>
                    <div className={cl('col-6', 'form-group')}>
                        <label>Gender</label>
                        <select
                            className={cl('form-control')}
                            value={bookingData.gender}
                            onChange={(e) => handleInputOnchange(e, 'gender')}
                        >
                            <option value="M">Nam</option>
                            <option value="F">Nữ</option>
                        </select>
                    </div>
                    <div className={cl('col-12', 'form-group')}>
                        <label>Symptoms</label>
                        <textarea
                            className={cl('form-control')}
                            value={bookingData.reason}
                            onChange={(e) => handleInputOnchange(e, 'reason')}
                        />
                    </div>
                </div>
                <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-secondary cancel"
                        data-dismiss="modal"
                        onClick={() => handleToggle(false)}
                    >
                        Cancel
                    </button>
                    <button type="button" className={cl('btn', 'btn-primary', 'submit')} onClick={() => handleSubmit()}>
                        Book
                    </button>
                </div>
            </Modal>
        </div>
    );
}

export default memo(BookingModal);
