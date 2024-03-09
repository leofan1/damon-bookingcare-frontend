import React, { useEffect, useState } from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { toast } from 'react-toastify';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import cl from 'classnames';
import { specialtyService } from '../../../services';

import styles from './SpecialtyManage.module.scss';

const mdParser = new MarkdownIt();
const cx = classNames.bind(styles);

const toBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

function SpecialtyManage() {
    const [state, setState] = useState({
        id: '',
        name: '',
        image: '',
        descHTML: '',
        descMarkdown: '',
        edit: false,
    });

    const [specialtyTable, SetSpecialtyTable] = useState();
    const [imageUrl, setImageUrl] = useState('');

    const handleOnchangeName = (e) => {
        setState({
            ...state,
            name: e.target.value,
        });
    };

    const handleOnchangeImage = async (e, id) => {
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

    const handleSubmit = async () => {
        try {
            let res = await specialtyService.createSpcialty(state);
            if (res.errCode === 0) {
                toast.success(res.errMessage);
                setState({
                    id: '',
                    name: '',
                    image: '',
                    descHTML: '',
                    descMarkdown: '',
                });
                setImageUrl('');
                getAllSpecialties();
            } else {
                toast.error(res.errMessage);
            }
        } catch (e) {
            toast.error('Somethings wrong...');
            console.log(e);
        }
    };

    const getAllSpecialties = async () => {
        const res = await specialtyService.getAllSpecialtiesService('ALL');
        if (res && res.errCode === 0 && res.data.length > 0) {
            SetSpecialtyTable(res.data.reverse());
        }
    };

    useEffect(() => {
        getAllSpecialties();
    }, []);

    const handleEditSpecialty = (item) => {
        if (item.id < 9) {
            toast.error('Can not edit seeding data - không thể sửa dữ liệu mẫu!');
        } else {
            setState({
                id: item.id,
                name: item.name,
                image: item.image,
                descHTML: item.descriptionHTML,
                descMarkdown: item.descriptionMarkdown,
            });

            setImageUrl(item.image);
            window.scrollTo(0, 100);
        }
    };

    const handleDeleteSpecialty = async (item, index) => {
        if (item.id < 9) {
            toast.error('Can not delete seeding data - không thể xóa dữ liệu mẫu!');
        } else {
            try {
                let res = await specialtyService.deleteSpecialtyService(item.id);
                if (res.errCode === 0) {
                    toast.success(res.message);
                    getAllSpecialties();
                }
            } catch (e) {
                console.log(e);
            }
        }
    };

    return (
        <div className={cx('specialty-manager')}>
            <div className={cl('container', cx('custom'))}>
                <h1>Manage Specialties</h1>
                <div className={cx('left-50-container')}>
                    <div className={cx('input-fill')}>
                        <label>Specialty name:</label>
                        <input value={state.name} onChange={(e) => handleOnchangeName(e)} />
                    </div>
                    <div className={cx('user-form')}>
                        <div className={cl(cx('user-img'))}>
                            <div className={cx('img-load')}>
                                <label htmlFor="img-lodoad-focus">
                                    Load image
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
                <label>Specialty description</label>
                <MdEditor
                    style={{ height: '500px' }}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={handleDescChange}
                    value={state.descMarkdown ? state.descMarkdown : ''}
                />

                <button onClick={() => handleSubmit()} className={cl('btn', 'btn-primary', cx('btn-custom'))}>
                    {state.id ? 'Upadate' : 'Add specialty'}
                </button>

                <table className={cx('table')}>
                    <thead>
                        <tr>
                            <th className={cx('name')}>Specialty name</th>
                            <th className={cx('action')}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {specialtyTable &&
                            specialtyTable.length > 0 &&
                            specialtyTable.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className={cx('name')}>{item.name}</td>
                                        <td className={cx('action')}>
                                            <span onClick={() => handleEditSpecialty(item)}>
                                                <FontAwesomeIcon icon={faPencil} />
                                            </span>
                                            <span onClick={() => handleDeleteSpecialty(item, index)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SpecialtyManage;
