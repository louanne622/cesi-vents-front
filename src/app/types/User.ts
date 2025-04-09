export interface User {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    campus: string;
    role: "user" | "admin" | "clubLeader";
    avatar?: string;
    bde_member?: boolean;
    password: string;
    createdAt: string;
    updatedAt: string;
    clubId?: string;
}

export interface UserCreatePayload {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone?: string;
    campus: string;
    role: "user" | "admin" | "clubLeader";
    clubId?: string;
    bde_member?: boolean;
}

export interface UserUpdatePayload {
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    phone?: string;
    campus?: string;
    role?: "user" | "admin" | "clubLeader";
    bde_member?: boolean;
    clubId?: string;
}

