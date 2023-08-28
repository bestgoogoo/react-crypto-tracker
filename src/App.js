import styled, { keyframes } from "styled-components";

const Father = styled.div`
  display: flex;
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
  height: 200px;
  width: 200px;
  background-color: tomato;
  animation: ${rotationAnimation} 1s linear infinite;
`;

function App() {
  return (
    <Father as="header">
      <Box />
    </Father>
  );
}

export default App;
