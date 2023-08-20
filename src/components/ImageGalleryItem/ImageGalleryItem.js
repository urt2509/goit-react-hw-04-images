import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Item, Image } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { imgUrl, description, largeImgUrl } = this.props;
    const { showModal } = this.state;
    return (
      <Item>
        <Image src={imgUrl} alt={description} onClick={this.toggleModal} />
        {showModal && (
          <Modal
            src={largeImgUrl}
            alt={description}
            onClose={this.toggleModal}
          />
        )}
      </Item>
    );
  }
}

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
