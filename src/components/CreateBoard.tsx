import styled from "styled-components";
import { FaPlusCircle } from "react-icons/fa";
import { useSetRecoilState } from "recoil";

import { BoardWrapper } from "./Board";
import { toDoState } from "../atoms";

const AddBoard = styled(BoardWrapper)`
  justify-content: center;
  align-items: center;
  padding: 15px 15px;
  button {
    border: none;
    border-radius: 5px;
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.cardColor};
    color: ${(props) => props.theme.textColor};
    font-size: 32px;
  }
`;

function CreateBoard() {
  const setBoard = useSetRecoilState(toDoState);
  const onClick = () => {
    const popUp = prompt("What is this board name?", "");
    if (popUp != null) {
      setBoard((allBoards) => {
        const boards = Object.keys(allBoards);
        if (boards.find((board) => board === popUp)) {
          alert(`${popUp} is already Exist.`);
        }
        console.log(boards);
        return { ...allBoards, [popUp]: [] };
      });
    }
  };
  return (
    <AddBoard>
      <button onClick={onClick}>
        <FaPlusCircle />
      </button>
    </AddBoard>
  );
}

export default CreateBoard;
