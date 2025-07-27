import { UserPayload } from "src/auth/interfaces/user-payload.interface";


// Use declaration merging to add the 'user' property to the Express Request interface
declare global{
    namespace Express{
        export interface Request{
            // The user property is optional ('?') because not all requests will be authenticated
      user?: UserPayload;
        }
    }
}