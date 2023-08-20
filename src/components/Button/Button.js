import React from 'react';
import PropTypes from 'prop-types';

import { Thumb, ButtonStyled } from './Button.styled';

const Button = ({ onClick }) => {
  return (
    <Thumb>
      <ButtonStyled type="button" onClick={onClick}>
        Load more
      </ButtonStyled>
    </Thumb>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
};

export { Button };
