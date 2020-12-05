import { UserInput } from '../inputs/user-input';

export const validateSignup = ({ email, username, password, birthDate }: UserInput) => {

  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(String(email).toLowerCase())) {
    return [
      {
        field: "email",
        message: "Invalid email.",
      },
    ];
  }

  const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
  if (!usernameRegex.test(username)) {
    return [
      {
        field: "username",
        message: "Username can only use letters, numbers, underscores and periods.",
      },
    ];
  } else if (username.length < 4 || username.length > 20) {
    return [
      {
        field: "username",
        message: "Username must be of 4 to 32 characters.",
      },
    ];
  }

  if (password.length < 6) {
    return [
      {
        field: "password",
        message: "Password must be 6 or more in length.",
      },
    ];
  }

  const currentDate = new Date();
  const diffrenceInSeconds = (currentDate.getTime() - Date.parse(birthDate)) / 1000;
  const diffrenceInDays = diffrenceInSeconds / (60 * 60 * 24);
  const diffrenceInYears = Math.abs(Math.round(diffrenceInDays / 365.25));

  if (diffrenceInYears < 13) {
    return [
      {
        field: "birthDate",
        message: "You must be at least 13 years old to signin.",
      },
    ];
  }

  return null;
};