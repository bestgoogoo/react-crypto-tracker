import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";

function ToDo({ id, text, category }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const changeCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((selectToDos) => {
      const targetIndex = selectToDos.findIndex((toDo) => toDo.id === id);
      const setToDo = { id, text, category: name as any };
      return [
        ...selectToDos.slice(0, targetIndex),
        setToDo,
        ...selectToDos.slice(targetIndex + 1),
      ];
    });
  };
  const deleteToDo = (event: React.MouseEvent<HTMLButtonElement>) => {
    setToDos((toDos) => {
      const setToDo = { id };
      return [...toDos.filter((toDo) => toDo.id !== Number(setToDo.id))];
    });
  };
  return (
    <li>
      <span>{text}</span>
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={changeCategory}>
          To Do
        </button>
      )}
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={changeCategory}>
          Doing
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={changeCategory}>
          Done
        </button>
      )}
      <button onClick={deleteToDo}>❌</button>
    </li>
  );
}

export default ToDo;
