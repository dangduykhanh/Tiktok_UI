import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';

import PopoverWrapper from '~/components/Popover/WrapperPopover';
import AccountItem from '~/components/AccountItem';
import { MagnifyingGlassIcon } from '~/components/Icons';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
  const [searchResult, setSearchResult] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [showResult, setShowResult] = useState(true);

  const inputRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      setSearchResult([1, 2, 3]);
    }, 0);
  }, []);

  const handleClear = () => {
    setSearchValue('');
    setSearchResult([]);
    inputRef.current.focus();
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  return (
    <HeadlessTippy
      appendTo={document.body}
      visible={showResult && searchResult.length > 0}
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
      onClickOutside={handleHideResult}
    >
      <div className={cx('search')}>
        <input
          value={searchValue}
          placeholder="Search accounts and videos"
          spellCheck={false}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          ref={inputRef}
          onFocus={() => {
            setShowResult(true);
          }}
        />

        {!!searchValue && (
          <button className={cx('clear')} onClick={handleClear}>
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
        )}

        {/* <FontAwesomeIcon className={cx('loading')} icon={faSpinner} /> */}

        <button className={cx('search-btn')}>
          <MagnifyingGlassIcon />
        </button>
      </div>
    </HeadlessTippy>
  );
}

export default Search;
