/* eslint-disable @typescript-eslint/no-unsafe-return */

import type {
  DeleteReturnType,
  Payload,
  PutReturnType,
  TableName,
  ExtractTypeofArray,
} from './types';

/**
   * - The generic at the first position `TableNames` is a union type containing the name of each table in the database you want to access.
   * - The generic at the second position `Resources` is a type which keys, named after each table in the database, map to the types of the resource contained in each of those tables.
   * 
 Example:\
  If the database has a table named `users` with the following columns:
  - `id`: `int`
  - `firstname`: `varchar(255)`
  - `lastname`: `varchar(255)`,\
  and another table named `orders` with the following columns:
  - `id`: `int`
  - `user_id`: `int`
  - `total`: `float`
  Then the `TableNames` generic would be:
  ```typescript
  type TableNames: 'users' | 'orders';\
  ```
  and the `resources` generic would be:
  ```typescript
  type Resources = {
    users: {
      id: number,
      firstname: string,
      lastname: string,
    },
    orders: {
      id: number,
      user_id: number,
      total: number,
    },
  }
  ```
 */
export class PrestApiClient<
  TableNames extends string,
  Resources extends { [k in TableNames]: Resources[TableNames] }
> {
  /**
   * @param prestdApiBaseUrl The base url of the prest api
   * @param schema The name of the schema you want to access
   * @param databaseName The name of the database you want to access

   * - The generic at the first position `TableNames` is a union type containing the name of each table in the database you want to access.
   * - The generic at the second position `Resources` is a type which keys, named after each table in the database, map to the types of the resource contained in each of those tables.
   * 
 Example:\
  If the database has a table named `users` with the following columns:
  - `id`: `int`
  - `firstname`: `varchar(255)`
  - `lastname`: `varchar(255)`,\
  and another table named `orders` with the following columns:
  - `id`: `int`
  - `user_id`: `int`
  - `total`: `float`
  Then the `TableNames` generic would be:
  ```typescript
  type TableNames: "users" | "orders";
  ```
  and the `resources` generic would be:
  ```typescript
  type Resources = {
    users: {
      id: number,
      firstname: string,
      lastname: string,
    },
    orders: {
      id: number,
      user_id: number,
      total: number,
    },
  }
  ```
 */

  constructor(
    private prestdApiBaseUrl: string,
    private schema: string,
    private databaseName: string
  ) {
    this.prestdApiBaseUrl = prestdApiBaseUrl;
    this.databaseName = databaseName;
    this.schema = schema;
  }
  /**
   * @param  tableName Represents the name of the table in the database you want to access.
   * @returns A promise that resolves to the records in the table.
   */
  public async getAll<T>(
    tableName: TableName<T, TableNames>
  ): Promise<Resources[typeof tableName]> {
    const response = await fetch(
      // @ts-ignore
      `${this.prestdApiBaseUrl}/${this.databaseName}/${this.schema}/${tableName}`
    );
    return await response.json();
  }

  /**
   * @param tableName Represents the name of the table in the database you want to access.
   * @param id  id of the record to get from the database
   * @returns A promise that resolves to the record we want to get from the table.
   */
  public async getOne<T>(
    tableName: TableName<T, TableNames>,
    id: number
  ): Promise<ExtractTypeofArray<Resources[typeof tableName]>> {
    const response = await fetch(
      // @ts-ignore
      `${this.prestdApiBaseUrl}/${this.databaseName}/${this.schema}/${tableName}/?id=${id}`
    );
    return await response.json();
  }

  /**
   * @param tableName Represents the name of the table in the database you want to access.
   * @param data  Represents the data (object) you want to insert in the database.
   * @returns A promise that resolves to the record inserted in the table.
   */
  public async post<T, P>(
    tableName: TableName<T, TableNames>,
    data: Payload<P, Resources[typeof tableName]>
  ): Promise<ExtractTypeofArray<Resources[typeof tableName]>> {
    const response = await fetch(
      // @ts-ignore
      `${this.prestdApiBaseUrl}/${this.databaseName}/${this.schema}/${tableName}`,
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

  /**
   * @param tableName Represents the name of the table in the database you want to access.
   * @param data  Represents the data (object) you want to insert in the database.
   * @param id  id of the record to update in the database
   * @returns A promise that resolves to an object containing affected rows from the operation.
   */
  public async put<T, P>(
    tableName: TableName<T, TableNames>,
    data: Payload<P, Resources[typeof tableName]>,
    id: number
  ): Promise<PutReturnType> {
    const response = await fetch(
      // @ts-ignore
      `${this.prestdApiBaseUrl}/${this.databaseName}/${this.schema}/${tableName}/?id=${id}`,
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

  /**
   * @param tableName Represents the name of the table in the database you want to access.
   * @param id  id of the record to delete from the database
   * @returns A promise that resolves to an object containing affected rows from the operation.
   */
  public async delete<T>(
    tableName: TableName<T, TableNames>,
    id: number
  ): Promise<DeleteReturnType> {
    const response = await fetch(
      // @ts-ignore
      `${this.prestdApiBaseUrl}/${this.databaseName}/${this.schema}/${tableName}?id=${id}`,
      {
        method: 'DELETE',
      }
    );
    return await response.json();
  }
}

export default PrestApiClient;
