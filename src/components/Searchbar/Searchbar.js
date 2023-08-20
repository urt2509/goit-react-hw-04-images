import React, { useState } from 'react';
import { Notify } from 'notiflix';
import PropTypes from 'prop-types';

import { Bar, Form, Button, Input } from './Searchbar.styled';

import { ImSearch } from 'react-icons/im';

const SearchBar = ({ onSubmit }) => {
  const [searchImage, setSearchImage] = useState('');

  const handleInput = e => {
    setSearchImage(e.target.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (searchImage.trim() === '') {
      return Notify.failure('Please enter text for search images', {
        timeout: 1000,
      });
    }

    onSubmit(searchImage);
    setSearchImage('');
  };

  return (
    <Bar>
      <Form onSubmit={handleSubmit}>
        <Button type="submit">
          <ImSearch />
        </Button>

        <Input
          type="text"
          value={searchImage}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInput}
        ></Input>
      </Form>
    </Bar>
  );
};

SearchBar.propTypes = {
  searchImage: PropTypes.string,
};

export { SearchBar };
