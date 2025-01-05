export interface FormInputs {
    name: string,
    status: string,
    createdTime: Date
}

export enum StatusList {
    DONE = 'Done',
    WILL_READ = 'Will Be Read',
    CANCELLED = 'Cancelled',
  }
  export type Item = {
    created_date: Date;
    name: string;
    status: string; // Replace `string` with the correct type for `status`, e.g., an enum
  };