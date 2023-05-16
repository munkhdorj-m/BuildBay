import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { userRequest } from "../requestMethods";
import { createOrder } from "../redux/apiCalls";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  margin-bottom: 200px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
`;
const Summary = styled.div`
  flex: 1;
  /* border: 0.5px solid lightgray; */
  border-radius: 10px;
  padding: 60px 100px 20px 20px;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  background: #5a45f2;
  box-shadow: 0 2px #666;
  &:hover {
    background: #22202e;
  }
  &:active {
    transform: translateY(4px);
  }
  color: white;
  font-weight: 600;
`;
const CheckoutForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2rem auto;
  max-width: 70%;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const CheckoutLabel = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const CheckoutInput = styled.input`
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
`;

const CheckoutButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #388e3c;
  }
`;

const Checkout = () => {
  const [number, setNumber] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");

  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const userId = user.currentUser.username;
  const products = [];
  const totalPrice = Math.abs(cart.total.toFixed(2));
  cart.products.map((product) => {
    products.push({
      productId: product.title,
      quantity: product.quantity,
    });
  });

  const amount = cart.total;
  const dispatch = useDispatch();
  console.log(products);

  const handleClick = async (e) => {
    console.log(address);
    e.preventDefault();
    try {
      createOrder(dispatch, {
        userId,
        number,
        description,
        products,
        amount,
        address,
        city,
        district,
      });
      toast.success("Захиалга амжилттай", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error("Алдаа гарлаа", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can submit the user's information to your backend or perform any other necessary actions
  };

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Bottom>
          <Info>
            <CheckoutForm onSubmit={handleSubmit}>
              Мэдээлэл оруулах
              <CheckoutLabel htmlFor="number">Утасны дугаар:</CheckoutLabel>
              <CheckoutInput
                placeholder="99999999"
                type="text"
                id="number"
                value={number}
                onChange={(event) => setNumber(event.target.value)}
                required
              />
              <CheckoutLabel htmlFor="description">Тэмдэглэл:</CheckoutLabel>
              <CheckoutInput
                placeholder="Оройн цагаар хүргүүлмээр байна гэх мэт"
                type="description"
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                required
              />
            </CheckoutForm>
            <CheckoutForm onSubmit={handleSubmit}>
              Хаяг
              <CheckoutLabel htmlFor="city">Хот/Аймаг</CheckoutLabel>
              <CheckoutInput
                type="text"
                id="city"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                required
              />
              <CheckoutLabel htmlFor="district">Сум/Дүүрэг:</CheckoutLabel>
              <CheckoutInput
                type="text"
                id="district"
                value={district}
                onChange={(event) => setDistrict(event.target.value)}
                required
              />
              <CheckoutLabel htmlFor="address">Дэлгэрэнгүй хаяг</CheckoutLabel>
              <CheckoutInput
                type="text"
                id="address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                required
              />
            </CheckoutForm>
          </Info>
          <Summary>
            <SummaryTitle>Нийт үнэ</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Үнэ</SummaryItemText>
              <SummaryItemPrice>{totalPrice}₮</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Хүргэлт</SummaryItemText>
              <SummaryItemPrice>5000₮</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Нийт</SummaryItemText>
              <SummaryItemPrice>{totalPrice + 5000}₮</SummaryItemPrice>
            </SummaryItem>

            <Button onClick={handleClick}>Захиалга өгөх</Button>
          </Summary>
        </Bottom>
        <ToastContainer />
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Checkout;
