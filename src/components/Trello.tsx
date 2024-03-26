import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { BsFillTrash3Fill } from "react-icons/bs";

import { toDoState } from "../atoms";
import Board, { Area } from "./Board";

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
const TrashCan = styled(Area)`
  position: absolute;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 7%;
  background-color: ${(props) => props.theme.bgColor};
  font-size: ${(props) => (props.isDraggingOver ? "48px" : "32px")};
  color: ${(props) =>
    props.isDraggingOver ? props.theme.accentColor : props.theme.boardColor};
  border-left: 2px dashed ${(props) => props.theme.boardColor};
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
        <Droppable droppableId="trash">
          {(provided, snapshot) => (
            <TrashCan
              isDraggingOver={snapshot.isDraggingOver}
              draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <BsFillTrash3Fill style={{ position: "absolute" }} />
              {provided.placeholder}
            </TrashCan>
          )}
        </Droppable>
      </Wrapper>
    </DragDropContext>
  );
}

export default Trello;
