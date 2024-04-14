import { useEffect, useState } from "react";
import axios from "axios";
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";
import { AuthResponse, LoginCredentials, User } from "./types";
import { toast } from "sonner";

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
  login: UseMutationResult<AuthResponse, Error, LoginCredentials, unknown>;
  logout: () => Promise<void>;
};
const client = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
});

export function useAuth(): AuthContext {
  const queryClient = useQueryClient();

  const [user, setUser] = useState<User | null>(null);
  const login = async (credentials: LoginCredentials) => {
    const { data } = await client.post<AuthResponse>(
      "/auth/login",
      credentials
    );
    return data;
  };
  const logout = async () => {
    await client.post<AuthResponse>("/auth/logout");
    setUser(null);
  };

  const getUser = async () => {
    const { data } = await client.get<AuthResponse>("/auth/me");
    return data;
  };

  const currentUser = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    
    refetchOnReconnect: true,
    refetchInterval: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    user: currentUser.data?.success ? currentUser.data.data : null,
    isLoading: !user && loginMutation.isPending,
    login: loginMutation,
    logout,
  };
}
