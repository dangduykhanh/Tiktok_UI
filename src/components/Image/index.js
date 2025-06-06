import classNames from 'classnames';
import { useState } from 'react';
import images from '~/assets/images';
import styles from './Image.module.scss';

function Image({ className, src, alt, fallBack = images.noImage, ...props }) {
  const [source, setSource] = useState(src);

  const handleError = () => {
    setSource(fallBack);
  };

  return (
    <img
      className={classNames(styles.wrapper, className)}
      src={source || fallBack}
      alt={alt}
      onError={handleError}
      {...props}
    />
  );
}

export default Image;
