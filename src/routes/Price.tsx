import { styled } from "styled-components";
import { ITicker } from "./Coin";
import { Loader } from "./Coins";

const TickersView = styled.div`
  display: block;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px 20px;
  border-radius: 10px;
`;
const TickersViewItem = styled.div`
  display: flex;
  justify-content: space-between;
  span {
    width: 80%;
    font-size: 12px;
    font-weight: 400;
    text-transform: uppercase;
    padding: 14px 10px;
  }
`;

interface PriceProps {
  coinId: string;
  tickersData?: ITicker;
  tickersLoading?: boolean;
}

function Price({ coinId, tickersData, tickersLoading }: PriceProps) {
  const priceData = tickersData?.quotes.USD;
  return (
    <div>
      {tickersLoading ? (
        <Loader>Loading chart...</Loader>
      ) : (
        <TickersView>
          <TickersViewItem>
            <span>price</span>
            <span>{priceData?.price}</span>
          </TickersViewItem>
          <TickersViewItem>
            <span>volume 24h</span>
            <span>{priceData?.volume_24h}</span>
          </TickersViewItem>
          <TickersViewItem>
            <span>volume 24h change 24h</span>
            <span>{priceData?.volume_24h_change_24h}</span>
          </TickersViewItem>
          <TickersViewItem>
            <span>market cap</span>
            <span>{priceData?.market_cap}</span>
          </TickersViewItem>
          <TickersViewItem>
            <span>market cap change 24h</span>
            <span>{priceData?.market_cap_change_24h}</span>
          </TickersViewItem>
          <TickersViewItem>
            <span>ath price</span>
            <span>{priceData?.ath_price}</span>
          </TickersViewItem>
          <TickersViewItem>
            <span>ath date</span>
            <span>{priceData?.ath_date}</span>
          </TickersViewItem>
          <TickersViewItem>
            <span>percent from price ath</span>
            <span>{priceData?.percent_from_price_ath}</span>
          </TickersViewItem>
          <TickersViewItem>
            <span>percent change 15m</span>
            <span>{priceData?.percent_change_15m}</span>
          </TickersViewItem>
          <TickersViewItem>
            <span>percent change 30m</span>
            <span>{priceData?.percent_change_30m}</span>
          </TickersViewItem>
          <TickersViewItem>
            <span>percent change 1h</span>
            <span>{priceData?.percent_change_1h}</span>
          </TickersViewItem>
          <TickersViewItem>
            <span>percent change 6h</span>
            <span>{priceData?.percent_change_6h}</span>
          </TickersViewItem>
          <TickersViewItem>
            <span>percent change 12h</span>
            <span>{priceData?.percent_change_12h}</span>
          </TickersViewItem>
          <TickersViewItem>
            <span>percent change 24h</span>
            <span>{priceData?.percent_change_24h}</span>
          </TickersViewItem>
          <TickersViewItem>
            <span>percent change 7d</span>
            <span>{priceData?.percent_change_7d}</span>
          </TickersViewItem>
          <TickersViewItem>
            <span>percent change 30d</span>
            <span>{priceData?.percent_change_30d}</span>
          </TickersViewItem>
          <TickersViewItem>
            <span>percent change 1y</span>
            <span>{priceData?.percent_change_1y}</span>
          </TickersViewItem>
        </TickersView>
      )}
    </div>
  );
}

export default Price;
