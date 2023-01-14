import { default as axios } from "lib/axios";
import { Plan, PlanSend } from "models/Plan";
import { UserPlan } from "models/UserSubject";


const planApiBaseUrl = "https://localhost:7084";

export const getUserPlan = async (): Promise<UserPlan> => {
  return await axios
    .get<UserPlan>(
      `${planApiBaseUrl}/plan/user_plan`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      }
    )
    .then(response => response.data)
    .catch(error => error);
};

export const postUserPlan = async (userPlan: UserPlan) => {
  return await axios
    .post(
      `${planApiBaseUrl}/plan/user_plan`,
      userPlan,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        }
      },
    );
};

export const getPlans = async (): Promise<Plan[]> => {
  return await axios
    .get<Plan[]>(
      `${planApiBaseUrl}/plan/plans`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      }
    )
    .then(response => response.data)
    .catch(error => error);
};

export const postPlan = async (plan: PlanSend) => {
  return await axios
    .post(
      `${planApiBaseUrl}/plan/plan`,
      plan,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        }
      },
    )
};

export const putPlan = async (plan: PlanSend, id: number) => {
  return await axios
    .put(
      `${planApiBaseUrl}/plan/plan/${id}`,
      plan,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        }
      },
    );
};

export const deletePlan = async (id: number) => {
  return await axios
    .delete(
      `${planApiBaseUrl}/plan/plan/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        }
      },
    );
};