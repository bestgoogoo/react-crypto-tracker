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
  const allToDos = Object.keys(toDos).filter((element) => element !== "trash");
  const onDragEnd = ({ destination, source }: DropResult) => {
    console.log(source, destination);
    if (!destination) return;
    if (source.droppableId === destination.droppableId) {
      setToDos((allBoards) => {
        const moveInBoard = [...allBoards[source.droppableId]];
        const taskObj = moveInBoard[source.index];
        moveInBoard.splice(source.index, 1);
        moveInBoard.splice(destination.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: moveInBoard,
        };
      });
    }
    if (source.droppableId !== destination.droppableId) {
      setToDos((allBoards) => {
        const moveFromBoard = [...allBoards[source.droppableId]];
        const moveToBoard = [...allBoards[destination.droppableId]];
        const taskObj = moveFromBoard[source.index];
        moveFromBoard.splice(source.index, 1);
        moveToBoard.splice(destination.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: moveFromBoard,
          [destination.droppableId]: moveToBoard,
        };
      });
    }
    if (destination.droppableId === "trash") {
      setToDos((allBoards) => {
        const removeBoard = [...allBoards[source.droppableId]];
        removeBoard.splice(source.index, 1);
        console.log("hello");
        return {
          ...allBoards,
          [source.droppableId]: removeBoard,
        };
      });
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {allToDos.map((boardId) => (
            <Board
              toDos={toDos[boardId] as []}
              boardId={boardId}
              key={boardId}
            />
          ))}
        </Boards>
        <Trash />
      </Wrapper>
    </DragDropContext>
  );
}

export default Trello;
