import { MagnifyingGlass } from 'react-loader-spinner';
import { Container } from './Loader.styled';

const Loader = () => {
  return (
    <Container>
      <MagnifyingGlass
        visible={true}
        height="150"
        width="150"
        ariaLabel="MagnifyingGlass-loading"
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="#3f51b5"
        color="#ff5bff"
      />
    </Container>
  );
};

export { Loader };
