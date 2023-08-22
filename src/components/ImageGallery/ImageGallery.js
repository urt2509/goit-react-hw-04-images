import React from 'react';
import PropTypes from 'prop-types';

import { ImageGalleryItem } from '../ImageGalleryItem';
import { ImageList } from './ImageGallery.styled';

const ImageCallery = ({ images }) => {
  return (
    <ImageList>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          imgUrl={webformatURL}
          description={tags}
          largeImgUrl={largeImageURL}
        />
      ))}
    </ImageList>
  );
};

ImageCallery.propTypes = {
  key: PropTypes.string,
  imgUrl: PropTypes.string,
  description: PropTypes.string,
  largeImgUrl: PropTypes.string,
};

export { ImageCallery };
