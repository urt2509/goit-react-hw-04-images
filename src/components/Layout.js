import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 0 16px;
  margin: 5px auto;
`;

export const Layout = ({ children }) => {
  return (
    <Wrapper>
      <main>{children}</main>
    </Wrapper>
  );
};
