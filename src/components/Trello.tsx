import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import { toDoState } from "../atoms";
import Board from "./Board";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 720px;
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
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;
    // setToDos((oldToDos) => {
    //   const toDos = [...oldToDos];
    //   toDos.splice(source.index, 1);
    //   toDos.splice(destination?.index, 0, draggableId);
    //   return toDos;
    // });
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
