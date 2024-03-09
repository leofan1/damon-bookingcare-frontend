import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import cl from 'classnames';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import styles from './Specialty.module.scss';
import './Specialty.scss';
import { specialtyService } from '../../../services';

//getAllCodeService

const cx = classNames.bind(styles);
const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
};

function Specialty() {
    const [specialty, setSpecialty] = useState();
    const navigate = useNavigate();

    const getSpecialties = async () => {
        try {
            let res = await specialtyService.getAllSpecialtiesService('ALL');
            if (res.errCode === 0 && res.data.length > 0) {
                setSpecialty(res.data);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getSpecialties();
    }, []);

    const handleViewDetailOnClick = (e) => {
        if (e.ctrlKey) {
            var win = window.open(`/specialties`, '_blank');
            win.focus();
        } else {
            navigate(`/specialties`);
        }
    };

    const hanleSlideClick = (e, id) => {
        if (e.ctrlKey) {
            var win = window.open(`/specialty-detail/${id}`, '_blank');
            win.focus();
        } else {
            navigate(`/specialty-detail/${id}`);
        }
    };

    return (
        <div className={cx('specialty')} id="specialty-section">
            <div className={cl('container', cx('custom'))}>
                <div className={cx('header')}>
                    <h2 className={cx('headerTitle')}>Common speciaties</h2>
                    <button onClick={(e) => handleViewDetailOnClick(e)}>VIEW MORE</button>
                </div>
                <Slider {...settings}>
                    {specialty &&
                        specialty.map((item, index) => {
                            return (
                                <div key={index} className={cl('specialty-slider')}>
                                    <div onClick={(e) => hanleSlideClick(e, item.id)} target="_blank">
                                        <img src={item.image} alt="" />
                                        <p>{item.name}</p>
                                    </div>
                                </div>
                            );
                        })}
                </Slider>
            </div>
        </div>
    );
}

export default Specialty;
