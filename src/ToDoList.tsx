import { useForm } from "react-hook-form";

interface IForm {
  email: string;
  username: string;
  password1: string;
  password2: string;
  extarError: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  const onValid = (data: IForm) => {
    if (data.password1 !== data.password2) {
      setError(
        "password2",
        { message: "Password are not match." },
        { shouldFocus: true }
      );
    }
    if (errors) {
      setError("extarError", { message: "Server is not connected" });
    }
    console.log(data);
  };
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("email", {
            required: "Write here",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only naver.com emails allowed",
            },
          })}
          placeholder="Email"
        />
        <span>{errors.email?.message}</span>
        <input
          {...register("username", {
            required: "Write here",
            maxLength: {
              value: 20,
              message: "Your Username length is shorter than 20",
            },
            validate: {
              noFxxk: (value) =>
                value.includes("fxxk") ? "fxxk is not allowed." : true,
              noHello: (value) =>
                value.includes("hello") ? "hello is not allowed." : true,
            },
          })}
          placeholder="Username"
        />
        <span>{errors.username?.message}</span>
        <input
          {...register("password1", {
            required: "Write here",
            minLength: {
              value: 10,
              message: "Your password length is longer than 10",
            },
          })}
          placeholder="Password1"
        />
        <span>{errors.password1?.message}</span>
        <input
          {...register("password2", {
            required: "Write here",
          })}
          placeholder="Password2"
        />
        <span>{errors.password2?.message}</span>
        <button>Add</button>
        <span>{errors.extarError?.message}</span>
      </form>
    </div>
  );
}

export default ToDoList;
