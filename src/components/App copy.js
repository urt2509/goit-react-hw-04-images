import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix';
// TODO: нотифликс заменить тостами

import { GlobalStyle } from './GlobalStyle';
import { SearchBar } from './Searchbar';
import { AppContainer } from './App.styled';
import { ImageCallery } from './ImageGallery';
import { Loader } from './Loader';
import { Button } from './Button';
import { Layout } from './Layout';
import { getImages } from 'services/APIs';

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalImages, setTotalImages] = useState(0);

  const lastPage = Math.ceil(totalImages / 12);

  useEffect(() => {
    async function fetchImages() {
      if (query === '') return;

      const options = { query, page };

      try {
        setIsLoading(prevState => !prevState);

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

          setImages([...nextImages]);
          console.log(nextImages);
          setTotalImages(totalHits);
        } else if (page === lastPage) {
          Notify.success(`You have got all images for request ${query}`);
        } else {
          setImages(prevState => [...prevState, ...nextImages]);
        }
      } catch (error) {
        setError(error);
        Notify.failure(error.message);
      } finally {
        setIsLoading(prevState => !prevState);
      }
    }

    fetchImages();
  }, [page, query, lastPage]);

  const handleSubmit = value => {
    setImages([]);
    setQuery(value);
    setPage(1);
    setTotalImages(0);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const loadMoreVisible =
    !isLoading && images.length !== 0 && images.length < totalImages;

  return (
    <Layout>
      <AppContainer>
        <GlobalStyle />

        <SearchBar onSubmit={handleSubmit} />

        <ImageCallery images={images} />

        {loadMoreVisible && <Button onClick={handleLoadMore} />}

        {isLoading && <Loader />}
      </AppContainer>
    </Layout>
  );
};

App.propTypes = {
  images: PropTypes.object,
  query: PropTypes.string,
  page: PropTypes.number,
  error: PropTypes.string,
  isLoading: PropTypes.bool,
  totalImages: PropTypes.number,
};

export { App };
