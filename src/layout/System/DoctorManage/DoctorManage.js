import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import cl from 'classnames';
import classNames from 'classnames/bind';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { toast } from 'react-toastify';

import styles from './DoctorManage.module.scss';
import { doctorService, userService, specialtyService, clinicService } from '../../../services';

const cx = classNames.bind(styles);
const mdParser = new MarkdownIt();

function DoctorManage() {
    const [allCode, setAllCode] = useState();
    const [priceOption, setPriceOption] = useState();
    const [paymentOption, setPaymentOption] = useState();

    const [priceSelected, setPriceSelected] = useState();
    const [paymentSelected, setPaymentSelected] = useState({});

    const [doctorOption, setDoctorOption] = useState();
    const [doctorSelected, setDoctorSelected] = useState();

    const [specialtyOption, setSpecialtyOption] = useState();
    const [specialtySelected, setSpecialtySelected] = useState({});

    const [descValue, setDescValue] = useState({ descText: '', descHTML: '' });
    const [contentValue, setContentValue] = useState({ contentText: '', contentHTML: '' });

    const [clinicOption, setClinicOption] = useState();
    const [clinicSelected, setClinicSelected] = useState({});

    const [note, setNote] = useState('');

    const handleChangeDoctor = (option) => {
        getDoctorById(option.value);
        setDoctorSelected(option);
    };
    const handleChangePrice = (option) => {
        setPriceSelected(option);
    };
    const handleChangePayment = (option) => {
        setPaymentSelected(option);
    };

    const handleChangeSpecialty = (option) => {
        setSpecialtySelected(option);
    };

    const handleChangeClinic = (option) => {
        setClinicSelected(option);
    };

    const getClinics = async () => {
        try {
            let res = await clinicService.getAllClinicsService();
            if (res && res.data.length > 0) {
                let newArr = [];
                res.data.map((item) => {
                    let obj = {};
                    obj.value = item.id;
                    obj.label = item.name;
                    obj.provinceId = item.provinceId;
                    obj.address = item.address;
                    newArr.push(obj);
                });
                setClinicOption(newArr);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const getDoctorById = async (doctorId) => {
        try {
            const res = await doctorService.getDetailInfoDoctor(doctorId);

            if (res && res.errCode === 0) {
                setDescValue({
                    descText: res.data.Markdown.discriptionMarkdown ? res.data.Markdown.discriptionMarkdown : '',
                    descHTML: res.data.Markdown.discriptionHTML ? res.data.Markdown.discriptionHTML : '',
                });
                setContentValue({
                    contentText: res.data.Markdown.contentMarkdown ? res.data.Markdown.contentMarkdown : '',
                    contentHTML: res.data.Markdown.contentHTML ? res.data.Markdown.contentHTML : '',
                });

                let price = {};
                price.value = res.data.Doctor_Infor.priceId ? res.data.Doctor_Infor.priceId : '';
                price.label = '';
                for (let i = 0; i < allCode.length; i++) {
                    if (allCode[i].keyMap === res.data.Doctor_Infor.priceId) {
                        price.label = allCode[i].valueVi;
                        break;
                    }
                }

                let payment = {};
                payment.value = res.data.Doctor_Infor.paymentId ? res.data.Doctor_Infor.paymentId : '';
                payment.label = '';
                for (let i = 0; i < allCode.length; i++) {
                    if (allCode[i].keyMap === res.data.Doctor_Infor.paymentId) {
                        payment.label = allCode[i].valueVi;
                        break;
                    }
                }
                setPriceSelected(price);
                setPaymentSelected(payment);

                let specialty = {};
                specialty.value = res.data.Doctor_Infor.specialtyId;
                specialty.label = res.data.Doctor_Infor.nameSpecialty;
                setSpecialtySelected(specialty);

                setClinicSelected({
                    value: res.data.Doctor_Infor.clinicId ? res.data.Doctor_Infor.clinicId : '',
                    label: res.data.Doctor_Infor.nameClinic ? res.data.Doctor_Infor.nameClinic : '',
                    provinceId: res.data.Doctor_Infor.provinceId ? res.data.Doctor_Infor.provinceId : '',
                    address: res.data.Doctor_Infor.addressClinic ? res.data.Doctor_Infor.addressClinic : '',
                });

                setNote(res.data.Doctor_Infor.note ? res.data.Doctor_Infor.note : '');
            }
        } catch (e) {
            console.log(e);
        }
    };

    const getAllCode = async () => {
        try {
            let res = await userService.getAllCodeService();
            if (res && res.data.length > 0) {
                let prices = [];
                let payments = [];

                res.data.map((item) => {
                    if (item.type === 'PRICE') {
                        prices.push({ value: item.keyMap, label: item.valueVi });
                    }

                    if (item.type === 'PAYMENT') {
                        payments.push({
                            value: item.keyMap,
                            label: item.valueVi,
                        });
                    }
                });
                setAllCode(res.data);
                setPriceOption(prices);
                setPaymentOption(payments);
            }
        } catch (e) {}
    };

    const handleDescChange = ({ html, text }) => {
        setDescValue({
            descText: text,
            descHTML: html,
        });
    };
    const handleContentChange = ({ html, text }) => {
        setContentValue({
            contentText: text,
            contentHTML: html,
        });
    };

    const handleSubmit = async () => {
        try {
            if (!doctorSelected) {
                toast.error('Please choose doctor!');
            } else if (
                !descValue.descText.trim() ||
                !contentValue.contentText.trim() ||
                !priceSelected.value ||
                !paymentSelected.value
            ) {
                toast.error('Please fill full information!');
            } else {
                if (doctorSelected.value < 29) {
                    toast.error('Can not edit seeding data - không thể sửa dữ liệu mẫu!');
                } else {
                    let res = await doctorService.saveDetailDoctorService({
                        doctorId: doctorSelected.value,
                        descHTML: descValue.descHTML,
                        descText: descValue.descText,
                        contentHTML: contentValue.contentHTML,
                        contentText: contentValue.contentText,

                        //doctor booking info
                        price: priceSelected.value,
                        payment: paymentSelected.value,

                        specialtyId: specialtySelected.value,
                        specialtyName: specialtySelected.label,

                        clinicId: clinicSelected.value,
                        clinicName: clinicSelected.label,
                        provinceId: clinicSelected.provinceId,
                        clinicAddress: clinicSelected.address,
                        note: note,
                    });
                    if (res.errCode === 0) {
                        window.scrollTo(0, 0);
                        toast.success('Save information successfully!');
                        setDoctorSelected('');
                        setSpecialtySelected('');
                        setClinicSelected('');
                        setPriceSelected('');
                        setPaymentSelected('');
                        setDescValue({});
                        setContentValue({});
                        setNote('');
                        getAllDoctor();
                    }
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    const getSelectDoctor = (arr) => {
        let doctors = [];
        if (arr && arr.length > 0) {
            arr.map((item, index) => {
                let object = {};
                object.value = item.id;
                object.label = `${item.firstName} ${item.lastName}`;
                object.Markdown = item.Markdown;
                doctors.push(object);
            });
        }

        return doctors;
    };
    const getAllDoctor = async () => {
        try {
            let res = await doctorService.getAllDoctorService();
            if (res.errCode === 0 && res.data.length > 0) {
                let doctors = getSelectDoctor(res.data);
                setDoctorOption(doctors);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const getSpecialties = async () => {
        try {
            let res = await specialtyService.getAllSpecialtiesService('ALL');

            if (res.errCode === 0 && res.data.length > 0) {
                let arrNew = [];
                res.data.map((item, index) => {
                    let obj = {};
                    obj.label = item.name;
                    obj.value = item.id;
                    arrNew.push(obj);
                });
                setSpecialtyOption(arrNew);
            }
        } catch (e) {}
    };

    useEffect(() => {
        getAllDoctor();
        getAllCode();
        getClinics();
        getSpecialties();
    }, []);

    return (
        <div className={cx('doctor-manager')}>
            <div className={cl('container', cx('custom'))}>
                <h1>Add doctors information</h1>
                <label>Choose doctor</label>
                <Select value={doctorSelected} onChange={handleChangeDoctor} options={doctorOption} />

                <div className={cx('booking-infor')}>
                    <div>
                        <label>Specialty name</label>
                        <Select value={specialtySelected} onChange={handleChangeSpecialty} options={specialtyOption} />
                    </div>

                    <div>
                        <label>Clinic name</label>
                        <Select
                            value={clinicSelected ? clinicSelected : ''}
                            onChange={handleChangeClinic}
                            options={clinicOption}
                        />
                    </div>

                    <div>
                        <label>Price</label>
                        <Select value={priceSelected} onChange={handleChangePrice} options={priceOption} />
                    </div>

                    <div>
                        <label>Payment methods</label>
                        <Select value={paymentSelected} onChange={handleChangePayment} options={paymentOption} />
                    </div>

                    <div>
                        <label>note</label>
                        <input className={cx('no-select')} value={note} onChange={(e) => setNote(e.target.value)} />
                    </div>
                    <div className={cl('col-8')}>
                        <label>Clinic address</label>
                        <div className={cx('no-select')}>{clinicSelected.address}</div>
                    </div>
                </div>
                <label>Short description</label>
                <MdEditor
                    style={{ height: '220px' }}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={handleDescChange}
                    value={descValue.descText ? descValue.descText : ''}
                />

                <label>Detail information</label>
                <MdEditor
                    style={{ height: '500px' }}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={handleContentChange}
                    value={contentValue.contentText ? contentValue.contentText : ''}
                />
                <button className={cl('btn', 'btn-primary')} onClick={handleSubmit}>
                    Save
                </button>
            </div>
        </div>
    );
}

export default DoctorManage;
