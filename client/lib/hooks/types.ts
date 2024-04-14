// user type
export type User = {
    _id: string;
    name: string;
    username: string;
    email: string;
    profilePic: string;
    roles: string[];
  };
  
  // login credentials type
  export type LoginCredentials = {
    email: string;
    password: string;
  };
  
  // signup credentials type
  export type SignupCredentials = {
    name: string;
    username: string;
    email: string;
    password: string;
  };
  
  export type SuccessResponse<T> = {
    success: true;
    data: T;
  };
  
  export type ErrorResponse = {
    success: false;
    message: string;
  };
  
  export type AuthResponse = SuccessResponse<User> | ErrorResponse;
  
  