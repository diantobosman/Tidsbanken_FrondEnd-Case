import { Employee } from "./employee.model";

export interface RequestComment {
    commentId: number;
    message: string;
    dateCreated: Date;
    dateUpdated: Date;
    commentOwner: Employee;
}