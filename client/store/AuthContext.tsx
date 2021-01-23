import React, { createContext, useReducer, useContext, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

// GraphQL
import { ME } from "../graphql/user";

// GraphQL Types
import { Me, Me_me } from "../graphql/__generated__/Me";

// Initial state
const initialState = { auth: null };

type ACTIONTYPE = { type: "SET"; payload: Me_me } | { type: "RESET" };

// Reducer
const authReducer = (state: typeof initialState, action: ACTIONTYPE) => {
  switch (action.type) {
    case "SET":
      return { auth: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

interface ContextType {
  auth: Me_me | null;
  dispatch: React.Dispatch<ACTIONTYPE>;
}

const AuthContext = createContext({} as ContextType);

export const AuthProvider = ({ children }) => {
  const { loading, data } = useQuery<Me>(ME);

  const router = useRouter();

  const [{ auth }, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    if (!loading) {
      if (data && data.me) {
        dispatch({ type: "SET", payload: data.me });
      } else {
        router.push("/accounts/login");
      }
    }
  }, [data]);

  const authData = { auth, dispatch };

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
