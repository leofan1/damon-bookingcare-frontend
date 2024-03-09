import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { Buffer } from 'buffer';
import { toast } from 'react-toastify';

import { clinicService, userService } from '../../../services';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import cl from 'classnames';

import styles from './ManageClinic.module.scss';

const mdParser = new MarkdownIt();
const cx = classNames.bind(styles);

const toBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

function ManageClinic() {
    const [state, setState] = useState({
        name: '',
        address: '',
        image: '',
        descHTML: '',
        descMarkdown: '',
    });

    const [provinceOption, setProvinceOption] = useState();
    const [provinceSelected, setProvinceSelected] = useState();
    const [imageUrl, setImageUrl] = useState('');

    const handleChangeProvice = (option) => {
        setProvinceSelected(option);
    };

    const getAllCode = async () => {
        try {
            let res = await userService.getAllCodeService();
            if (res && res.data.length > 0) {
                let provinces = [];
                res.data.map((item) => {
                    if (item.type === 'PROVINCE') {
                        let obj = {};
                        obj.value = item.keyMap;
                        obj.label = item.valueVi;
                        provinces.push(obj);
                    }
                });
                setProvinceOption(provinces);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handleOnchangeName = (e) => {
        setState({
            ...state,
            name: e.target.value,
        });
    };

    const handleOnchangeAddress = (e) => {
        setState({
            ...state,
            address: e.target.value,
        });
    };

    const handleOnchangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let base64 = await toBase64(file);
            let objectUrl = URL.createObjectURL(file);
            setState({
                ...state,
                image: base64,
            });
            setImageUrl(objectUrl);
        }
    };

    const handleDescChange = ({ html, text }) => {
        setState({
            ...state,
            descHTML: html,
            descMarkdown: text,
        });
    };

    const handleCreateUser = async () => {
        try {
            if (!state.name || !state.address || !state.image || !state.descMarkdown || !provinceSelected) {
                toast.error('Cần điền đủ các mục thông tin!');
            } else {
                let res = await clinicService.createClinic({
                    ...state,
                    provinceId: provinceSelected.value,
                    provinceName: provinceSelected.label,
                });
                if (res.errCode === 0) {
                    toast.success(res.errMessage);
                    setState({
                        name: '',
                        image: '',
                        address: '',
                        descHTML: '',
                        descMarkdown: '',
                    });
                    setProvinceSelected('');
                    setImageUrl('');
                    window.scrollTo(0, 0);
                } else {
                    toast.error(res.errMessage);
                }
            }
        } catch (e) {
            toast.error('Somethings wrong...');
            console.log(e);
        }
    };

    useEffect(() => {
        getAllCode();
    }, []);

    return (
        <div className={cx('clinic-manager')}>
            <div className={cl('container', cx('custom'))}>
                <h1>Clinic Management</h1>

                <div className={cx('input-container')}>
                    <div className={cx('left-50-container')}>
                        <div>
                            <label>Tên cơ sở y tế</label>
                            <input value={state.name} onChange={(e) => handleOnchangeName(e)} />
                        </div>
                        <div>
                            <label>Địa chỉ</label>
                            <input value={state.address} onChange={(e) => handleOnchangeAddress(e)} />
                        </div>
                        <div>
                            <label>Tỉnh thành</label>
                            <Select value={provinceSelected} onChange={handleChangeProvice} options={provinceOption} />
                        </div>
                    </div>
                    <div className={cx('right-50-container')}>
                        <div className={cx('user-form')}>
                            <div className={cl(cx('user-img'))}>
                                <div className={cx('img-load')}>
                                    <label htmlFor="img-lodoad-focus">
                                        Tải ảnh
                                        <span>
                                            <FontAwesomeIcon icon={faUpload} />
                                        </span>
                                    </label>
                                    <input
                                        onChange={(e) => handleOnchangeImage(e)}
                                        type="file"
                                        id="img-lodoad-focus"
                                        style={{ display: 'none' }}
                                    />
                                </div>
                                <div
                                    className={cx('img-layout')}
                                    style={{
                                        backgroundImage: imageUrl ? `url(${imageUrl})` : null,
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
                <label>Giới thiệu chuyên khoa</label>
                <MdEditor
                    style={{ height: '620px' }}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={handleDescChange}
                    value={state.descMarkdown ? state.descMarkdown : ''}
                />

                <button onClick={() => handleCreateUser()} className={cl('btn', 'btn-primary', cx('btn-custom'))}>
                    {state.editUser ? 'Cập nhật' : 'Thêm mới'}
                </button>
            </div>
        </div>
    );
}

export default ManageClinic;
