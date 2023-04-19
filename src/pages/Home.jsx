import React from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
// import Navbar from "../components/navbar/Navbar";
import Slider from "../components/Slider";
import styled from "styled-components";
import "../index.css";
import Cards from "../components/Cards";

// const Title = styled.div`
//   width: 274px;
//   height: 39px;
//   padding-left: 40px;
//   padding-top: 80px;

//   font-family: "Clash Display";
//   font-style: normal;
//   font-weight: 400;
//   font-size: 32px;
//   line-height: 39px;

//   color: #2a254b;
// `;

const Title = styled.div`
  width: 274px;
  height: 39px;
  padding-left: 40px;
  padding-top: 80px;

  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: #22202e;
`;

const Home = () => {
  return (
    <div>
      <Navbar />
      <Cards />
      <Slider />
      <Title>You might also like</Title>
      <Categories />
      <Footer />
    </div>
  );
};

export default Home;
