import classNames from 'classnames/bind';
import styles from './Popover.module.scss';

const cx = classNames.bind(styles);

function PopoverWrapper({ children, className }) {
  return <div className={cx('wrapper', className)}>{children}</div>;
}

export default PopoverWrapper;
