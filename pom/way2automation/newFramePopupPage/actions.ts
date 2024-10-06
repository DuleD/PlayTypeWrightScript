import { expect, type BrowserContext, type Page} from '@playwright/test';
import { Locators } from './locators';
import { expectedValues } from './expectedValues';
import { getElementCSS } from '../../../tests/way2automation/framesAndWindows.spec';

export class Actions{
    readonly newFramePopupPage: Locators;
    constructor(newFramePopupPage: Locators) {
        this.newFramePopupPage = newFramePopupPage;
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
            const textContent = await this.newFramePopupPage.newPageHyperlink(page).innerText();
            const containsValue = expectedValues.multipleWindowsValues.some(value => textContent.includes(value));
            expect(containsValue).toBeTruthy();
        }
    }
    async evaluateNewFramesetWindow(page: Page){
        const topFrameHeading = await this.newFramePopupPage.newFramesetTabTopFrameHeading(page).innerText();
        const topFrameParagraph = await this.newFramePopupPage.newFramesetTabContentFrameParagraph(page).innerText();
        expect(topFrameHeading).toEqual(expectedValues.newFramesetTopFrameHeadingText);
        expect(topFrameParagraph).toEqual(expectedValues.newFramesetTopFrameParagraphText);
        expect(this.newFramePopupPage.newFramesetTabTopFrameHeading(page)).toHaveCSS('color', expectedValues.newFramesetTopFrameHeadingColor);
        expect(this.newFramePopupPage.newFramesetTabTopFrameHeading(page)).toHaveCSS('text-shadow', expectedValues.newFramesetTopFrameHeadingShadow);
        expect(this.newFramePopupPage.newFramesetTabTopFrameParagraph(page)).toHaveCSS('color', expectedValues.newFramesetTopFrameParagraphColor);
        expect(this.newFramePopupPage.newFramesetTabTopFrameBody(page)).toHaveCSS('background-color', expectedValues.newFramesetTopFrameBodyColor);

        const contentFrameHeading = await this.newFramePopupPage.newFramesetTabContentFrameHeading(page).innerText();
        const contentFrameParagraph = await this.newFramePopupPage.newFramesetTabContentFrameParagraph(page).innerText();
        expect(contentFrameHeading).toEqual(expectedValues.newFramesetContentFrameHeadingText);
        expect(contentFrameParagraph).toEqual(expectedValues.newFramesetContentFrameParagraphText);

        if (page.context().browser().browserType().name() === 'chromium'){
            const headingCSS = await getElementCSS(this.newFramePopupPage.newFramesetTabContentFrameHeading(page));
            expect(headingCSS.color).toEqual(expectedValues.newFramesetContentFrameHeadingColor);
            expect(headingCSS.textShadow).toEqual(expectedValues.newFramesetContentFrameHeadingShadow);

            const paragraphCSS = await getElementCSS(this.newFramePopupPage.newFramesetTabContentFrameParagraph(page));
            expect(paragraphCSS.color).toEqual(expectedValues.newFramesetContentFrameParagraphColor);

            const bodyCSS = await getElementCSS(this.newFramePopupPage.newFramesetTabContentFrameBody(page));
            expect(bodyCSS.backgroundColor).toEqual(expectedValues.newFramesetContentFrameBodyColor);
        }
    }
}
