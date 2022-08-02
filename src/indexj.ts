/**
The `Tables`  generic represent the names of the tables in the database.

The `resources` generic represent an union of the types of data contained in each tables in the database.
*/

import type { User, Receiver, Driver, Bus } from '../../../utils/types';

type TableName<T, Tables> = T extends Tables ? T : Tables;
type Payload<resource> = Omit<resource, 'id'>;
type putOrDeleteReturnType = { rows_affected: number };
type PutReturnType = putOrDeleteReturnType;
type DeleteReturnType = putOrDeleteReturnType;
export class PrestApiClient<
  Tables extends string,
  resources extends { [k in Tables]: resources[Tables] }
> {
  constructor(
    private prestApiConnectionUrl: string,
    private databaseName: string,
    private schema: string
  ) {
    this.prestApiConnectionUrl = prestApiConnectionUrl;
    this.databaseName = databaseName;
    this.schema = schema;
  }
  /**
   * @param  tableName Represents the name of the table in the database to get data from
   */
  public async getAll<T>(
    tableName: TableName<T, Tables>
  ): Promise<resources[typeof tableName][]> {
    const response = await fetch(
      `${this.prestApiConnectionUrl}/${this.databaseName}/${
        this.schema
      }/${String(tableName)}`
    );
    return await response.json();
  }

  /**
   * @param  tableName Represents the name of the table in the database to get data from
   * @param id  id to get a single record from the table
   */
  public async getOne<T>(
    tableName: TableName<T, Tables>,
    id: number
  ): Promise<resources[typeof tableName]> {
    const response = await fetch(
      `${this.prestApiConnectionUrl}/${this.databaseName}/${
        this.schema
      }/${String(tableName)}/?id=${id}`
    );
    return await response.json();
  }
  public async post<T>(
    tableName: TableName<T, Tables>,
    data: Payload<resources[typeof tableName]>
  ): Promise<resources[typeof tableName]> {
    const response = await fetch(
      `${this.prestApiConnectionUrl}/${this.databaseName}/${
        this.schema
      }/${String(tableName)}`,
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return await response.json();
  }
  public async put<T>(
    tableName: TableName<T, Tables>,
    data: Payload<resources[typeof tableName]>,
    id: number
  ): Promise<PutReturnType> {
    const response = await fetch(
      `${this.prestApiConnectionUrl}/${this.databaseName}/${this.schema}/${tableName}/?id=${id}`,
      {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return await response.json();
  }
  public async delete<T>(
    tableName: TableName<T, Tables>,
    id: number
  ): Promise<DeleteReturnType> {
    const response = await fetch(
      `${this.prestApiConnectionUrl}/${this.databaseName}/${this.schema}/${tableName}?id=${id}`,
      {
        method: 'DELETE',
      }
    );
    return await response.json();
  }
}

export default PrestApiClient;