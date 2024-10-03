import { test, expect } from '@playwright/test';

test.describe('New window and iframe testing on way2automation', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.way2automation.com/way2auto_jquery/frames-and-windows.php#load_box');
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
        expect(await newPage.locator('.farme_window').innerText()).toEqual('Open New Seprate Window');
    });
});

async function waitForValue(getValue: () => number, target: number): Promise<void> {
    while (getValue() !== target) {
        await new Promise(resolve => setTimeout(resolve, 100));
    }
}