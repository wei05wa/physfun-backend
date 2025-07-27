export interface UserPayload {
  sub: string; // The user's ID (_id from MongoDB)
  username: string;
  email : string;
  role: string; 
}