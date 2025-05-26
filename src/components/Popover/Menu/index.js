import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import styles from './Menu.module.scss';
import PopoverWrapper from '../WrapperPopover';
import MenuItem from './MenuItem';

const cx = classNames.bind(styles);

function Menu({ children, items = [] }) {
  const renderItems = () => {
    return items.map((item, index) => <MenuItem key={index} data={item} />);
  };

  return (
    <Tippy
      appendTo={document.body}
      delay={[0, 700]}
      interactive
      placement="bottom-end"
      render={(attrs) => {
        return (
          <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopoverWrapper className={cx('menu-popover')}>{renderItems()}</PopoverWrapper>
          </div>
        );
      }}
    >
      {children}
    </Tippy>
  );
}

export default Menu;
