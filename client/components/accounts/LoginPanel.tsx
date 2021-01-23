import { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import Link from "next/link";

// GraphQL
import { LOGIN } from "../../graphql/user";

// GraphQL Types
import { Login, LoginVariables } from "../../graphql/__generated__/Login";

type FormData = {
  usernameOrEmail: string;
  password: string;
};

const LoginPanel = ({ handleAuth }: any) => {
  const [login] = useMutation<Login, LoginVariables>(LOGIN);
  const router = useRouter();

  const { handleSubmit, errors, register, clearErrors } = useForm<FormData>({
    reValidateMode: "onBlur",
  });

  // Submit
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Password show/hide
  const [show, setShow] = useState(false);
  const handleShowClick = () => setShow(!show);
  const onSubmit = ({ usernameOrEmail, password }: FormData) => {
    setIsSubmitting(true);
    login({
      variables: {
        usernameOrEmail,
        password,
      },
    })
      .then(({ data }) => {
        if (data) {
          handleAuth(data.login.user);
          router.push("/");
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div>Email or Username</div>
        <input
          name="usernameOrEmail"
          ref={register({
            required: {
              value: true,
              message: "EMAIL OR USERNAME REQUIRED",
            },
          })}
          onChange={() =>
            errors.usernameOrEmail && clearErrors("usernameOrEmail")
          }
        ></input>
        <div>{errors.usernameOrEmail && errors.usernameOrEmail.message}</div>
      </div>
      <div>
        <div>Password</div>
        <input
          name="password"
          type={show ? "text" : "password"}
          ref={register({
            required: {
              value: true,
              message: "PASSWORD REQUIRED",
            },
          })}
          onChange={() => errors.password && clearErrors("password")}
        ></input>
        <div> {errors.password && errors.password.message}</div>
      </div>
      <button type="submit">Log In</button>
      <Link href="/accounts/register">Don't have an account? Sign up</Link>
    </form>
  );
};

export default LoginPanel;
