declare namespace Express {
    export interface Request {
        user: {
            user_id: number;
            username: string;
            email: string;
            fullname: string;
            user_uuid: string;
        };
    }
}
