import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";

function ToDo({ id, text, category }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((selectToDos) => {
      const targetIndex = selectToDos.findIndex((toDo) => toDo.id === id);
      const selectToDo = selectToDos[targetIndex];
      const setToDo = { id, text, category: name as any };
      console.log(selectToDo, setToDo);
      return [
        ...selectToDos.slice(0, targetIndex),
        setToDo,
        ...selectToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <li>
      <span>{text}</span>
      {!category.includes("TO_DO") && (
        <button name="TO_DO" onClick={onClick}>
          To Do
        </button>
      )}
      {!category.includes("DOING") && (
        <button name="DOING" onClick={onClick}>
          Doing
        </button>
      )}
      {!category.includes("DONE") && (
        <button name="DONE" onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
}

export default ToDo;
