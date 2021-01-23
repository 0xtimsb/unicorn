import React, { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";

// GraphQL
import { SIGNUP } from "../../graphql/user";
import { signup, signupVariables } from "../../graphql/__generated__/signup";

type FormData = {
  code: string;
};

const Code = ({ userData, handleAuth }: any) => {
  const [signup] = useMutation<signup, signupVariables>(SIGNUP);
  const router = useRouter();

  const { handleSubmit, errors, register } = useForm<FormData>();

  const { username, password, email, birthDate } = userData;

  // Submit
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = ({ code }: FormData) => {
    setIsSubmitting(true);
    signup({
      variables: {
        data: {
          email,
          username,
          password,
          birthDate,
        },
        code,
      },
    })
      .then(({ data }) => {
        if (data) {
          handleAuth(data.signup.user);
          router.push("/");
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {
        //   <input
        //     id="code"
        //     name="code"
        //     ref={register({
        //       required: {
        //         value: true,
        //         message: "VERIFICATION CODE REQUIRED",
        //       },
        //     })}
        //   />
        //   <FormErrorMessage>
        //     {errors.code && errors.code.message}
        //   </FormErrorMessage>
        // </FormControl>
        // <button isLoading={isSubmitting} type="submit">
        //   Next
        // </button>
      }
    </form>
  );
};

export default Code;
