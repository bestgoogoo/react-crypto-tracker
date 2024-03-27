import React from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { Draggable } from "react-beautiful-dnd";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";

import { toDoState } from "../atoms";

const Card = styled.div<{ isDragging: boolean; checkBox: boolean }>`
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
  text-decoration-line: ${(props) =>
    props.checkBox ? "line-through" : "none"};
`;
const CheckBox = styled.button`
  border: none;
  background-color: inherit;
  font-size: 16px;
`;

interface ICardProps {
  boardId: string;
  index: number;
}

function DraggableCard({ boardId, index }: ICardProps) {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onClick = () => {
    setToDos((oldToDos) => {
      const copyBoard = [...oldToDos[boardId]];
      if (copyBoard[index].checking === false) {
        copyBoard.splice(index, 1, { ...copyBoard[index], checking: true });
      } else {
        copyBoard.splice(index, 1, { ...copyBoard[index], checking: false });
      }
      return {
        ...oldToDos,
        [boardId]: copyBoard,
      };
    });
  };
  return (
    <Draggable draggableId={toDos[boardId][index].id + ""} index={index}>
      {(provided, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          checkBox={toDos[boardId][index].checking}
        >
          <CheckBox onClick={onClick}>
            {toDos[boardId][index].checking ? (
              <ImCheckboxChecked />
            ) : (
              <ImCheckboxUnchecked />
            )}
          </CheckBox>
          {toDos[boardId][index].text}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
