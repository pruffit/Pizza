export interface IPagination {
  currentPage: number,
  onChangePage: (page: number) => void,
};