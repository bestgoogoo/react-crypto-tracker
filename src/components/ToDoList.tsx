import { useForm } from "react-hook-form";

interface IForm {
  toDo: string;
}

function ToDoList() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = (data: IForm) => {
    console.log(data.toDo);
    setValue("toDo", "");
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input {...register("toDo", {})} placeholder="Write To Do" />
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
