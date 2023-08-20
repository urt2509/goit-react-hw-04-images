import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Item, Image } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal';

const ImageGalleryItem = ({ imgUrl, description, largeImgUrl }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <Item>
      <Image src={imgUrl} alt={description} onClick={toggleModal} />
      {showModal && (
        <Modal src={largeImgUrl} alt={description} onClose={toggleModal} />
      )}
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  imgUrl: PropTypes.string,
  description: PropTypes.string,
  largeImgUrl: PropTypes.string,
  showModal: PropTypes.bool,
  onClick: PropTypes.func,
  src: PropTypes.string,
  alt: PropTypes.string,
  onClose: PropTypes.func,
};

export { ImageGalleryItem };
