export default interface ActionPayloadData<T> {
  data: T;
  status: boolean;
  isFetching?: boolean;
};
