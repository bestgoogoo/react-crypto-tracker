import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";

const Card = styled.div<{ isDragging: boolean; check: boolean }>`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.cardColor};
  margin-bottom: 5px;
  padding: 10px 10px;
  border-radius: 5px;
  padding: 10px;
  background-color: ${(props) =>
    props.isDragging ? "#e4f2ff" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "5px 5px 5px rgba(0, 0, 0, 0.1)" : "none"};
  text-decoration-line: ${(props) => (props.check ? "line-through" : "none")};
`;
const CheckBox = styled.button`
  border: none;
  background-color: inherit;
  font-size: 16px;
`;

interface ICardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

function DraggableCard({ toDoId, toDoText, index }: ICardProps) {
  const [check, setCheck] = useState(false);
  const onClick = () => {
    setCheck((current) => !current);
  };
  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(provided, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          check={check}
        >
          <CheckBox onClick={onClick}>
            {check ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
          </CheckBox>
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
