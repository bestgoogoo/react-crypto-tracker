import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = (data: IForm) => {
    setToDos((existToDo) => [
      { id: Date.now(), text: data.toDo, category: "TO_DO" },
      ...existToDo,
    ]);
    setValue("toDo", "");
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input {...register("toDo", {})} placeholder="Write To Do" />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
