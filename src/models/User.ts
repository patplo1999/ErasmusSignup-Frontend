
export interface User {
  firstName: string;
  middleNames: string;
  lastName: string;
  sex? /* YES!*/: string; 
  titlesBefore: string;
  titlesAfter: string;
  isStaff: boolean;
  email: string;
  photoUtl_50x50: string;
  photoUtl_400x500: string;
  studentNumber?: string;
}
// export User;

export const EmptyUser: User = {
  firstName: "",
  middleNames: "",
  lastName: "",
  sex: undefined,
  titlesBefore: "",
  titlesAfter: "",
  isStaff: false,
  email: "",
  photoUtl_50x50: "",
  photoUtl_400x500: "",
  studentNumber: undefined,
}
