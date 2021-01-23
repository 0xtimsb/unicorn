import { useEffect } from "react";
import { useRouter } from "next/router";

// Components
import LoginPanel from "../../components/accounts/LoginPanel";
import Layout from "../../components/wrapper/Layout";

// GraphQL
import { Me_me } from "../../graphql/__generated__/Me";

// Routes
import { HOME } from "../../constants/routes";

const LogIn = ({
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

  return (
    <Layout>
      <LoginPanel handleAuth={handleAuth} />
    </Layout>
  );
};

export default LogIn;
