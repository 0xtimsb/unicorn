import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { default as NextLink } from "next/link";

// Hooks
import useImperativeQuery from "../../hooks/useImperativeQuery";

// GraphQL
import { EMAIL_EXIST, SEND_CODE, USERNAME_EXIST } from "../../graphql/user";

// Utils
import { days, months, years } from "../../utils/date";

type FormData = {
  email: string;
  username: string;
  password: string;
  day: number;
  month: number;
  year: number;
};

const InfoPanel = ({ handleUserData }: any) => {
  const [sendCode] = useMutation(SEND_CODE);

  const emailExistQuery = useImperativeQuery(EMAIL_EXIST);
  const usernameExistQuery = useImperativeQuery(USERNAME_EXIST);

  const {
    handleSubmit,
    errors,
    register,
    clearErrors,
    getValues,
  } = useForm<FormData>({ reValidateMode: "onBlur" });

  // Submit
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Password show/hide
  const [show, setShow] = React.useState(false);
  const handleShowClick = () => setShow(!show);

  // Validation of email
  const validateEmail = async (email: string) => {
    const { data } = await emailExistQuery({ email });
    if (data.emailExist) return "Email already exists";
    return true;
  };

  // Validation of username
  const validateUsername = async (username: string) => {
    const { data } = await usernameExistQuery({ username });
    if (data.usernameExist) return "Username already exists";
    return true;
  };

  // Validation of date
  const validateDate = () => {
    const { year, month, day } = getValues(["year", "month", "day"]);
    const date = new Date(year, month, day);
    if (!date.getTime()) return false;
    let valid =
      date.getFullYear().toString() === year.toString() &&
      date.getMonth().toString() === month.toString() &&
      date.getDate().toString() === day.toString();
    return valid;
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    await sendCode({
      variables: {
        email: data.email,
      },
    });
    handleUserData({
      email: data.email,
      username: data.username,
      password: data.password,
      birthDate: new Date(data.year, data.month, data.day).toString(),
    });
  };

  return <div>Hehe</div>;
  // return (
  //   <Panel
  //     as="form"
  //     w="420px"
  //     title="Sign Up"
  //     onSubmit={handleSubmit(onSubmit)}
  //   >
  //     <FormControl isInvalid={!!errors.email}>
  //       <FormLabel>Email</FormLabel>
  //       <Input
  //         id="email"
  //         name="email"
  //         ref={register({
  //           required: {
  //             value: true,
  //             message: "EMAIL REQUIRED",
  //           },
  //           pattern: {
  //             value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  //             message: "EMAIL NOT VALID",
  //           },
  //           validate: (value) => validateEmail(value),
  //         })}
  //         onChange={() => errors.email && clearErrors("email")}
  //       />
  //       <FormErrorMessage>
  //         {errors.email && errors.email.message}
  //       </FormErrorMessage>
  //     </FormControl>
  //     <FormControl isInvalid={!!errors.username}>
  //       <FormLabel>Username</FormLabel>
  //       <Input
  //         id="username"
  //         name="username"
  //         ref={register({
  //           required: {
  //             value: true,
  //             message: "USERNAME REQUIRED",
  //           },
  //           pattern: {
  //             value: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/,
  //             message:
  //               "USERNAME CAN ONLY USE LETTERS, NUMBERS, UNDERSCORES AND PERIODS.",
  //           },
  //           minLength: {
  //             value: 4,
  //             message: "USERNAME MUST BE 4 OR MORE IN LENGTH",
  //           },
  //           maxLength: {
  //             value: 20,
  //             message: "USERNAME MUST BE 20 OR LESS IN LENGTH",
  //           },
  //           validate: (value) => validateUsername(value),
  //         })}
  //         onChange={() => errors.username && clearErrors("username")}
  //       />
  //       <FormErrorMessage>
  //         {errors.username && errors.username.message}
  //       </FormErrorMessage>
  //     </FormControl>
  //     <FormControl isInvalid={!!errors.password}>
  //       <FormLabel>Password</FormLabel>
  //       <InputGroup size="md">
  //         <Input
  //           pr="4.5rem"
  //           id="password"
  //           name="password"
  //           type={show ? "text" : "password"}
  //           ref={register({
  //             required: {
  //               value: true,
  //               message: "PASSWORD REQUIRED",
  //             },
  //             minLength: {
  //               value: 6,
  //               message: "PASSWORD MUST BE 6 OR MORE IN LENGTH",
  //             },
  //           })}
  //           onChange={() => errors.password && clearErrors("password")}
  //         />
  //         <InputRightElement width="4.5rem">
  //           <Button
  //             size="xs"
  //             bg="none"
  //             _hover={{ bg: "none" }}
  //             _focus={{ boxShadow: "none" }}
  //             _active={{ bg: "none" }}
  //             onClick={handleShowClick}
  //           >
  //             {show ? "Hide" : "Show"}
  //           </Button>
  //         </InputRightElement>
  //       </InputGroup>
  //       <FormErrorMessage>
  //         {errors.password && errors.password.message}
  //       </FormErrorMessage>
  //     </FormControl>
  //     <FormControl isInvalid={!!errors.day || !!errors.month || !!errors.year}>
  //       <FormLabel>Date of birth</FormLabel>
  //       <Flex>
  //         <Select
  //           id="day"
  //           name="day"
  //           flex={7}
  //           defaultValue="Day"
  //           ref={register({
  //             validate: () => validateDate(),
  //           })}
  //           onChange={() =>
  //             (errors.day || errors.month || errors.year) &&
  //             clearErrors(["day", "month", "year"])
  //           }
  //         >
  //           <option disabled>Day</option>
  //           {days.map((ele) => (
  //             <option value={ele} key={ele}>
  //               {ele}
  //             </option>
  //           ))}
  //         </Select>
  //         <Spacer />
  //         <Select
  //           id="month"
  //           name="month"
  //           defaultValue="Month"
  //           flex={9}
  //           ref={register({
  //             validate: () => validateDate(),
  //           })}
  //           onChange={() =>
  //             (errors.day || errors.month || errors.year) &&
  //             clearErrors(["day", "month", "year"])
  //           }
  //         >
  //           <option disabled>Month</option>
  //           {months.map((ele, idx) => (
  //             <option value={idx} key={idx}>
  //               {ele}
  //             </option>
  //           ))}
  //         </Select>
  //         <Spacer />
  //         <Select
  //           id="year"
  //           name="year"
  //           defaultValue="Year"
  //           flex={8}
  //           ref={register({
  //             validate: () => validateDate(),
  //           })}
  //           onChange={() =>
  //             (errors.day || errors.month || errors.year) &&
  //             clearErrors(["day", "month", "year"])
  //           }
  //         >
  //           <option disabled>Year</option>
  //           {years.map((ele) => (
  //             <option value={ele} key={ele}>
  //               {ele}
  //             </option>
  //           ))}
  //         </Select>
  //       </Flex>
  //       <FormErrorMessage>
  //         {(errors.day || errors.month || errors.year) &&
  //           "BIRTH OF DATE INVALID"}
  //       </FormErrorMessage>
  //     </FormControl>
  //     <Button mt={4} isLoading={isSubmitting} type="submit">
  //       Sign up
  //     </Button>
  //     <Text fontSize="xs" color="gray.400">
  //       By signing up, you agree to our <Link color="gray.500">Terms</Link> ,{" "}
  //       <Link color="gray.500">Data Policy</Link> and{" "}
  //       <Link color="gray.500">Cookie Policy</Link>.
  //     </Text>
  //     <NextLink href="/accounts/login">
  //       <Link fontSize="xs" textTransform="uppercase" color="gray.500">
  //         Already have an account?
  //       </Link>
  //     </NextLink>
  //   </Panel>
  // );
};

export default InfoPanel;
