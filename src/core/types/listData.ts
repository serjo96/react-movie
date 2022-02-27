export declare class ListData<T> {
   page: number;
   totalResults: number;
   totalPages: number;
   results: Array<T>;
   dates?: {
     maximum: string;
     minimum: string;
   }
}
