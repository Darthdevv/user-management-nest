export interface SignUpResponse {
  message: string;
  data: {
    email: string;
    username: string;
    id: number;
  };
}
