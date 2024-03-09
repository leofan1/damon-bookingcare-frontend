import React, { useEffect, useState } from 'react';
import { Buffer } from 'buffer';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import cl from 'classnames';

import styles from './UserManage.module.scss';
import { userService } from '../../../services';

const cx = classNames.bind(styles);

function UserManage() {
    const [state, setState] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        gender: 'M',
        degree: 'none',
        role: 'R2',
        phoneNumber: '',
        address: '',
        avatar: '',
        previewUrl: '',
        usersTable: null,
        editUser: false,
    });

    const getAllUsers = async () => {
        const res = await userService.getAllUsersService();

        if (res && res.errCode === 0 && res.users.length > 0) {
            setState({
                ...state,
                usersTable: res.users.reverse(),
            });
        }
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    const handleOnchange = (e, id) => {
        const copyState = { ...state };
        copyState[id] = e.target.value;
        setState({
            ...copyState,
        });
    };

    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    const handleOnchangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let base64 = await toBase64(file);
            let objectUrl = URL.createObjectURL(file);
            const copyState = { ...state };
            copyState.avatar = base64;
            copyState.previewUrl = objectUrl;

            setState({
                ...copyState,
            });
        }
    };

    const handleDeleteUser = async (inputUser, index) => {
        if (inputUser.id < 29) {
            toast.error('Can not delete seeding data - không thể xóa dữ liệu mẫu!');
        } else {
            try {
                let res = await userService.deleteUserService(inputUser.email);
                if (res && res.errCode === 0) {
                    toast.success('Delete user successfully!');
                    let copyState = { ...state };
                    copyState.usersTable.splice(index, 1);
                    setState({
                        ...copyState,
                        email: '',
                        password: '',
                        firstName: '',
                        lastName: '',
                        gender: 'M',
                        degree: 'none',
                        role: 'R1',
                        phoneNumber: '',
                        address: '',
                        avatar: '',
                        previewUrl: '',
                    });
                }
            } catch (e) {
                console.log(e);
            }
        }
    };

    const handleEditUser = async (inputUser) => {
        if (inputUser.id < 29) {
            toast.error('Can not edit seeding data - không thể sửa dữ liệu mẫu!');
        } else {
            try {
                const res = await userService.getUserByEmailService(inputUser.email);

                if (res && res.errCode === 0) {
                    let imageBase64 = '';
                    const user = res.user;
                    if (user.image) {
                        imageBase64 = Buffer.from(user.image, 'base64').toString('binary');
                    }
                    let copyState = { ...state };
                    setState({
                        ...copyState,
                        email: user.email,
                        password: 'hardcodevn',
                        firstName: user.firstName,
                        lastName: user.lastName,
                        gender: user.gender,
                        degree: user.positionId,
                        role: user.roleId,
                        phoneNumber: user.phonenumber,
                        address: user.address,
                        avatar: imageBase64,
                        previewUrl: imageBase64,
                        editUser: true,
                    });
                }
            } catch (e) {
                console.log(e);
            }
        }
    };

    const handleUpdateUser = async () => {
        try {
            if (
                !state.email ||
                !state.firstName ||
                !state.lastName ||
                !state.address ||
                !state.phoneNumber ||
                !state.gender ||
                !state.avatar ||
                !state.role
            ) {
                toast.error('Error, please fill full information!');
            } else {
                const res = await userService.updateUserService({
                    email: state.email,
                    firstName: state.firstName,
                    lastName: state.lastName,
                    gender: state.gender,
                    degree: state.degree,
                    role: state.role,
                    phoneNumber: state.phoneNumber,
                    address: state.address,
                    avatar: state.avatar,
                });

                if (res && res.errCode === 0) {
                    toast.success('Update successfully!');
                    setState({
                        ...state,
                        email: '',
                        password: '',
                        firstName: '',
                        lastName: '',
                        gender: 'M',
                        degree: 'none',
                        role: 'R2',
                        phoneNumber: '',
                        address: '',
                        avatar: '',
                        previewUrl: '',
                        editUser: false,
                    });
                } else if (res && res.errCode === 1) {
                    toast.error(res.errMessage);
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handleCreateUser = async () => {
        try {
            if (
                !state.email ||
                !state.password ||
                !state.firstName ||
                !state.lastName ||
                !state.address ||
                !state.phoneNumber ||
                !state.gender ||
                !state.avatar ||
                !state.role
            ) {
                toast.error('Error, please fill full information!');
            } else {
                const res = await userService.createUserService({
                    email: state.email,
                    password: state.password,
                    firstName: state.firstName,
                    lastName: state.lastName,
                    gender: state.gender,
                    degree: state.degree,
                    role: state.role,
                    phoneNumber: state.phoneNumber,
                    address: state.address,
                    avatar: state.avatar,
                });

                if (res.errCode === 0) {
                    toast.success('Add successfully!');
                    const newUser = {
                        email: state.email,
                        firstName: state.firstName,
                        lastName: state.lastName,
                        address: state.address,
                    };

                    let copyState = { ...state };
                    copyState.usersTable = [newUser, ...copyState.usersTable];
                    setState({
                        ...copyState,
                        email: '',
                        password: '',
                        firstName: '',
                        lastName: '',
                        gender: 'M',
                        degree: 'none',
                        role: 'R2',
                        phoneNumber: '',
                        address: '',
                        avatar: '',
                        previewUrl: '',
                    });
                }
            }
        } catch (e) {}
    };

    const handleSubmit = () => {
        if (state.editUser) {
            handleUpdateUser();
        } else {
            handleCreateUser();
        }
    };

    const { usersTable } = state;

    return (
        <div className={cx('user-manager')}>
            <div className={cl('container', cx('custom'))}>
                <h1>Create Account</h1>
                <div className={cx('user-form')}>
                    <div className={cl('col-7', cx('user-info'))}>
                        <div className={cl('col-55')}>
                            <label>Email</label>
                            <input
                                value={state.email}
                                onChange={(e) => handleOnchange(e, 'email')}
                                disabled={state.editUser ? true : false}
                            />
                        </div>
                        <div className={cl('col-55')}>
                            <label>Password</label>
                            <input
                                type="password"
                                value={state.password}
                                onChange={(e) => handleOnchange(e, 'password')}
                                disabled={state.editUser ? true : false}
                            />
                        </div>
                        <div className={cl('col-55')}>
                            <label>First name</label>
                            <input value={state.firstName} onChange={(e) => handleOnchange(e, 'firstName')} />
                        </div>
                        <div className={cl('col-55')}>
                            <label>Last name</label>
                            <input value={state.lastName} onChange={(e) => handleOnchange(e, 'lastName')} />
                        </div>
                        <div className={cl('col-55')}>
                            <label>Gender</label>
                            <select value={state.gender} onChange={(e) => handleOnchange(e, 'gender')}>
                                <option value="M">Nam</option>
                                <option value="F">Nữ</option>
                            </select>
                        </div>
                        <div className={cl('col-55')}>
                            <label>Education degree (not required)</label>
                            <select value={state.degree} onChange={(e) => handleOnchange(e, 'degree')}>
                                <option value="none"></option>
                                <option value="P1">Masters</option>
                                <option value="P2">Doctor</option>
                                <option value="P3">Associate professor</option>
                                <option value="P4">Professor</option>
                            </select>
                        </div>
                        <div className={cl('col-55')}>
                            <label>Role</label>
                            <select value={state.role} onChange={(e) => handleOnchange(e, 'role')}>
                                <option value="R1">Admin</option>
                                <option value="R2">Doctor</option>
                                <option value="R3">Patient</option>
                            </select>
                        </div>
                        <div className={cl('col-55')}>
                            <label>Phone number</label>
                            <input value={state.phoneNumber} onChange={(e) => handleOnchange(e, 'phoneNumber')} />
                        </div>
                        <div className={cx('col-12')}>
                            <label>Address</label>
                            <input value={state.address} onChange={(e) => handleOnchange(e, 'address')} />
                        </div>
                    </div>
                    <div className={cl('col-5', cx('user-img'))}>
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
                                backgroundImage: state.previewUrl ? `url(${state.previewUrl})` : null,
                            }}
                        ></div>
                    </div>
                </div>

                <button onClick={() => handleSubmit()} className={cl('btn', 'btn-primary', cx('btn-custom'))}>
                    {state.editUser ? 'Update' : 'Create'}
                </button>

                <table className={cx('table')}>
                    <thead>
                        <tr>
                            <th className={cx('email')}>Email</th>
                            <th className={cx('firstname')}>Firstname</th>
                            <th className={cx('lastname')}>Lastname</th>
                            <th className={cx('address')}>Address</th>
                            <th className={cx('action')}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersTable &&
                            usersTable.length > 0 &&
                            usersTable.map((user, index) => {
                                return (
                                    <tr key={index}>
                                        <td className={cx('email')}>{user.email}</td>
                                        <td className={cx('firstname')}>{user.firstName}</td>
                                        <td className={cx('lastname')}>{user.lastName}</td>
                                        <td className={cx('address')}>{user.address}</td>
                                        <td className={cx('action')}>
                                            <span onClick={() => handleEditUser(user)}>
                                                <FontAwesomeIcon icon={faPencil} />
                                            </span>
                                            <span onClick={() => handleDeleteUser(user, index)}>
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

export default UserManage;
