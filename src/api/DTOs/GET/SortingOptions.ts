export interface SortingOptions {
  InterestedStudentsAsc: string;
  InterestedStudentsDesc: string;
  AverageAsc: string;
  AverageDesc: string;
}

const sortingOptions: SortingOptions = {
  InterestedStudentsAsc: "Interested students ascending",
  InterestedStudentsDesc: "Interested students descending",
  AverageAsc: "Min. average grade ascending",
  AverageDesc: "Min. average grade descending",
};

export default sortingOptions;
