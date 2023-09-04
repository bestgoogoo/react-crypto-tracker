import { useForm } from "react-hook-form";
import {
  atom,
  useRecoilState,
  // useRecoilValue,
  // useSetRecoilState,
} from "recoil";

interface IForm {
  toDo: string;
}
interface IToDo {
  id: number;
  text: string;
  category: "TO_DO" | "DOING" | "DONE";
}

const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

function ToDoList() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  // Upper code is same under 2 lines
  // const toDos = useRecoilValue(toDoState);
  // const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = (data: IForm) => {
    setToDos((existToDo) => [
      { id: Date.now(), text: data.toDo, category: "TO_DO" },
      ...existToDo,
    ]);
    console.log(toDos);
    setValue("toDo", "");
  };
  return (
    <div>
      <h1>To Do List</h1>
      <form onSubmit={handleSubmit(onValid)}>
        <input {...register("toDo", {})} placeholder="Write To Do" />
        <button>Add</button>
      </form>
      <ul>
        {toDos.map((toDo) => (
          <li key={toDo.id}>{toDo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
