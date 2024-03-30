import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";

import { theme } from "../theme";
import { toDoState } from "../atoms";
import DraggableCard from "./DraggableCard";
import CardForm from "./CardForm";
import React from "react";

export const BoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 10px 5px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
  position: relative;
`;
const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;
const CloseIcon = styled.button`
  border: none;
  position: absolute;
  left: 0%;
`;

interface IAreaProps {
  isDraggingOver: boolean;
  draggingFromThisWith: boolean;
}
export const Area = styled.div<IAreaProps>`
  transition: background-color 0.3s ease-in-out;
  flex-grow: 1;
  padding: 10px 10px;
  border: ${(props) =>
    props.isDraggingOver
      ? "3px dashed black"
      : props.draggingFromThisWith
      ? "3px dashed black"
      : "none"};
  background-color: ${(props) =>
    props.isDraggingOver
      ? theme.accentColor
      : props.draggingFromThisWith
      ? "pink"
      : theme.boardColor};
  position: relative;
`;
const MoveIcon = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

interface IBoardProps {
  boardId: string;
}

function Board({ boardId }: IBoardProps) {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onClickClose = ({
    currentTarget,
  }: React.MouseEvent<HTMLButtonElement>) => {
    setToDos((allBoards) => {
      const findBoard = Object.keys(allBoards).indexOf(boardId);
      const arrBoards = Object.entries(allBoards);
      arrBoards.splice(findBoard, 1);
      const newBoards = Object.fromEntries(arrBoards);
      return newBoards;
    });
  };
  return (
    <BoardWrapper>
      <Title>{boardId}</Title>
      <CloseIcon name={boardId} onClick={onClickClose}>
        🔴
      </CloseIcon>
      <CardForm boardId={boardId} />
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <MoveIcon>
              {snapshot.isDraggingOver ? (
                <FaPlusCircle />
              ) : snapshot.draggingFromThisWith ? (
                <FaMinusCircle />
              ) : null}
            </MoveIcon>
            {toDos[boardId].map((_, index) => (
              <DraggableCard
                key={toDos[boardId][index]?.id}
                boardId={boardId}
                index={index}
              />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </BoardWrapper>
  );
}

export default Board;
