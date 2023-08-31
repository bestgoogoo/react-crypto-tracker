import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";

export const Loader = styled.span`
  display: block;
  text-align: center;
`;
export const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
export const Header = styled.header`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const CoinsList = styled.ul``;
const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 10px;
  border-radius: 15px;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
`;
const CoinSymbol = styled.img`
  margin-right: 10px;
  width: 35px;
  height: 35px;
`;

export interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  return (
    <Container>
      <Header>
        <Title>
          <Link to={"/"}>Coins</Link>
        </Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 20).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <CoinSymbol
                  src={`https://static.coinpaprika.com/coin/${coin.id}/logo.png`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
