import { AxiosError } from "axios";
import { default as axios } from "lib/axios";
import CommonNote from "models/notes/CommonNote";
import HighlightNote from "models/notes/HighlightNote";
import PlanNote from "models/notes/PlanNote";
import PriorityNote from "models/notes/PriorityNote";
import SpecialityNote from "models/notes/SpecialityNote";
import PostCommonNote from "./DTOs/POST/PostCommonNote";
import PostPlanNote from "./DTOs/POST/PostPlanNote";
import PostSpecialityHighlight from "./DTOs/POST/PostSpecialityHighlight";
import PostSpecialityNote from "./DTOs/POST/PostSpecialityNote";

const noteApiBaseUrl = "https://noteapi23.azurewebsites.net/";

/* ============================== COMMON ============================== */
export const getCommonNotes = async (): Promise<CommonNote[]> => {
  return await axios
    .get<CommonNote[]>(`${noteApiBaseUrl}/note/common`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
    .then(response => response.data)
    .catch(error => error);
};

export const postCommonNote = async (body: PostCommonNote) => {
  return await axios
    .post(`${noteApiBaseUrl}/note/common`, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
    .then(response => response.data)
    .catch(error => error as AxiosError);
};

export const putCommonNote = async (id: number, body: PostCommonNote) => {
  return await axios
    .put(`${noteApiBaseUrl}/note/common/${id}`, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
    .then(response => response.data)
    .catch(error => error);
};

export const deleteCommonNote = async (id: number) => {
  return await axios
    .delete(`${noteApiBaseUrl}/note/common/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
    .then(response => response.data)
    .catch(error => error);
};

/* ============================== PLAN ============================== */
export const getPlanNotes = async (): Promise<PlanNote[]> => {
  return await axios
    .get<PlanNote[]>(`${noteApiBaseUrl}/note/plan`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
    .then(response => response.data)
    .catch(error => error);
};

export const postPlanNote = async (body: PostPlanNote) => {
  return await axios
    .post(`${noteApiBaseUrl}/note/plan`, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
    .then(response => response.data)
    .catch(error => error);
};

export const putPlanNote = async (id: number, body: PostPlanNote) => {
  return await axios
    .put(`${noteApiBaseUrl}/note/plan/${id}`, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
    .then(response => response.data)
    .catch(error => error);
};

export const deletePlanNote = async (id: number) => {
  return await axios
    .delete(`${noteApiBaseUrl}/note/plan/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
    .then(response => response.data)
    .catch(error => error);
};

/* ============================== SPECIALITY ============================== */
export const getSpecialityNotes = async (): Promise<SpecialityNote[]> => {
  return await axios
    .get<SpecialityNote[]>(`${noteApiBaseUrl}/note/speciality`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
    .then(response => response.data)
    .catch(error => error);
};

export const postSpecialityNote = async (body: PostSpecialityNote) => {
  return await axios
    .post(`${noteApiBaseUrl}/note/speciality`, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
    .then(response => response.data)
    .catch(error => error);
};

export const putSpecialityNote = async (id: number, body: PostSpecialityNote) => {
  return await axios
    .put(`${noteApiBaseUrl}/note/speciality/${id}`, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
    .then(response => response.data)
    .catch(error => error);
};

export const deleteSpecialityNote = async (id: number) => {
  return await axios
    .delete(`${noteApiBaseUrl}/note/speciality/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
    .then(response => response.data)
    .catch(error => error);
};

/* ============================== HIGHLIGHT ============================== */
export const getHighlightNotes = async (): Promise<HighlightNote[]> => {
  return await axios
    .get<HighlightNote[]>(`${noteApiBaseUrl}/note/highlight`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
    .then(response => response.data)
    .catch(error => error);
};

export const postHighlightNotes = async (body: PostSpecialityHighlight) => {
  return await axios
    .post(`${noteApiBaseUrl}/note/highlight`, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
    .then(response => response.data)
    .catch(error => error);
};

export const deleteHighlightNotes = async (id: number) => {
  return await axios
    .delete(`${noteApiBaseUrl}/note/speciality/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
    .then(response => response.data)
    .catch(error => error);
};

/* ============================== PRIORITY ============================== */
export const getPriorityNotes = async (): Promise<PriorityNote[]> => {
  return await axios
    .get<PriorityNote[]>(`${noteApiBaseUrl}/note/highlight`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
    .then(response => response.data)
    .catch(error => error);
};

export const postPriorityNotes = async (body: PostSpecialityHighlight) => {
  return await axios
    .post(`${noteApiBaseUrl}/note/highlight`, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
    .then(response => response.data)
    .catch(error => error);
};

export const deletePriorityNotes = async (id: number) => {
  return await axios
    .delete(`${noteApiBaseUrl}/note/speciality/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
    .then(response => response.data)
    .catch(error => error);
};
