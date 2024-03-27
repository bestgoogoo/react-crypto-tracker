import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";

import DraggableCard from "./DraggableCard";
import { theme } from "../theme";
import { toDoState } from "../atoms";
import CardForm from "./CardForm";
import { useRecoilValue } from "recoil";

export const BoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 10px 5px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;
const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
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
  const toDos = useRecoilValue(toDoState);
  return (
    <BoardWrapper>
      <Title>{boardId}</Title>
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
