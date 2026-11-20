
import { defineConfig } from '@playwright/test';
import 'dotenv/config';

const baseURL = process.env.BASE_URL;

if (!baseURL) {
  throw new Error('BASE_URL is missing. Please check your .env file.');
}

export default defineConfig({
  testDir: './src/tests',
  fullyParallel: false,
  reporter: 'list',

  use: {
    baseURL,
    extraHTTPHeaders: {
      'Content-Type': 'application/json'
    }
  }
});
