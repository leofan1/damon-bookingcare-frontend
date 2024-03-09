import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import cl from 'classnames';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { toast } from 'react-toastify';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './DoctorManageShedule.module.scss';
import { doctorService } from '../../../services';
import { DatePicker02 } from '../../../common/DatePicker';

const cx = classNames.bind(styles);
const timesArr = [
    { value: 'T1', label: '08:00 - 09:00', picked: false },
    { value: 'T2', label: '09:00 - 10:00', picked: false },
    { value: 'T3', label: '10:00 - 11:00', picked: false },
    { value: 'T4', label: '11:00 - 12:00', picked: false },
    { value: 'T5', label: '13:00 - 14:00', picked: false },
    { value: 'T6', label: '14:00 - 15:00', picked: false },
    { value: 'T7', label: '15:00 - 16:00', picked: false },
    { value: 'T8', label: '16:00 - 17:00', picked: false },
];

function DoctorManageShedule() {
    const [doctor, setDoctor] = useState();
    const [date, setDate] = useState(new Date());
    const [pickedTimes, setPickedTimes] = useState(timesArr);

    let { id } = useParams();

    const handleOnchangeDatePicker = (date) => {
        if (doctor) {
            getScheduleByDate(doctor.value, moment(date[0]).format('DD/MM/YYYY'));
        }
        setDate(date[0]);
    };

    const getScheduleByDate = async (doctorId, date) => {
        try {
            let res = await doctorService.getScheduleDoctorByDate(doctorId, date);
            let newArr = [];
            if (res.errCode === 0) {
                timesArr.map((item) => {
                    if (res.data.length > 0) {
                        for (let i = 0; i < res.data.length; i++) {
                            if (item.value === res.data[i].timeType) {
                                item.picked = true;
                                break;
                            } else {
                                if (i === res.data.length - 1) {
                                    item.picked = false;
                                }
                            }
                        }
                    } else {
                        item.picked = false;
                    }
                    newArr.push(item);
                });
                setPickedTimes(newArr);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const getDoctor = async () => {
        try {
            getScheduleByDate(+id, moment(date).format('DD/MM/YYYY'));
            let res = await doctorService.getDetailInfoDoctor(+id);
            if (res.errCode === 0) {
                let doctor = res.data;
                let object = {};
                object.value = doctor.id;
                object.label = `${doctor.firstName} ${doctor.lastName}`;
                setDoctor(object);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getDoctor();
        window.scrollTo(0, 0);
    }, []);

    // Btn handle
    const handleChooseTime = (time) => {
        const copyState = [...pickedTimes];
        copyState.map((item) => {
            if (item.value === time.value) {
                item.picked = !item.picked;
            }
        });
        setPickedTimes(copyState);
    };

    const handleSubmit = async (e) => {
        const timeRanges = pickedTimes.filter((item) => item.picked === true);

        try {
            const arr = [];
            if (timeRanges) {
                timeRanges.map((item) => {
                    let obj = {};
                    obj.doctorId = doctor.value;
                    obj.date = moment(date).format('DD/MM/YYYY');
                    obj.timeType = item.value;
                    arr.push(obj);
                });
            }

            const res = await doctorService.saveBulkScheduleDoctor({
                arrSchedule: arr,
                doctorId: doctor.value,
                date: moment(date).format('DD/MM/YYYY'),
            });
            if (res.errCode === 0) {
                toast.success('Save schedule time successfully!');
            }
        } catch (e) {
            console.log('Connect to server error!');
        }
    };

    return (
        <div className={cx('manage-schedule')}>
            <div className={cl('container', cx('custom'))}>
                <h1>Manage schedule time</h1>
                <label>{`Doctor: ${doctor ? doctor.label : ''}`}</label>
                <div>
                    <label>Choose date</label>
                    <div className={cx('manageShedule-datePicker')}>
                        <DatePicker02
                            className="form-control"
                            onChange={handleOnchangeDatePicker}
                            value={date}
                            seleted={date}
                            minDate={new Date().setDate(new Date().getDate() - 1)}
                        />
                    </div>
                </div>
                <div className={cx('time-picker')}>
                    {pickedTimes.map((item, index) => {
                        return (
                            <button
                                key={index}
                                value={item.value}
                                className={cl('btn-time', cx({ picked: item.picked }))}
                                onClick={() => handleChooseTime(item)}
                            >
                                {item.label}
                            </button>
                        );
                    })}
                </div>
                <button className={cl('btn', 'btn-primary', cx('btn-custom'))} onClick={(e) => handleSubmit(e)}>
                    Save schedule
                </button>
            </div>
        </div>
    );
}

export default DoctorManageShedule;
