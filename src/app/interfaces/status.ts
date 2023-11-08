// To parse this data:
//
//   import { Convert } from "./file";
//
//   const status = Convert.toStatus(json);

export interface Status {
    id:     number;
    status: string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toStatus(json: string): Status[] {
        return JSON.parse(json);
    }

    public static statusToJson(value: Status[]): string {
        return JSON.stringify(value);
    }
}
