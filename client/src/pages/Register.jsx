import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import { register } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
  width: 40%;
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
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  margin-top: 20px;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  &:hover {
    background: #22202e;
  }
  &:active {
    transform: translateY(4px);
  }
`;

const Error = styled.span`
  color: red;
`;

const Register = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching } = useSelector((state) => state.user);
  let navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await register(dispatch, {
        firstname,
        lastname,
        username,
        email,
        password,
      });
      alert("Registration successful");
      navigate("/");
      // Registration successful
    } catch (error) {
      // Registration failed, handle error
      alert("Registration failed");
      console.error(error);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>ШИНЭ ХЭРЭГЛЭГЧ ҮҮСГЭХ</Title>
        <Form>
          <Input
            placeholder="Нэр"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            placeholder="Овог"
            onChange={(e) => setLastName(e.target.value)}
          />
          <Input
            placeholder="Хэрэглэгчийн нэр"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Имэйл"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Нууц үг"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Нууц үг давтах "
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/* <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement> */}

          <Button onClick={handleClick}>Бүртгүүлэх</Button>
        </Form>
        {password !== confirmPassword && <Error>Passwords do not match</Error>}
      </Wrapper>
    </Container>
  );
};

export default Register;
