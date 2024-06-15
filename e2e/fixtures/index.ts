import { expect, mergeTests } from '@playwright/test';
import { test as auth1 } from './auth1';
import { test as auth2 } from './auth2';
import { test as noAuth } from './no_auth';

const test = mergeTests(auth1, auth2, noAuth);

export { test, expect };
