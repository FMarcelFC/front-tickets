// To parse this data:
//
//   import { Convert } from "./file";
//
//   const profile = Convert.toProfile(json);

export interface Profile {
    id:      number;
    profile: string;
    status:  number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toProfile(json: string): Profile[] {
        return JSON.parse(json);
    }

    public static profileToJson(value: Profile[]): string {
        return JSON.stringify(value);
    }
}
