import { Link } from "react-router-dom";
import styled from "styled-components";
import { categories } from "../data";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection: "column" })}
`;

const Wrapper = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "20vh" })}
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
`;

const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: white;
  color: gray;
  cursor: pointer;
  font-weight: 600;
`;

const Categories = () => {
  return (
    <Container>
      {categories.map((item, i) => (
        <Wrapper key={i}>
          <Image src={item.img} />
          <Info>
            <Title>{item.title}</Title>
            <Link to="/product">
              <Button>SHOP NOW</Button>
            </Link>
          </Info>
        </Wrapper>
      ))}
    </Container>
  );
};

export default Categories;
