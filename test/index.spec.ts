/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import PrestApiClient from './../src/index';
import { ApiResources, TableNames } from './typesForTests';
import { enableFetchMocks } from 'jest-fetch-mock';
import { config } from 'dotenv';
config();

enableFetchMocks();
fetchMock.dontMock();

let api: PrestApiClient<TableNames, ApiResources>;
beforeEach(() => {
  api = new PrestApiClient<TableNames, ApiResources>(
    process.env.PRESTD_API_BASE_URL as string,
    process.env.PRESTD_API_DATABASE_NAME as string,
    process.env.PRESTD_API_DATABASE_SCHEMA as string
  );
});

describe('fetching an api enpoint', () => {
  // describe('using getAll', () => {
  test('using getAll returns something', async () => {
    const users = await api.getAll('users');
    expect(users).toBeDefined();
  });

  test('using getOne returns something', async () => {
    const users = await api.getOne('users', 1);
    expect(users).toBeDefined();
  });

  test('using post returns something', async () => {
    const newUser = {
      firstname: 'test',
      lastname: 'test',
      phonenumber: 322,
      email: 'test',
      login: 'test',
      password: 'test',
    };

    const data = await api.post('users', newUser);
    expect(data).toBeDefined();
  });

  test('using put returns something', async () => {
    const newUser = {
      firstname: 'test',
      lastname: 'test',
      phonenumber: 322,
      email: 'test',
      login: 'test',
      password: 'test',
    };
    const data = await api.put('users', newUser, 1);
    expect(data).toBeDefined();
  });

  test('using delete returns something', async () => {
    const users = await api.delete('users', 1);
    expect(users).toBeDefined();
  });

  // });
});
