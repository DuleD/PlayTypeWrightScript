import { expect, test } from '@playwright/test';

/*This is an example of how tests would utilize environment variables through .env files
inside the config folder.*/

test('Log In', { tag: '@EnvVariableTest' }, async ({ page }) => {
    await page.goto(process.env.TEST_URL);
    await page.getByRole('textbox', { name: 'username'}).fill(process.env.TEST_USERNAME);
    await page.getByRole('textbox', { name: 'password'}).fill(process.env.TEST_PASSWORD);
    await page.getByRole('button', { name: /Submit|Login/ }).click();

    //The URL will change only if the login is successful
    expect(page.url()).not.toEqual(process.env.TEST_URL);
});