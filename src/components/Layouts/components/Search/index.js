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
  const [loading, setLoading] = useState(false);

  const inputRef = useRef();

  useEffect(() => {
    if (!searchValue.trim()) {
      setSearchResult([]);
      return;
    }
    setLoading(true);

    const params = new URLSearchParams();
    params.append('q', encodeURIComponent(searchValue));
    params.append('type', 'less');

    fetch(`https://tiktok.fullstack.edu.vn/api/users/search?${params}`)
      .then((res) => res.json())
      .then((res) => {
        setSearchResult(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, [searchValue]);

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
              {searchResult.map((result) => (
                <AccountItem key={result.id} data={result} />
              ))}
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

        {!!searchValue && !loading && (
          <button className={cx('clear')} onClick={handleClear}>
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
        )}

        {loading && (
          <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
        )}

        <button className={cx('search-btn')}>
          <MagnifyingGlassIcon />
        </button>
      </div>
    </HeadlessTippy>
  );
}

export default Search;
