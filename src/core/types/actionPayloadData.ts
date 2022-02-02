export default interface ActionPayloadData<T> {
  data: T;
  isSuccessful: boolean;
  isFetching: boolean;
};
