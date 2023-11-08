// To parse this data:
//
//   import { Convert } from "./file";
//
//   const system = Convert.toSystem(json);

export interface System {
    id:          number;
    name:        string;
    id_platform: number;
    platform:    string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toSystem(json: string): System[] {
        return JSON.parse(json);
    }

    public static systemToJson(value: System[]): string {
        return JSON.stringify(value);
    }
}
