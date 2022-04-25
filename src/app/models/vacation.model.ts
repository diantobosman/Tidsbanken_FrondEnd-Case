import { RequestComment } from './request-comment.model';
import { Employee } from "./employee.model";

export interface Vacation {
    requestId: number;
    title: string;
    periodStart: Date;
    periodEnd: Date;
    dateCreated: Date;
    dateUpdated: Date;
    status: string;
    requestOwner: Employee;
    comment: RequestComment[];
    moderator: Employee | undefined;
}