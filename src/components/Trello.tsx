import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import { toDoState } from "../atoms";
import Board from "./Board";
import Trash from "./Trash";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: fit-content;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
`;
const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  position: relative;
`;

function Trello() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const allBoards = Object.keys(toDos).filter((key) => key !== "trash");
  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    if (source.droppableId === destination.droppableId) {
      setToDos((oldToDos) => {
        const moveInBoard = [...oldToDos[source.droppableId]];
        const taskObj = moveInBoard[source.index];
        moveInBoard.splice(source.index, 1);
        moveInBoard.splice(destination.index, 0, taskObj);
        return {
          ...oldToDos,
          [source.droppableId]: moveInBoard,
        };
      });
    }
    if (source.droppableId !== destination.droppableId) {
      setToDos((oldToDos) => {
        const moveFromBoard = [...oldToDos[source.droppableId]];
        const moveToBoard = [...oldToDos[destination.droppableId]];
        const taskObj = moveFromBoard[source.index];
        moveFromBoard.splice(source.index, 1);
        moveToBoard.splice(destination.index, 0, taskObj);
        return {
          ...oldToDos,
          [source.droppableId]: moveFromBoard,
          [destination.droppableId]: moveToBoard,
        };
      });
    }
    if (destination.droppableId === "trash") {
      setToDos((oldToDos) => {
        const removeBoard = [...oldToDos[source.droppableId]];
        removeBoard.splice(source.index, 1);
        return {
          ...oldToDos,
          [source.droppableId]: removeBoard,
        };
      });
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {allBoards.map((boardId) => (
            <Board boardId={boardId} key={boardId} />
          ))}
        </Boards>
        <Trash />
      </Wrapper>
    </DragDropContext>
  );
}

export default Trello;
