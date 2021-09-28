import styled from 'styled-components';
import { breakpoints } from '../config';

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 1440px;
  box-sizing: border-box;
  padding: 0 ${props => props.theme.pageMargin};
  /* @media(max-width: ${breakpoints.maxTablet}px) {
    padding: 0 ${props => props.theme.pageMargin};
  } */
`;


function Layout ({ children }) {
  return (
    <Container>
      {children}
    </Container>
  )
}

export default Layout;
