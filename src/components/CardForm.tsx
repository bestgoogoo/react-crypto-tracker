import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

import { toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

const Form = styled.form`
  margin-bottom: 10px;
  input {
    width: 100%;
    padding: 5px 10px;
  }
`;
interface ICardFormProps {
  boardId: string;
}

function CardForm({ boardId }: ICardFormProps) {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const setToDos = useSetRecoilState(toDoState);
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    // setToDos((allBoards) => {
    //   const selectedBoard = [...allBoards[boardId]];
    //   selectedBoard.splice(0, 0, newToDo);
    //   return { ...allBoards, [boardId]: selectedBoard };
    // });
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [...allBoards[boardId], newToDo],
      };
    });
    setValue("toDo", "");
  };
  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("toDo", { required: true })}
        type="text"
        placeholder={`Add task on ${boardId}`}
      />
    </Form>
  );
}

export default CardForm;
