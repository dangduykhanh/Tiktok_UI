import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import styles from './Menu.module.scss';
import PopoverWrapper from '../WrapperPopover';
import MenuItem from './MenuItem';
import Header from './Header';
import { useState } from 'react';

const cx = classNames.bind(styles);
const defaultFn = () => {};

function Menu({ children, items = [], onChange = defaultFn }) {
  const [history, setHistory] = useState([{ data: items }]);
  const current = history[history.length - 1];

  const renderItems = () => {
    return current.data.map((item, index) => {
      const isParent = !!item.children;

      return (
        <MenuItem
          key={index}
          data={item}
          onClick={() => {
            if (isParent) {
              setHistory((pre) => [...pre, item.children]);
            } else {
              onChange(item);
            }
          }}
        />
      );
    });
  };

  return (
    <Tippy
      appendTo={document.body}
      delay={[0, 700]}
      interactive
      placement="bottom-end"
      offset={[14, 10]}
      render={(attrs) => {
        return (
          <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopoverWrapper className={cx('menu-popover')}>
              {history.length > 1 && (
                <Header
                  title="Language"
                  onBack={() => setHistory((pre) => pre.slice(0, history.length - 1))}
                />
              )}
              {renderItems()}
            </PopoverWrapper>
          </div>
        );
      }}
      onHide={() => {
        setHistory((pre) => pre.slice(0, 1));
      }}
    >
      {children}
    </Tippy>
  );
}

export default Menu;
