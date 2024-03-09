import cl from 'classnames';
import classNames from 'classnames/bind';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({ children, type, onClick: propOnlick = () => {} }) {
    return (
        <button onClick={propOnlick} className={cx('bkc-btn', { primary: type === 'primary' })}>
            {children}
        </button>
    );
}

export default Button;
