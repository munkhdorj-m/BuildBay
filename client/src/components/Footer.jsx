import {
  AccessTime,
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Twitter,
} from "@mui/icons-material";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}
`;

const Item = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: top;
`;

const Payment = styled.img`
  width: 50%;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Title>Хаяг</Title>
        <Desc>
          Монгол Улс, Улаанбаатар хот 16030, Хан-Уул дүүрэг, 3р хороо,
        </Desc>
      </Left>
      <Left>
        <Title>Холбоосууд</Title>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Twitter />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Тусламж</Title>
        Үйлчилгээний нөхцөл
        <br />
        Бидний тухай
      </Center>

      <Right>
        <Title>Цагын хуваарь</Title>

        <Item>
          <AccessTime style={{ marginRight: "10px" }} />
          Даваа-Баасан : Өглөө 9:00 - Орой 19:00 Бямба : Өглөө 10:00 - Орой
          18:00 Ням : Амарна
        </Item>
      </Right>

      <Right>
        <Title>Холбоо барих</Title>
        <Item>
          <Phone style={{ marginRight: "10px" }} /> +976 9999-9999
        </Item>
        <Item>
          <MailOutline style={{ marginRight: "10px" }} /> contact@buildbay.mn
        </Item>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

export default Footer;
