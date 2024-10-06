import { test } from '@playwright/test';
import { Actions as FramesAndWindowsPageActions } from '../../pom/way2automation/framesAndWindowsPage/actions';
import { Actions as NewPopupPageActions } from '../../pom/way2automation/newFramePopupPage/actions';

test.describe('Window and Frame testing on Way2automation', () => {
    let framesAndWindowsPageActions: FramesAndWindowsPageActions;
    let newPopupPageActions: NewPopupPageActions;

    test.beforeEach(async ({ page }) => {
        framesAndWindowsPageActions = new FramesAndWindowsPageActions(page);
        newPopupPageActions = new NewPopupPageActions();
        await framesAndWindowsPageActions.goTo();
    });

    test.afterEach(async ({ context }) => {
        await context.close();
    });

    test('Open new browser tab through an iframe', { tag: '@NewBrowserTab'}, async ({ context }) => {
        await framesAndWindowsPageActions.openNewBrowserTab();
        await newPopupPageActions.evaluateNewTab(context);
    });

    test('Open new separate window through an iframe', { tag: '@OpenNewSeparateWindow'}, async ({ context }) => {
        await framesAndWindowsPageActions.openNewSeparateWindow();
        await newPopupPageActions.evaluateNewSeparateWindow(context);
    });

    test('Open multiple windows through an iframe', { tag: '@OpenMultipleWindows'}, async ({ context }) => {
        await framesAndWindowsPageActions.openNewMultipleWindows();
        await newPopupPageActions.evaluateNewMultipleWindows(context);
    });

    test('Open new frameset tab through an iframe', { tag: '@OpenFramesetWindow'}, async ({ context }) => {
        await framesAndWindowsPageActions.openNewFramesetWindow();
        await newPopupPageActions.evaluateNewFramesetWindow(context);
    });
});































// const allPages = context.pages();
        // const result: { [selector: string]: { [property: string]: string } } = {};
        // const cssString = await allPages[1].frameLocator('frame[name="contentFrame"]').locator('html head style').innerText();
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