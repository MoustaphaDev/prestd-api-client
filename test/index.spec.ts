/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import PrestApiClient from './../src/index';
import { ApiResources, TableNames } from './typesForTests';
import { enableFetchMocks } from 'jest-fetch-mock';
import { config } from 'dotenv';
import * as testData from './index.spec.data';
config();
// process.env.CI = 'true'; // use this line to test the behavior of tests on github actions

enableFetchMocks();

describe('fetching an api enpoint', () => {
  let api: PrestApiClient<TableNames, ApiResources>;
  // describe('using getAll', () => {
  beforeEach(() => {
    fetchMock.resetMocks();

    // Mock responses only in github actions
    fetchMock.dontMockIf(
      () => process.env.CI === undefined || process.env.CI === 'false'
    );

    api = new PrestApiClient<TableNames, ApiResources>({
      prestdApiBaseUrl: process.env.PRESTD_API_BASE_URL as string,
      schema: process.env.PRESTD_API_DATABASE_NAME as string,
      databaseName: process.env.PRESTD_API_DATABASE_SCHEMA as string,
    });
  });

  test('using getAll returns something', async () => {
    fetchMock.mockResponse(JSON.stringify(testData.getAllMockData));
    const users = await api.getAll('users');
    expect(users).toBeDefined();
    expect(users).toBeTruthy();
  });

  test('using getOne returns something', async () => {
    fetchMock.mockResponse(JSON.stringify(testData.getOneMockData));
    const users = await api.getOne('users', 1);
    expect(users).toBeDefined();
    expect(users).toBeTruthy();
  });

  test('using post returns something', async () => {
    fetchMock.mockResponse(JSON.stringify(testData.postMockData));
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
    expect(data).toBeTruthy();
  });

  test('using put returns something', async () => {
    fetchMock.mockResponse(JSON.stringify(testData.putMockData));
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
    expect(data).toBeTruthy();
  });

  test('using delete returns something', async () => {
    fetchMock.mockResponse(JSON.stringify(testData.deleteMockData));
    const data = await api.delete('users', 1);
    expect(data).toBeDefined();
    expect(data).toBeTruthy();
  });

  // });
});
