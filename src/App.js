import styled, { keyframes } from "styled-components";

const Father = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;
const rotationAnimation = keyframes`
0% {
  transform:rotate(0deg);
  border-radius: 50%;
  } 
50% {
  transform:rotate(360deg);
  border-radius: 0%;
  }
100% {
  transform:rotate(0deg);
  border-radius: 50%;
}
`;
const Emoji = styled.span`
  font-size: 50px;
`;
const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 200px;
  background-color: teal;
  animation: ${rotationAnimation} 1s linear infinite;
  ${Emoji} {
    &:hover {
      font-size: 100px;
    }
    &:active {
      font-size: 200px;
    }
  }
`;

function App() {
  return (
    <Father as="header">
      <Box>
        <Emoji>🏀</Emoji>
      </Box>
      <Emoji>👍</Emoji>
    </Father>
  );
}

export default App;
