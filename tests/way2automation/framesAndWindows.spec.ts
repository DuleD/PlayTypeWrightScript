import { test, expect, type Locator } from '@playwright/test';

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

        const initialPageInternalDimension = await page.evaluate(() => [window.innerWidth, window.innerHeight]);
        const newPageInternalDimension = await newPage.evaluate(() => [window.innerWidth, window.innerHeight]);
        expect(initialPageInternalDimension).toEqual(newPageInternalDimension);
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

    test('Open new frameset tab through an iframe', { tag: '@OpenFramesetWindow'}, async ({ page, context }) => {
        await page.locator('.responsive-tabs').getByText("Frameset").click();
        await page.frameLocator('#example-1-tab-3 iframe').getByText('Open Frameset Window').click();
        await context.waitForEvent('page');

        const allPages = context.pages();
        expect(allPages.length).toEqual(2);

        const newPage = allPages[allPages.length - 1];
        await newPage.waitForLoadState();

        const initialPageInternalDimension = await page.evaluate(() => [window.innerWidth, window.innerHeight]);
        const newPageInternalDimension = await newPage.evaluate(() => [window.innerWidth, window.innerHeight]);
        expect(initialPageInternalDimension).toEqual(newPageInternalDimension);

        const topFrameHeading = await newPage.frameLocator('frame[name="topFrame"]').getByRole('heading').innerText();
        const topFrameText = await newPage.frameLocator('frame[name="topFrame"]').getByRole('paragraph').innerText();
        expect(topFrameHeading).toEqual('www.way2automation.com');
        expect(topFrameText).toEqual('Demo text. Demo text. Demo text. Demo text. Demo text. Demo text. Demo text. Demo text. Demo text. Demo text. Demo text. Demo text. Demo text. Demo text. Demo text. Demo text. Demo text. Demo text. Demo text.');
        expect(newPage.frameLocator('frame[name="topFrame"]').getByText(topFrameHeading)).toHaveCSS('color', 'rgb(255, 255, 255)');
        expect(newPage.frameLocator('frame[name="topFrame"]').getByText(topFrameHeading)).toHaveCSS('text-shadow', 'rgb(255, 255, 255) 0px 0px 5px');
        expect(newPage.frameLocator('frame[name="topFrame"]').getByText(topFrameText)).toHaveCSS('color', 'rgb(255, 255, 255)');
        expect(newPage.frameLocator('frame[name="topFrame"]').locator('body')).toHaveCSS('background-color', 'rgb(151, 163, 193)');

        const contentFrameHeading = await newPage.frameLocator('frame[name="contentFrame"]').getByRole('heading').innerText();
        const contentFrameText = await newPage.frameLocator('frame[name="contentFrame"]').getByRole('paragraph').innerText();
        expect(contentFrameHeading).toEqual('www.way2automation.com');
        expect(contentFrameText).toEqual('Demo text. Demo text. Demo text. Demo text. Demo text. Demo text. Demo text. Demo text. Demo text. Demo text. Demo text. Demo text. Demo text. Demo text. Demo text. Demo text. Demo text. Demo text. Demo text.');

        // const result: { [selector: string]: { [property: string]: string } } = {};
        // const cssString = await newPage.frameLocator('frame[name="contentFrame"]').locator('html head style').innerText();
        // const selectors = ['body', 'div', 'h2'];
        // selectors.forEach(selector => {
        //     const regex = new RegExp(`${selector}\\s*\\{([^}]+)\\}`, 'g');
        //     const match = regex.exec(cssString);
        //     const properties = match[1].trim().split(';').filter(Boolean); // Split properties by ';' and filter empty values
        //     const styles: { [property: string]: string } = {};
        //     properties.forEach(property => {
        //         const [key, value] = property.split(':').map(p => p.trim());
        //         if (key && value) {
        //             styles[key] = value; // Create key-value pairs for styles
        //         }
        //     });
        //     result[selector] = styles;
        // });
        // expect(result.body.background).toEqual('#696');

        if (context.browser().browserType().name() === 'chromium'){
            const headingCSS = await getElementCSS(newPage.frameLocator('frame[name="contentFrame"]').getByText(contentFrameHeading));
            expect(headingCSS.color).toEqual('rgb(255, 255, 255)');
            expect(headingCSS.textShadow).toEqual('rgb(255, 255, 255) 0px 0px 5px');

            const paragraphCSS = await getElementCSS(newPage.frameLocator('frame[name="contentFrame"]').getByText(contentFrameText));
            expect(paragraphCSS.color).toEqual('rgb(255, 255, 255)');

            const bodyCSS = await getElementCSS(newPage.frameLocator('frame[name="contentFrame"]').locator('body'));
            expect(bodyCSS.backgroundColor).toEqual('rgb(102, 153, 102)')
        }
    });
});

async function waitForValue(getValue: () => number, target: number): Promise<void> {
    while (getValue() !== target) {
        await new Promise(resolve => setTimeout(resolve, 100));
    }
}

async function getElementCSS(locator: Locator) : Promise<CSSStyleDeclaration> {
    return locator.evaluate((element) => window.getComputedStyle(element));
}
