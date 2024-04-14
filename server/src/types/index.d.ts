declare namespace Express {
  export interface Request {
    user: {
      _id: string;
      username: string;
      email: string;
      roles: string[];
      iat: number;
      exp: number;
    };
  }
  export interface Response {
    user:
      | {
          _id: string;
          username: string;
          email: string;
          roles: string[];
          iat: number;
          exp: number;
        }
  }
}
