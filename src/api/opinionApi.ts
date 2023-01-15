import { default as axios } from "lib/axios";
import { OpinionPOST, OpinionResponse } from "models/Opinion";

const opinionApiBaseUrl = "https://opinionapiservice.azure-api.net/";
/* opinion */
export const getOpinion = async (PageSize: string|number, Page: string|number, SpecId: string|number): Promise<OpinionResponse> => {
  return await axios
    .get<OpinionResponse>(
      `${opinionApiBaseUrl}/opinions`
        + `?PageSize=${typeof(PageSize) === "string" ? PageSize : Math.floor(PageSize)}`
        + `&Page=${typeof(Page) === "string" ? Page : Math.floor(Page)}`
        + `&SpecId=${typeof(SpecId) === "string" ? SpecId : Math.floor(SpecId)}`
    )
    .then((response) => response.data)
    .catch((error) => error);
};




export const createOpinion = async (opinion: OpinionPOST) => {
    return await axios
      .post(
        `${opinionApiBaseUrl}/opinions`,
        opinion,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access-token")}`,
            }
        },
    );
};