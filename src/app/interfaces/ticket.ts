// To parse this data:
//
//   import { Convert } from "./file";
//
//   const ticket = Convert.toTicket(json);

export interface Ticket {
    id:          string;
    id_status:   number;
    id_category: number;
    id_severity: number;
    issue:      string;
    start_date:  Date;
    end_date:    Date;
    last_update: Date;
    id_dev:      string;
    id_user:     string;
    id_system:   number;
    created_at:  Date;
    status:      string;
    severity:    string;
    dev:         string;
    user:        string;
    module:      string;
    category:    string;
    summary:     string;

}

// Converts JSON strings to/from your types
export class Convert {
    public static toTicket(json: string): Ticket[] {
        return JSON.parse(json);
    }

    public static ticketToJson(value: Ticket[]): string {
        return JSON.stringify(value);
    }
}
