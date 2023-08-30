import { Link, useLocation } from "react-router-dom";
import { Container, Header, ICoin, Title } from "./Coins";

function Coin() {
  const { state } = useLocation<ICoin>();
  return (
    <Container>
      <Header>
        <Title>{state?.name || "404: Not Found"}</Title>
      </Header>
      <Link to={"/"}>Go Home &rarr;</Link>
    </Container>
  );
}

export default Coin;
