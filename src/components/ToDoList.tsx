import { useRecoilValue } from "recoil";
import { toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import Category from "./Category";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  console.log(toDos);
  return (
    <div>
      <h1>To Do List</h1>
      <hr />
      <Category />
      <CreateToDo />
      {toDos.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;
