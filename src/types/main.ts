import { ExtractTypeofArray, StrictPropertyCheck } from './utilities';

type OmitId<resource> = Omit<resource, 'id'>;
type putOrDeleteReturnType = { rows_affected: number };

export type Payload<T, resource> = StrictPropertyCheck<
  T,
  OmitId<ExtractTypeofArray<resource>>
>;
export type TableName<T, Tables> = T extends Tables ? T : Tables;
export type PutReturnType = putOrDeleteReturnType;
export type DeleteReturnType = putOrDeleteReturnType;
