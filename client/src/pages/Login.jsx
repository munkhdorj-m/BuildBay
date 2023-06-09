import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.5)
  );

  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:hover {
    background: #22202e;
  }
  &:active {
    transform: translateY(4px);
  }
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = async (e) => {
    console.log("sadsadsad");
    e.preventDefault();
    try {
      await login(dispatch, { username, password });
    } catch (error) {
      toast.error("Хэрэглэгчийн нэр эсвэл нууц үг буруу байна", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.error(error);
    }
  };
  return (
    <Container>
      <Wrapper>
        <Title>Нэвтрэх</Title>
        <Form>
          <Input
            placeholder="Хэрэглэгчийн нэр "
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Нууц үг"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleClick}>Нэвтрэх</Button>
          {error && console.log(error)}
          {/* {<Error>Something went wrong...</Error>} */}
          <Link>Нууц үгээ мартсан</Link>
          <Link>Шинэ хэрэглэгч үүсгэх</Link>
          <ToastContainer />
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
