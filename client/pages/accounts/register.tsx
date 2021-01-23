import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Components
import InfoPanel from "../../components/accounts/InfoPanel";
import CodePanel from "../../components/accounts/CodePanel";

// GraphQL
import { Me_me } from "../../graphql/__generated__/Me";

// Routes
import { HOME } from "../../constants/routes";

type UserData = {
  email: string;
  username: string;
  password: string;
  birthDate: string;
};

const Register = ({
  auth,
  isLoaded,
  handleAuth,
}: {
  auth: Me_me | null;
  isLoaded: boolean;
  handleAuth: any;
}) => {
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && auth) {
      router.push(HOME);
    }
  }, [auth]);

  if (!isLoaded || auth) return null;

  const [userData, setUserData] = useState<UserData>({
    email: "",
    username: "",
    password: "",
    birthDate: "",
  });

  const handleUserData = (data: UserData) => {
    setUserData(data);
  };

  const handleBack = () => {
    setUserData({ ...userData, password: "" });
  };

  return (
    <div>
      {!userData.password ? (
        <InfoPanel handleUserData={handleUserData} />
      ) : (
        <CodePanel
          userData={userData}
          handleBack={handleBack}
          handleAuth={handleAuth}
        />
      )}
    </div>
  );
};

export default Register;
