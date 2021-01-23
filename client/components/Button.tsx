import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

const Button: React.FC<ButtonProps> = ({ active, ...props }) => {
  return (
    <button
      className={`h-12 px-5 whitespace-nowrap rounded-full font-bold focus:outline-none ${
        active ? "bg-gray-900 text-white" : "text-gray-900 hover:bg-gray-100"
      }`}
      {...props}
    />
  );
};

export default Button;
