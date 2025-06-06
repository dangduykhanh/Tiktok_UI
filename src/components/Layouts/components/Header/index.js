import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignIn, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-regular-svg-icons';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import Button from '~/components/Button';
import styles from './Header.module.scss';
import images from '~/assets/images';
import { MenuPopover } from '~/components/Popover';
import {
  CoinIcon,
  LanguageIcon,
  PlaneIcon,
  QuestionIcon,
  SettingIcon,
  SignoutIcon,
  ThemeIcon,
  UploadIcon,
  UserIcon,
} from '~/components/Icons';
import Image from '~/components/Image';
import Search from '../Search';

const cx = classNames.bind(styles);
const MENU_ITEMS = [
  {
    icon: <LanguageIcon />,
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
    icon: <QuestionIcon />,
    title: 'Feedback and help',
    to: '/feedback',
  },
  {
    icon: <ThemeIcon />,
    title: 'Dark Mode',
  },
];

function Header() {
  const currentUser = true;

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
      icon: <UserIcon />,
      title: 'View profile',
      to: '/@duybest',
    },
    {
      icon: <CoinIcon />,
      title: 'Get coins',
      to: '/coin',
    },
    {
      icon: <SettingIcon />,
      title: 'Settings',
      to: '/settings',
    },
    ...MENU_ITEMS,
    {
      icon: <SignoutIcon />,
      title: 'Log out',
      to: 'logout',
      separate: true,
    },
  ];

  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <img src={images.logo} alt="Logo Tiktok" />

        <Search />

        <div className={cx('actions')}>
          {currentUser ? (
            <>
              <Tippy delay={[0, 50]} content="Upload video" placement="bottom">
                <button className={cx('action-btn')}>
                  <UploadIcon />
                </button>
              </Tippy>
              <Tippy delay={[0, 50]} content="Message" placement="bottom">
                <button className={cx('action-btn')}>
                  <PlaneIcon />
                </button>
              </Tippy>

              <Tippy delay={[0, 50]} content="Inbox" placement="bottom">
                <button className={cx('action-btn')}>
                  <FontAwesomeIcon icon={faMessage} />
                  <span className={cx('badge')}>12</span>
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
              <Image
                className={cx('user-avatar')}
                src="https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/97562b5f5593ace0422a56343a6a5ca7~tplv-tiktokx-cropcenter:1080:1080.jpeg?dr=14579&refresh_token=01597bbb&x-expires=1&x-signature=nXpLUg46bsCqlNwK3rlkT5W5WRA%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=my"
                alt="Nguyễn Văn A"
                // fallBack="https://fullstack.edu.vn/assets/f8-icon-lV2rGpF0.png"
              />
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
