// To parse this data:
//
//   import { Convert } from "./file";
//
//   const category = Convert.toCategory(json);

export interface Category {
    id:       number;
    category: string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toCategory(json: string): Category[] {
        return JSON.parse(json);
    }

    public static categoryToJson(value: Category[]): string {
        return JSON.stringify(value);
    }
}
