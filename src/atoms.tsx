import { atom } from "recoil";

export interface IToDo {
  id: number;
  text: string;
  checking: boolean;
}

export interface IToDoState {
  [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "To Do": [],
    Doing: [],
    Done: [],
    trash: [],
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
