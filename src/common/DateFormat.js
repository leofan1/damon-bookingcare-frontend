import moment from 'moment';
import 'moment/locale/vi';

export const getArrDays = () => {
    let arrDays = [];
    for (let i = 0; i < 7; i++) {
        let object = {};
        let timeStampValue = moment(new Date()).add(i, 'days').startOf('day').valueOf(); //timeStamp
        if (i === 0) {
            let ddMM = moment(new Date(timeStampValue)).format('DD/MM');
            let today = `Hôm nay - ${ddMM}`;
            object.label = today;
        } else {
            let vnTime = moment(new Date(timeStampValue)).locale('vi').format('dddd - DD/MM');
            object.label = vnTime.charAt(0).toUpperCase() + vnTime.slice(1);
        }
        object.date = moment(new Date(timeStampValue)).format('DD/MM/YYYY');

        object.value = timeStampValue;

        arrDays.push(object);
    }
    return arrDays;
};
