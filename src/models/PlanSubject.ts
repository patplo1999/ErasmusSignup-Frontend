import { UserSubject } from "./UserSubject";

export interface PlanSubjectSend {
    mappedSubject: number;
    name: string;
    ects: number;
}

export interface PlanSubject {
    id: number;
    mappedSubject: UserSubject;
    name: string;
    ects: number;
}