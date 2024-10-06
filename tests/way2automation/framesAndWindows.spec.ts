import { test, expect, type Locator } from '@playwright/test';
import { Locators as InitialPageLocators } from '../../pom/way2automation/framesAndWindowsPage/locators';
import { Actions as InitialPageActions } from '../../pom/way2automation/framesAndWindowsPage/actions';
import { expectedValues as InitialPageExpectedValues} from '../../pom/way2automation/framesAndWindowsPage/expectedValues';
import { Locators as NewPageLocators } from '../../pom/way2automation/newFramePopupPage/locators';
import { Actions as NewPageActions } from '../../pom/way2automation/newFramePopupPage/actions';
import { expectedValues as newPageExpectedValues} from '../../pom/way2automation/newFramePopupPage/expectedValues';

test.describe('Window and Frame testing on Way2automation', () => {
    let initialPageLocators: InitialPageLocators;
    let initialPageActions: InitialPageActions;

    let newPageLocators: NewPageLocators;
    let newPageActions: NewPageActions;

    test.beforeEach(async ({ page }) => {
        initialPageLocators = new InitialPageLocators(page);
        initialPageActions = new InitialPageActions(initialPageLocators);

        newPageLocators = new NewPageLocators();
        newPageActions = new NewPageActions(newPageLocators);
        await initialPageActions.goTo();
    });

    test.afterEach(async ({ context }) => {
        await context.close();
    });

    test('Open new browser tab through an iframe', { tag: '@NewBrowserTab'}, async ({ context }) => {
        const hyperlink = initialPageLocators.newWindowFrameTextLink();
        expect(await hyperlink.innerText()).toEqual(InitialPageExpectedValues.newWindowText);

        await hyperlink.click();
        await context.waitForEvent('page');

        const newPage = await newPageActions.evaluateNewTab(context);
        const newPageHyperlinkText = await newPageLocators.newPageHyperlink(newPage).innerText();
        expect(newPageHyperlinkText).toEqual(newPageExpectedValues.newWindowText);
    });

    test('Open new separate window through an iframe', { tag: '@OpenNewSeparateWindow'}, async ({ context }) => {
        await initialPageLocators.separateNewWindowResponsiveTab().click();
        const hyperlink = initialPageLocators.separateNewWindowFrameTextLink();
        expect(await hyperlink.innerText()).toEqual(InitialPageExpectedValues.separateNewWindowText);

        await hyperlink.click();
        await waitForNumber(() => context.pages().length, 2)

        const newPage = await newPageActions.evaluateNewWindow(context);
        const newPageHyperlinkText = await newPageLocators.newPageHyperlink(newPage).innerText();
        expect(newPageHyperlinkText).toEqual(newPageExpectedValues.separateNewWindowText);
    });

    test('Open multiple windows through an iframe', { tag: '@OpenMultipleWindows'}, async ({ context }) => {
        await initialPageLocators.multipleWindowsResponsiveTab().click();
        const hyperlink = initialPageLocators.multipleWindowsFrameTextLink();
        expect(await hyperlink.innerText()).toEqual(InitialPageExpectedValues.multipleWindowsFrameText);

        await hyperlink.click();
        await waitForNumber(() => context.pages().length, 4)

        await newPageActions.evaluateMultipleNewWindows(context);
    });

    test('Open new frameset tab through an iframe', { tag: '@OpenFramesetWindow'}, async ({ context }) => {
        await initialPageLocators.framesetWindowResponsiveTab().click();
        const hyperlink = initialPageLocators.framesetWindowFrameTextLink();
        expect(await hyperlink.innerText()).toEqual(InitialPageExpectedValues.framesetWindowText);

        await hyperlink.click();
        await context.waitForEvent('page');

        const newPage = await newPageActions.evaluateNewTab(context);
        await newPageActions.evaluateNewFramesetWindow(newPage);

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

export async function getElementCSS(locator: Locator) : Promise<CSSStyleDeclaration> {
    return locator.evaluate((element) => window.getComputedStyle(element));
}
