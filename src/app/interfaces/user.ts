// To parse this data:
//
//   import { Convert } from "./file";
//
//   const user = Convert.toUser(json);

export interface User {
    id:            string;
    name:          string;
    first_name:    string;
    last_name:     string;
    status:        number;
    email:         string;
    password:      string;
    phone:         string;
    picture:       string;
    id_gender:     number;
    register_date: Date;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toUser(json: string): User[] {
        return JSON.parse(json);
    }

    public static userToJson(value: User[]): string {
        return JSON.stringify(value);
    }
}
