export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  role: string;
}

export interface ILoginResponse {
  user: User;
  token: string;
}
