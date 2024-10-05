import { expect, type BrowserContext} from '@playwright/test';
import { FramesAndWindowsLocators } from './framesAndWindowsLocators';
import { expectedValues } from './framesAndWindowsExpectedValues';

export class FramesAndWindowsActions{
    readonly framesAndWindowsPage: FramesAndWindowsLocators;
    constructor(framesAndWindowsPage: FramesAndWindowsLocators) {
        this.framesAndWindowsPage = framesAndWindowsPage;
    }

    async goTo() {
        await this.framesAndWindowsPage.page.goto('https://www.way2automation.com/way2auto_jquery/frames-and-windows.php#load_box');
    }
    async evaluateNewTab(context: BrowserContext){
        const allPages = context.pages();
        expect(allPages.length).toEqual(2);
        const newPage = allPages[1];
        await newPage.waitForLoadState();

        const initialPageInternalDimension = await allPages[0].evaluate(() => [window.innerWidth, window.innerHeight]);
        const newPageInternalDimension = await newPage.evaluate(() => [window.innerWidth, window.innerHeight]);
        expect(initialPageInternalDimension).toEqual(newPageInternalDimension);
        return newPage;
    }
    async evaluateNewWindow(context: BrowserContext){
        const allPages = context.pages();
        expect(allPages.length).toEqual(2);
        const newPage = allPages[1];
        await newPage.waitForLoadState();

        const initialPageInternalDimension = await allPages[0].evaluate(() => [window.innerWidth, window.innerHeight]);
        const newPageInternalDimension = await newPage.evaluate(() => [window.innerWidth, window.innerHeight]);
        expect(initialPageInternalDimension).not.toEqual(newPageInternalDimension);
        return newPage;
    }
    async evaluateMultipleNewWindows(context: BrowserContext){
        const allPages = context.pages();
        expect(allPages.length).toEqual(4);
        allPages.shift();

        for (const page of allPages){
            await page.waitForLoadState();
            const textContent = await this.framesAndWindowsPage.newPageHyperlink(page).innerText();
            const containsValue = expectedValues.multipleWindowsExpectedValues.some(value => textContent.includes(value));
            expect(containsValue).toBeTruthy();
        }
    }
}