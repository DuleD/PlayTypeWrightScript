import { test, expect, type Locator } from '@playwright/test';
import { FramesAndWindowsLocators } from '../../pom/way2automation/framesAndWindowsLocators';
import { FramesAndWindowsActions } from '../../pom/way2automation/framesAndWindowsActions';
import { expectedValues } from '../../pom/way2automation/framesAndWindowsExpectedValues';

test.describe('Window and Frame testing on Way2automation', () => {
    let framesAndWindowsLocators: FramesAndWindowsLocators;
    let framesAndWindowsActions: FramesAndWindowsActions;

    test.beforeEach(async ({ page }) => {
        framesAndWindowsLocators = new FramesAndWindowsLocators(page);
        framesAndWindowsActions = new FramesAndWindowsActions(framesAndWindowsLocators);
        await framesAndWindowsActions.goTo();
    });

    test.afterEach(async ({ context }) => {
        await context.close();
    });

    test('Open new browser tab through an iframe', { tag: '@NewBrowserTab'}, async ({ context }) => {
        const hyperlink = framesAndWindowsLocators.newWindowFrameTextLink();
        expect(await hyperlink.innerText()).toEqual(expectedValues.newWindowText);

        await hyperlink.click();
        await context.waitForEvent('page');

        const newPage = await framesAndWindowsActions.evaluateNewTab(context);
        const newPageHyperlinkText = await framesAndWindowsLocators.newPageHyperlink(newPage).innerText();
        expect(newPageHyperlinkText).toEqual(expectedValues.newWindowText);
    });

    test('Open new separate window through an iframe', { tag: '@OpenNewSeparateWindow'}, async ({ context }) => {
        await framesAndWindowsLocators.separateNewWindowResponsiveTab().click();
        const hyperlink = framesAndWindowsLocators.separateNewWindowFrameTextLink();
        expect(await hyperlink.innerText()).toEqual(expectedValues.separateNewWindowText);

        await hyperlink.click();
        await waitForNumber(() => context.pages().length, 2)

        const newPage = await framesAndWindowsActions.evaluateNewWindow(context);
        const newPageHyperlinkText = await framesAndWindowsLocators.newPageHyperlink(newPage).innerText();
        expect(newPageHyperlinkText).toEqual(expectedValues.separateNewWindowText);
    });

    test('Open multiple windows through an iframe', { tag: '@OpenMultipleWindows'}, async ({ context }) => {
        await framesAndWindowsLocators.multipleWindowsResponsiveTab().click();
        const hyperlink = framesAndWindowsLocators.multipleWindowsFrameTextLink();
        expect(await hyperlink.innerText()).toEqual(expectedValues.multipleWindowsFrameText);

        await hyperlink.click();
        await waitForNumber(() => context.pages().length, 4)

        await framesAndWindowsActions.evaluateMultipleNewWindows(context);
    });

    test('Open new frameset tab through an iframe', { tag: '@OpenFramesetWindow'}, async ({ context }) => {
        await framesAndWindowsLocators.framesetWindowResponsiveTab().click();
        const hyperlink = framesAndWindowsLocators.framesetWindowFrameTextLink();
        expect(await hyperlink.innerText()).toEqual(expectedValues.framesetWindowText);

        await hyperlink.click();
        await context.waitForEvent('page');

        const newPage = await framesAndWindowsActions.evaluateNewTab(context);

        const topFrameHeading = await framesAndWindowsLocators.newFramesetTabTopFrameHeading(newPage).innerText();
        const topFrameParagraph = await framesAndWindowsLocators.newFramesetTabContentFrameParagraph(newPage).innerText();
        expect(topFrameHeading).toEqual(expectedValues.newFramesetTabHeadingText);
        expect(topFrameParagraph).toEqual(expectedValues.newFramesetTabParagraphText);
        expect(framesAndWindowsLocators.newFramesetTabTopFrameHeading(newPage)).toHaveCSS('color', 'rgb(255, 255, 255)');
        expect(framesAndWindowsLocators.newFramesetTabTopFrameHeading(newPage)).toHaveCSS('text-shadow', 'rgb(255, 255, 255) 0px 0px 5px');
        expect(framesAndWindowsLocators.newFramesetTabContentFrameParagraph(newPage)).toHaveCSS('color', 'rgb(255, 255, 255)');
        expect(framesAndWindowsLocators.newFramesetTabTopFrameBody(newPage)).toHaveCSS('background-color', 'rgb(151, 163, 193)');

        const contentFrameHeading = await framesAndWindowsLocators.newFramesetTabContentFrameHeading(newPage).innerText();
        const contentFrameParagraph = await framesAndWindowsLocators.newFramesetTabContentFrameParagraph(newPage).innerText();
        expect(contentFrameHeading).toEqual(expectedValues.newFramesetTabHeadingText);
        expect(contentFrameParagraph).toEqual(expectedValues.newFramesetTabParagraphText);

        if (context.browser().browserType().name() === 'chromium'){
            const headingCSS = await getElementCSS(framesAndWindowsLocators.newFramesetTabContentFrameHeading(newPage));
            expect(headingCSS.color).toEqual('rgb(255, 255, 255)');
            expect(headingCSS.textShadow).toEqual('rgb(255, 255, 255) 0px 0px 5px');

            const paragraphCSS = await getElementCSS(framesAndWindowsLocators.newFramesetTabContentFrameParagraph(newPage));
            expect(paragraphCSS.color).toEqual('rgb(255, 255, 255)');

            const bodyCSS = await getElementCSS(framesAndWindowsLocators.newFramesetTabContentFrameBody(newPage));
            expect(bodyCSS.backgroundColor).toEqual('rgb(102, 153, 102)')
        }

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
    });
});

async function waitForNumber(getValue: () => number, target: number): Promise<void> {
    while (getValue() !== target) {
        await new Promise(resolve => setTimeout(resolve, 100));
    }
}

async function getElementCSS(locator: Locator) : Promise<CSSStyleDeclaration> {
    return locator.evaluate((element) => window.getComputedStyle(element));
}
