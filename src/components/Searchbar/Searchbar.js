import React, { Component } from 'react';
import { Notify } from 'notiflix';
import PropTypes from 'prop-types';

import { Bar, Form, Button, Input } from './Searchbar.styled';

import { ImSearch } from 'react-icons/im';

class SearchBar extends Component {
  state = {
    searchImage: '',
  };

  handleSubmit = e => {
    const { searchImage } = this.state;

    e.preventDefault();

    if (searchImage.trim() === '') {
      return Notify.failure('Please enter text for search images', {
        timeout: 1000,
      });
    }

    this.props.onSubmit(searchImage);
    this.setState({ searchImage: '' });
  };

  handleChange = e => {
    this.setState({ searchImage: e.currentTarget.value.toLowerCase() });
  };

  render() {
    const { searchImage } = this.state;

    return (
      <Bar>
        <Form onSubmit={this.handleSubmit}>
          <Button type="submit">
            <ImSearch />
          </Button>

          <Input
            type="text"
            value={searchImage}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          ></Input>
        </Form>
      </Bar>
    );
  }
}

SearchBar.propTypes = {
  searchImage: PropTypes.string,
};

export { SearchBar };
