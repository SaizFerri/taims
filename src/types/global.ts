export type Nullable<T> = T | null;

export type ResponseObject<T> = {
  data: Nullable<T[]>;
  error: Nullable<{ message: string }>;
  statusCode: number;
};
