export interface Opinion {
  id: number;
  // studentId: number;
  content: string;
  rating: number;
  canEdit: boolean;
}

export interface OpinionPOST {
  specialityId: number,
  content: string,
  rating: number
}

export interface OpinionResponse {
  totalRows: number;
  opinions: Opinion[];
}
