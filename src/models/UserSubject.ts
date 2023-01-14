export interface UserSubject {
    id: number;
    name: string;
    ects: number;
}

export interface UserPlan {
    subjects: UserSubject[];
}