import styled from "styled-components";

import { BsFillTrash3Fill } from "react-icons/bs";
import { Area } from "./Board";
import { Droppable } from "react-beautiful-dnd";

const TrashCan = styled(Area)`
  position: fixed;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 7%;
  background-color: ${(props) =>
    props.isDraggingOver ? props.theme.accentColor : props.theme.bgColor};
  font-size: ${(props) => (props.isDraggingOver ? "48px" : "32px")};
  color: ${(props) => props.theme.boardColor};
  border: none;
  border-left: 3px dashed ${(props) => props.theme.boardColor};
`;

function Trash() {
  return (
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
  );
}

export default Trash;
