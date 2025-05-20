import classNames from 'classnames/bind';
import styles from './Popover.module.scss';

const cx = classNames.bind(styles);

function PopoverWrapper({ children }) {
  return <div className={cx('wrapper')}>{children}</div>;
}

export default PopoverWrapper;
