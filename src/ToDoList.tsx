import { useForm } from "react-hook-form";

function ToDoList() {
  const { register, handleSubmit, formState } = useForm();
  const onValid = (data: any) => {
    console.log(data);
  };
  console.log(formState.errors);
  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input {...register("email", { required: true })} placeholder="Email" />
        <input
          {...register("username", {
            required: true,
            maxLength: {
              value: 20,
              message: "Your Username length is shorter than 20",
            },
          })}
          placeholder="Username"
        />
        <input
          {...register("password1", {
            required: "Password is required",
            minLength: {
              value: 10,
              message: "Your password length is longer than 10",
            },
          })}
          placeholder="Password1"
        />
        <input
          {...register("password2", { required: true, minLength: 10 })}
          placeholder="Password2"
        />
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
