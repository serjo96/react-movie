export default interface ActionPayloadData<T> {
  data: T;
  isSuccess: boolean;
  isFetching?: boolean;
};
