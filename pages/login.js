import { Button } from "@material-ui/core";
import Head from "next/head";
import styled from "styled-components";
import { auth, provider } from "../firebase";

const Login = () => {
  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert);
  };

  return (
    <Container>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/images.png" />
      </Head>
      <LoginContainer>
        <Logo src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXSzML_98pBX92MNo-u4_m-YQ11RLzpRC04Q&usqp=CAU" />
        <Button onClick={signIn} variant="outlined">
          Sign in with Google
          <img
            src="https://banner2.cleanpng.com/20180416/ppe/kisspng-g-suite-pearl-river-middle-school-google-docs-soft-google-plus-5ad4f155b36555.6827254815239048537348.jpg"
            alt="google"
            height={20}
            width={20}
            style={{ marginLeft: "10px" }}
          />
        </Button>
      </LoginContainer>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: whitesmoke;
`;

const LoginContainer = styled.div`
  padding: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
`;

const Logo = styled.img`
  height: 200px;
  width: 200px;
  margin-bottom: 50px;
`;
