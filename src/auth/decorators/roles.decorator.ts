import { SetMetadata } from "@nestjs/common";

//Metadata key for roles
export const ROLES_KEY = 'role';


// Create the Roles decorator
export const Roles = (...role: string[])=> SetMetadata(ROLES_KEY,role)