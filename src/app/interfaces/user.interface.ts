export interface IUser {
    firstName: string,
    lastName: string,
    email: string,
    age: number,
    password: string,
    role: 'USER' | 'ADMIN' | 'SUPERADMIN'
}