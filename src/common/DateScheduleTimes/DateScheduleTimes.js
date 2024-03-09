import React, { useEffect, useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import cl from 'classnames';
import moment from 'moment';
import 'moment/locale/vi';

import styles from './DateScheduleTimes.module.scss';
import * as actions from '../../store/actions';
// import './DateScheduleTimes.scss';

import { doctorService } from '../../services';
import { getArrDays } from '../../common';

const cx = classNames.bind(styles);

function DateScheduleTimes({ doctorId, className: propClass, handleToggle = (e) => {}, ...props }) {
    const [selectDate, setSelectDate] = useState(moment(new Date()).add(0, 'days').startOf('day').valueOf().toString());
    const [scheduleTimes, setScheduleTimes] = useState();
    const navigate = useNavigate();
    const { isLoggedIn, userInfo, navigateUrl, setNageteUrl } = props;

    let dates = getArrDays();
    const getScheduleByDate = async (id, date) => {
        try {
            let res = await doctorService.getScheduleDoctorByDate(id, date);

            if (res.errCode === 0 && res.data.length > 0) {
                setScheduleTimes(res.data);
            } else {
                setScheduleTimes('');
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handleDateOnchange = (e) => {
        setSelectDate(e.target.value);
        let date = moment(new Date(+e.target.value)).format('DD/MM/YYYY');
        getScheduleByDate(doctorId, date);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        const date = moment(new Date(+selectDate)).format('DD/MM/YYYY');
        getScheduleByDate(doctorId, date);
    }, []);

    const handleCreateSheduleClick = (e) => {
        if (isLoggedIn) {
            if (e.ctrlKey) {
                window.open(`/system/doctor-schedule/${doctorId}`);
            } else {
                navigate(`/system/doctor-schedule/${doctorId}`);
            }
        } else {
            if (navigateUrl !== `/system/doctor-schedule/${doctorId}`) {
                setNageteUrl(`/system/doctor-schedule/${doctorId}`);
            }
            if (e.ctrlKey) {
                window.open(`/system/doctor-schedule/${doctorId}`);
            } else {
                navigate(`/system/doctor-schedule/${doctorId}`);
            }
        }
    };

    return (
        <div className={cl(cx('date-schedule-time'), { [propClass]: propClass })}>
            <div className={cx('date-select')}>
                <select value={selectDate} onChange={(e) => handleDateOnchange(e)}>
                    {dates &&
                        dates.map((date, index) => {
                            return (
                                <option key={index} value={date.value}>
                                    {date.label}
                                </option>
                            );
                        })}
                </select>
            </div>
            <div className={cx('time-label')}>
                <span>
                    <FontAwesomeIcon icon={faCalendarDays} />
                </span>
                <p>LỊCH KHÁM</p>
            </div>
            <div className={cl('row')}>
                <div className={cl('col-12')}>
                    <div>
                        <div className={cx('booking-time')}>
                            {scheduleTimes
                                ? scheduleTimes.map((button, index) => {
                                      return (
                                          <button
                                              key={index}
                                              onClick={() =>
                                                  handleToggle(true, selectDate, button.timeTypeData.valueVi)
                                              }
                                              className={cl('btn-time')}
                                          >
                                              {button.timeTypeData.valueVi}
                                          </button>
                                      );
                                  })
                                : 'Không có lịch hẹn nào, vui lòng chọn ngày khác!'}
                        </div>
                        <p className={cx('free-booking')}>
                            <span>Choose</span>
                            <span className={cx('booking-hand-point')}>
                                <img src="/images/hand-point.svg" alt="" />
                            </span>
                            <span>
                                and booking time (booking fee 0<sup>đ</sup>)
                            </span>
                        </p>
                        <div className={cx('admin-manage-schedule')}>
                            <button onClick={(e) => handleCreateSheduleClick(e)}>
                                Admin - manage doctor schedule time
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        navigateUrl: state.user.navigateUrl,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setNageteUrl: (url) => dispatch(actions.setNavigateUrl(url)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(DateScheduleTimes));
