export type ResponseContractType = 'Success' | 'Failed';
export enum ResponseContractEnum {
  SUCCESS = 'Success',
  FAILED = 'Failed',
}

export enum ResponseStatus {
  IDLE = 'idle',
  PENDING = 'pending',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
}
export type ResponseStatusType = `${ResponseStatus}`;
