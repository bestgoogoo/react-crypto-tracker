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
const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 200px;
  background-color: teal;
  animation: ${rotationAnimation} 1s linear infinite;
  span {
    font-size: 50px;
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
        <span>🏀</span>
      </Box>
    </Father>
  );
}

export default App;
