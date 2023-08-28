export enum SortEnum {
  LATEST = 'Latest',
  OLDEST = 'Oldest',
  PRICE_ASCENDING = 'Price ascending',
  PRICE_DESCENDING = 'Price descending',
}
export type SortType = `${SortEnum}`;
export const sortTypes = Object.values(SortEnum);
