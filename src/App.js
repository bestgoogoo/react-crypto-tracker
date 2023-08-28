import styled from "styled-components";

const Father = styled.div`
  display: flex;
`;

const Btn = styled.button`
  background-color: tomato;
  color: white;
`;

const Input = styled.input.attrs({ required: true, minLength: 10 })`
  background-color: teal;
  margin-right: 10px;
`;

function App() {
  return (
    <Father as="header">
      <Input />
      <Input />
      <Input />
      <Input />
      <Btn as="a" href="/">
        Log in
      </Btn>
    </Father>
  );
}

export default App;
