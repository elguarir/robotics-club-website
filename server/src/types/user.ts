export type LoggedInUser = {
    _id: string;
    username: string;
    email: string;
    roles: string[];
    iat: number;
    exp: number;
  };
  