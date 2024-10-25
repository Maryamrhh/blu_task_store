import { UserRole } from "../../domain/models/user.model";

export interface JwtPayload {
    id: string;
    role: UserRole;
}