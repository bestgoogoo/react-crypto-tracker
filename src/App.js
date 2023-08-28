import styled from "styled-components";

const Father = styled.div`
  display: flex;
`;

const BoxOne = styled.div`
  background-color: teal;
  width: 100;
  height: 100;
`;

const BoxTwo = styled.div`
  background-color: tomato;
  width: 100;
  height: 100;
`;

function App() {
  return (
    <Father>
      <BoxOne />
      <BoxTwo />
    </Father>
  );
}

export default App;
