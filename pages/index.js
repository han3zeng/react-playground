import styled from 'styled-components';

const Container = styled.div`
  p {
    font-size: 20px;
  }
`;

function Home() {
  return (
    <Container>
      <h3>Overview</h3>
      <p>This is the Han's playground to practice web development related subjects.</p>
      <p>Currently, I have been working on personal blog, authorization and authentication system.</p>
      <p>I am still working on the project. So there are only few features available for this Blog service.</p>
      <h3>How to use the site?</h3>
      <p>Sign up or Sign in first, then you can have your own blog.</p>
      <h3>Currnetly available features</h3>
      <ul>
        <li>Create account</li>
        <li>Publish story</li>
        <li>See all your story titles in story list</li>
        <li>Browse your published story</li>
      </ul>
    </Container>
  );
}

// export async function getServerSideProps(context) {
//   const {
//     req,
//   } = context;
//   const { cookies } = req;
//   const userProfile = cookies['user-profile'];
//   if (userProfile) {
//     return {
//       redirect: {
//         destination: '/profile',
//         permanent: false,
//       },
//     };
//   }
//   return { props: {} };
// }

export default Home;
