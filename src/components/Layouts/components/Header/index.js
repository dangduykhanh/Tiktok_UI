import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleXmark,
  faSpinner,
  faMagnifyingGlass,
  faSignIn,
  faEllipsisVertical,
  faEarthAsia,
  faCircleQuestion,
  faKeyboard,
  faGear,
  faSignOut,
  faUser,
  faCoins,
} from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane, faMessage, faCircleUp } from '@fortawesome/free-regular-svg-icons';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
import { useEffect, useState } from 'react';
import 'tippy.js/dist/tippy.css';

import PopoverWrapper from '~/components/Popover/WrapperPopover';
import AccountItem from '~/components/AccountItem';
import Button from '~/components/Button';
import styles from './Header.module.scss';
import images from '~/assets/images';
import { MenuPopover } from '~/components/Popover';

const cx = classNames.bind(styles);
const MENU_ITEMS = [
  {
    icon: <FontAwesomeIcon icon={faEarthAsia} />,
    title: 'English',
    children: {
      title: 'Language',
      data: [
        {
          type: 'language',
          code: 'en',
          title: 'English',
        },
        {
          type: 'language',
          code: 'vi',
          title: 'Tiếng Việt',
        },
        {
          type: 'language',
          code: 'se',
          title: 'Svenska', // Sweden
        },
        {
          type: 'language',
          code: 'fi',
          title: 'Suomi', // Finland
        },
        {
          type: 'language',
          code: 'dk',
          title: 'Dansk', // Denmark
        },
      ],
    },
  },
  {
    icon: <FontAwesomeIcon icon={faCircleQuestion} />,
    title: 'Feedback and help',
    to: '/feedback',
  },
  {
    icon: <FontAwesomeIcon icon={faKeyboard} />,
    title: 'Keyboard shortcuts',
  },
];

function Header() {
  const [searchResult, setSearchResult] = useState([]);

  const currentUser = true;

  useEffect(() => {
    setTimeout(() => {
      setSearchResult([]);
    }, 0);
  }, []);

  // handle logic
  const handleMenuChange = (item) => {
    switch (item.type) {
      case 'language':
        // handle change language
        break;

      default:
    }
  };

  const userMenus = [
    {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: 'View profile',
      to: '/@duybest',
    },
    {
      icon: <FontAwesomeIcon icon={faCoins} />,
      title: 'Get coins',
      to: '/coin',
    },
    {
      icon: <FontAwesomeIcon icon={faGear} />,
      title: 'Settings',
      to: '/settings',
    },
    ...MENU_ITEMS,
    {
      icon: <FontAwesomeIcon icon={faSignOut} />,
      title: 'Log out',
      to: 'logout',
      separate: true,
    },
  ];

  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <img src={images.logo} alt="Logo Tiktok" />

        <HeadlessTippy
          appendTo={document.body}
          visible={searchResult.length > 0}
          interactive
          render={(attrs) => {
            return (
              <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                <PopoverWrapper>
                  <h4 className={cx('search-title')}>Accounts</h4>
                  <AccountItem />
                  <AccountItem />
                  <AccountItem />
                  <AccountItem />
                </PopoverWrapper>
              </div>
            );
          }}
        >
          <div className={cx('search')}>
            <input placeholder="Search accounts and videos" spellCheck={false} />
            <button className={cx('clear')}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
            <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />

            <button className={cx('search-btn')}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </HeadlessTippy>

        <div className={cx('actions')}>
          {currentUser ? (
            <>
              <Tippy delay={[0, 200]} content="Upload video" placement="bottom">
                <button className={cx('action-btn')}>
                  <FontAwesomeIcon icon={faCircleUp} />
                </button>
              </Tippy>
              <Tippy delay={[0, 200]} content="Message" placement="bottom">
                <button className={cx('action-btn')}>
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </Tippy>

              <Tippy delay={[0, 200]} content="Inbox" placement="bottom">
                <button className={cx('action-btn')}>
                  <FontAwesomeIcon icon={faMessage} />
                </button>
              </Tippy>
            </>
          ) : (
            <>
              <Button text to="./upload">
                Upload
              </Button>

              <Button primary rightIcon={<FontAwesomeIcon icon={faSignIn} />}>
                Log In
              </Button>
              {/* <Button rounded className={cx('custom-login')}>  Get App  </Button> */}
            </>
          )}

          <MenuPopover items={currentUser ? userMenus : MENU_ITEMS} onChange={handleMenuChange}>
            {currentUser ? (
              <img className={cx('user-avatar')} src={images.avatar} alt="Nguyễn Văn A" />
            ) : (
              <button className={cx('more-btn')}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            )}
          </MenuPopover>
        </div>
      </div>
    </header>
  );
}

export default Header;
