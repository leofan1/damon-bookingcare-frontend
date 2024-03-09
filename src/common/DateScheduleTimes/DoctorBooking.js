import React, { useState, memo, useRef } from 'react';
import moment from 'moment';
import 'moment/locale/vi';

import './DoctorBooking.scss';
import DateScheduleTimes from './DateScheduleTimes';
import { BookingModal } from '../../common';

function DoctorBooking({ doctorId }) {
    const [modalShow, setModalShow] = useState(false);
    const [dateTime, setDateTime] = useState({});

    const handleToggleModal = (status, dateTimeStamp, time) => {
        if (status && time && dateTimeStamp) {
            setModalShow(status);
            let dateFull = moment(new Date(parseInt(dateTimeStamp)))
                .locale('vi')
                .format('dddd - DD/MM');
            let dateTimeUpper = dateTimeStamp ? dateFull.charAt(0).toUpperCase() + dateFull.slice(1) : '';
            setDateTime({ timeDetail: `${time} - ${dateTimeUpper}`, hoursRange: time, dateStamp: dateTimeStamp });
        } else if (!status) {
            setModalShow(status);
        }
    };

    const ref = useRef(handleToggleModal);

    return (
        <React.Fragment>
            <DateScheduleTimes doctorId={doctorId} handleToggle={ref.current} />
            <BookingModal
                className="doctordetail-bookingModal-custom"
                toggleModal={modalShow}
                handleToggle={ref.current}
                time={dateTime}
                doctorId={doctorId}
            />
        </React.Fragment>
    );
}

export default memo(DoctorBooking);
