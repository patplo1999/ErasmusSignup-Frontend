import { PlanSubject, PlanSubjectSend } from "./PlanSubject";

export interface PlanSend {
  name: string;
  subjects: PlanSubjectSend[];
}

export interface Plan {
  id: number;
  studentId: number;
  name: string;
  studentName: string;
  studentSurname: string;
  subjects?: PlanSubject[];

  // specialtyId: number;
}

export const convertPlanToSend = (plan: Plan): PlanSend => {
  const newPlan: PlanSend = { name: plan.name, subjects: [] };
  if (plan.subjects) {
    for (let i = 0; i < plan.subjects.length; i++) {
      newPlan.subjects?.push({
        mappedSubject: plan!.subjects![i].mappedSubject.id,
        name: plan.subjects![i].name,
        ects: plan.subjects![i].ects,
      })
    }
  }
  return newPlan;
}