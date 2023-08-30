import styled from "styled-components";

interface ContainerProps {
  bgColor: string;
  borderColor: string;
}

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: ${(props) => props.bgColor};
  border: 2px solid ${(props) => [props.borderColor]};
`;

interface CircleProps {
  bgColor: string;
  borderColor?: string;
  text?: string;
}

export function Circle({
  bgColor,
  borderColor,
  text = "default text",
}: CircleProps) {
  return (
    <Container borderColor={borderColor ?? bgColor} bgColor={bgColor}>
      {text}
    </Container>
  );
}
