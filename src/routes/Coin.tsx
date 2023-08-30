import { useParams } from "react-router-dom";
import styled from "styled-components";

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
`;

function Coin() {
  const params = useParams();
  console.log(params);
  return <Title>Coin</Title>;
}

export default Coin;
