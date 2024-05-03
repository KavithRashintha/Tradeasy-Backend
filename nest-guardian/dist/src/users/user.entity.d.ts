export declare class User {
    id: number;
    username: string;
    password: string;
    validatePassword(password: string): Promise<boolean>;
}
