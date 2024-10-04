import { test, expect } from '@playwright/test';

test.describe('Window and Frame testing on Way2automation', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.way2automation.com/way2auto_jquery/frames-and-windows.php#load_box');
    });

    test.afterEach(async ({ context }) => {
        await context.close();
    });

    test('Open new browser tab through an iframe', { tag: '@NewBrowserTab'}, async ({ page, context }) => {
        await page.frameLocator('#example-1-tab-1 iframe').getByText('New Browser Tab').click();
        await context.waitForEvent('page');

        const allPages = context.pages();
        expect(allPages.length).toEqual(2);

        const newPage = allPages[allPages.length - 1];
        await newPage.waitForLoadState();
        expect(await newPage.locator('.farme_window').innerText()).toEqual('New Browser Tab');
    });

    test('Open new separate window through an iframe', { tag: '@OpenNewSeparateWindow'}, async ({ page, context }) => {
        await page.locator('.responsive-tabs').getByText("Open Seprate New Window").click();
        await page.frameLocator('#example-1-tab-2 iframe').getByText('Open New Seprate Window').click();
        await waitForValue(() => context.pages().length, 2)

        const allPages = context.pages();
        expect(allPages.length).toEqual(2);

        const newPage = allPages[allPages.length - 1];
        await newPage.waitForLoadState();

        const initialPageInternalDimension = await page.evaluate(() => [window.innerWidth, window.innerHeight]);
        const newPageInternalDimension = await newPage.evaluate(() => [window.innerWidth, window.innerHeight]);
        expect(initialPageInternalDimension).not.toEqual(newPageInternalDimension);
        expect(await newPage.locator('.farme_window').innerText()).toEqual('Open New Seprate Window');
    });
});

async function waitForValue(getValue: () => number, target: number): Promise<void> {
    while (getValue() !== target) {
        await new Promise(resolve => setTimeout(resolve, 100));
    }
}