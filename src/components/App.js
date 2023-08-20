import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix';

import { GlobalStyle } from './GlobalStyle';
import { SearchBar } from './Searchbar';
import { AppContainer } from './App.styled';
import { ImageCallery } from './ImageGallery';
import { Loader } from './Loader';
import { Button } from './Button';
import { Layout } from './Layout';
import { getImages } from 'services/APIs';

class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    error: null,
    isLoading: false,
    totalImages: 0,
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.fetchImages();
    }
  }

  async fetchImages() {
    const { query, page } = this.state;
    const options = { query, page };

    try {
      this.setState({ isLoading: true });

      const { hits, totalHits } = await getImages(options);

      const nextImages = hits.map(
        ({ id, webformatURL, tags, largeImageURL }) => ({
          id,
          webformatURL,
          tags,
          largeImageURL,
        })
      );

      if (page === 1) {
        if (!nextImages.length) {
          Notify.failure(`There is no result for ${query}`);
          return;
        }

        this.setState({ images: nextImages, totalImages: totalHits });
      } else {
        this.setState(({ images }) => ({
          images: [...images, ...nextImages],
        }));
      }

      this.checkLastPage({
        page,
        totalImages: totalHits,
      });
    } catch (error) {
      this.setState({ error });
      Notify.failure(error.message);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  handleSubmit = value => {
    this.setState({
      images: [],
      query: value,
      page: 1,
      totalImages: 0,
    });
  };

  handleLoadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  checkLastPage({ page, totalImages }) {
    const { query } = this.state;
    const lastPage = Math.ceil(totalImages / 12);

    if (page === lastPage) {
      Notify.success(`You have got all images for request ${query}`);
    }
  }

  render() {
    const { images, totalImages, isLoading } = this.state;

    const loadMoreVisible =
      !isLoading && images.length !== 0 && images.length < totalImages;

    return (
      <Layout>
        <AppContainer>
          <GlobalStyle />

          <SearchBar onSubmit={this.handleSubmit} />

          <ImageCallery images={images} />

          {loadMoreVisible && <Button onClick={this.handleLoadMore} />}

          {isLoading && <Loader />}
        </AppContainer>
      </Layout>
    );
  }
}

App.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
  query: PropTypes.string,
  page: PropTypes.number,
  error: PropTypes.string,
  isLoading: PropTypes.bool,
  totalImages: PropTypes.number,
};

export { App };
