import { atom } from "recoil";

export interface IToDo {
  id: number;
  text: string;
  checking: boolean;
}

interface IToDoState {
  [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    trash: [],
    "To Do": [],
    Doing: [],
    Done: [],
  },
  effects: [
    ({ setSelf, onSet }) => {
      const loadToDos = localStorage.getItem("toDos");
      if (loadToDos != null) {
        setSelf(JSON.parse(loadToDos));
      }
      onSet((newValue, _, isReset) => {
        isReset
          ? localStorage.removeItem("toDos")
          : localStorage.setItem("toDos", JSON.stringify(newValue));
      });
    },
  ],
});
