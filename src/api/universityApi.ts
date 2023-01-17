import { default as axios } from "lib/axios";
import StudyDomain from "models/StudyDomain";
import GetDestinationDetails from "./DTOs/GET/GetDestinationDetails";
import DestinationList from "../models/DestinationList";
import DestSpecialty from "models/DestSpecialty";
import StudyArea from "models/StudyArea";
import DestFiltering from "models/DestFiltering";
import RecommendationList from "models/RecommendationList";

const universityApiBaseUrl = "https://universityapi23.azurewebsites.net/";  

export const getDestinations = async (
  page: number,
  pageSize: number,
  filters?: DestFiltering,
  universityName?: string
): Promise<DestinationList> => {
  let url = `${universityApiBaseUrl}/universities?pageSize=${pageSize}&page=${page}`;

  for (const filter in filters) {
    const value = filters[filter as keyof DestFiltering];
    if (value !== undefined) {
      url = url.concat(`&${filter}=${value}`);
    }
  }

  if (universityName) {
    url += `&universityName=${universityName}`;
  }

  return await axios
    .get<DestinationList>(url)
    .then(response => response.data)
    .catch(error => error);
};

export const getDestinationsRecommended = async (): Promise<RecommendationList> => {
  return await axios
    .get<DestSpecialty>(`${universityApiBaseUrl}/universities-recommended`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
    .then(response => response.data)
    .catch(error => error);
};

export const getDestinationsRecommendedByStudents = async (): Promise<RecommendationList> => {
  return await axios
    .get<DestSpecialty>(`${universityApiBaseUrl}/universities-recommended-by-students`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
    .then(response => response.data)
    .catch(error => error);
};

export const getDestinationDetails = async (destinationId: number): Promise<GetDestinationDetails> => {
  return await axios
    .get<GetDestinationDetails>(`${universityApiBaseUrl}/universities/${destinationId}`)
    .then(response => response.data)
    .catch(error => error);
};

export const getStudyDomains = async (): Promise<StudyDomain[]> => {
  return await axios
    .get<StudyDomain>(`${universityApiBaseUrl}/study-domains`)
    .then(response => response.data)
    .catch(error => error);
};

export const getStudyAreas = async (): Promise<StudyArea[]> => {
  return await axios
    .get<StudyArea>(`${universityApiBaseUrl}/study-areas`)
    .then(response => response.data)
    .catch(error => error);
};

export const getCountries = async (): Promise<string[]> => {
  return await axios
    .get<string>(`${universityApiBaseUrl}/countries`)
    .then(response => response.data)
    .catch(error => error);
};
