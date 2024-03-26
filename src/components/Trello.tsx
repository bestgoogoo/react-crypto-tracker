import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import { toDoState } from "../atoms";
import Board from "./Board";

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
`;

function Trello() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    if (source.droppableId === destination.droppableId) {
      setToDos((allBoards) => {
        const moveInBoard = [...allBoards[source.droppableId]];
        const taskObj = moveInBoard[source.index];
        moveInBoard.splice(source.index, 1);
        moveInBoard.splice(destination?.index, 0, taskObj);
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
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board
              toDos={toDos[boardId] as []}
              boardId={boardId}
              key={boardId}
            />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default Trello;
