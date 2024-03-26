import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";

import DraggableCard from "./DraggableCard";
import { theme } from "../theme";
import { IToDo } from "../atoms";
import CardForm from "./CardForm";

const Wrapper = styled.div`
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
  toDos: IToDo[];
  boardId: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  return (
    <Wrapper>
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
            {toDos.map((toDo, index) => (
              <DraggableCard
                key={toDo.id}
                toDoId={toDo.id}
                toDoText={toDo.text}
                index={index}
              />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
