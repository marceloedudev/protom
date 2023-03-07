export default class HttpUserInput {
    private userID: number;

    private username: string;

    private email: string;

    private fullname: string;

    private userUUID: string;

    constructor({
        user_id = 0,
        username = "",
        email = "",
        fullname = "",
        user_uuid = "",
    }) {
        this.userID = user_id;
        this.username = username;
        this.email = email;
        this.fullname = fullname;
        this.userUUID = user_uuid;
    }

    public getUserID(): number {
        return this.userID;
    }

    public setUserID(userID: number): void {
        this.userID = userID;
    }

    public getUsername(): string {
        return this.username;
    }

    public setUsername(username: string): void {
        this.username = username;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getFullname(): string {
        return this.fullname;
    }

    public setFullname(fullname: string): void {
        this.fullname = fullname;
    }

    public getUserUUID(): string {
        return this.userUUID;
    }

    public setUserUUID(userUUID: string): void {
        this.userUUID = userUUID;
    }
}
