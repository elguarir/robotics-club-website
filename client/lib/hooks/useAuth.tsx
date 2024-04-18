import axios from "axios";
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";
import { AuthResponse, LoginCredentials, User } from "./types";
import { useRouter } from "next/navigation";
import { client } from "../helpers/client";

/**
 * /auth/me result
 * success:
 * {
    "success": true,
    "data": {
        "_id": "661b30a3770a847b18c825c6",
        "name": "Mohamed Elguarir",
        "username": "moha",
        "email": "moha@elguarir.com",
        "profilePic": "https://ui-avatars.com/api/?name=Mohamed%20Elguarir",
        "roles": [
            "user"
        ],
        "iat": 1713115318,
        "exp": 1713201718
    }
}
error:
{
    "success": false,
    "message": "Unauthorized, please login to access this resource"
}
 * 

    /auth/login
    success:
    {
    "success": true,
    "data": {
        "_id": "661b30a3770a847b18c825c6",
        "name": "Mohamed Elguarir",
        "profilePic": "https://ui-avatars.com/api/?name=Mohamed%20Elguarir",
        "username": "moha",
        "email": "moha@elguarir.com",
        "roles": [
            "user"
        ]
    }
}
error: 
{
    "success": false,
    "message": "a user with this email does not exist"
}
or when validation fails:
{
    "success": false,
    "errors": [
        {
            "path": "password",
            "message": "password must be at least 6 characters long"
        }
    ]
}

    /auth/logout
    success:
    {
    "success": true,
    "message": "logged out successfully"
}   

    /auth/signup
    success:
    {
    "success": true,
    "data": {
        "_id": "661c115f26e0d64e7d96770b",
        "name": "Mohamed Elguarir",
        "profilePic": "https://ui-avatars.com/api/?name=Mohamed%20Elguarir",
        "username": "mohaa",
        "email": "moha@elguarir.com",
        "roles": [
            "user"
        ]
    }
}
error:
    {
    "success": false,
    "errors": [
        {
            "path": "email",
            "message": "a user with this email already exists"
        },
        {
            "path": "username",
            "message": "a user with this username already exists"
        }
    ]
}
 */

export type AuthContext = {
  user: User | null;
  isLoading: boolean;
  login: UseMutationResult<AuthResponse<User>, Error, LoginCredentials, unknown>;
  logout: UseMutationResult<void, Error, void, unknown>;
};



export function useAuth(): AuthContext {
  const queryClient = useQueryClient();

  const router = useRouter();
  // get user
  const getUser = async () => {
    const { data } = await client.get<AuthResponse<User>>("/auth/me");
    return data;
  };
  const loggedInUser = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    refetchOnWindowFocus: true,
  });

  const user = loggedInUser.isError
    ? null
    : loggedInUser.data?.success
    ? loggedInUser.data.data
    : null;
  // login
  const login = async (credentials: LoginCredentials) => {
    return (await client.post<AuthResponse<User>>("/auth/login", credentials)).data;
  };
  const loginMutation = useMutation({
    mutationFn: login,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  // logout
  const logout = async () => {
    await client.get<AuthResponse<User>>("/auth/logout");
    queryClient.invalidateQueries({ queryKey: ["user"] });
  };

  const logOutMutation = useMutation({
    mutationFn: logout,
  });

  return {
    user: user,
    isLoading: loggedInUser.isLoading,
    login: loginMutation,
    logout: logOutMutation,
  };
}
