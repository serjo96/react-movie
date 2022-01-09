export default interface ActionPayloadData<T> {
  data: T;
  status: boolean | {
    pageOne: boolean;
    pageTwo: boolean;
  };
  isFetching?: boolean;
};
