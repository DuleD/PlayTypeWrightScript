import { expect, type BrowserContext, type Page} from '@playwright/test';
import { Locators } from './locators';
import { expectedValues } from './expectedValues';
import { getElementCSS } from '../../../utils/helpers';
import * as newTabOrWindowChecks from '../../../utils/newTabOrWindowChecks'

export class Actions{
    readonly newFramePopupLocators: Locators = new Locators();
    async evaluateNewTab(context: BrowserContext){
        const newPage = await newTabOrWindowChecks.newTabCheck(context);
        const newPageHyperlinkText = await this.newFramePopupLocators.newPageHyperlink(newPage).innerText();
        expect.soft(newPageHyperlinkText).toEqual(expectedValues.newWindowText);
    }
    async evaluateNewSeparateWindow(context: BrowserContext){
        const newPage = await newTabOrWindowChecks.newWindowCheck(context);
        const newPageHyperlinkText = await this.newFramePopupLocators.newPageHyperlink(newPage).innerText();
        expect.soft(newPageHyperlinkText).toEqual(expectedValues.separateNewWindowText);
    }
    async evaluateNewMultipleWindows(context: BrowserContext){
        await newTabOrWindowChecks.multipleNewWindowsCheck(context, expectedValues.multipleWindowsValues.length);
        const allPages = context.pages();
        allPages.shift();

        for (const page of allPages){
            await page.waitForLoadState();
            const textContent = await this.newFramePopupLocators.newPageHyperlink(page).innerText();
            const containsValue = expectedValues.multipleWindowsValues.some(value => textContent.includes(value));
            expect.soft(containsValue).toBeTruthy();
        }
    }
    async evaluateNewFramesetWindow(context: BrowserContext){
        const page = await newTabOrWindowChecks.newTabCheck(context);
        const topFrameHeading = await this.newFramePopupLocators.newFramesetTabTopFrameHeading(page).innerText();
        const topFrameParagraph = await this.newFramePopupLocators.newFramesetTabContentFrameParagraph(page).innerText();
        expect.soft(topFrameHeading).toEqual(expectedValues.newFramesetTopFrameHeadingText);
        expect.soft(topFrameParagraph).toEqual(expectedValues.newFramesetTopFrameParagraphText);
        expect.soft(this.newFramePopupLocators.newFramesetTabTopFrameHeading(page)).toHaveCSS('color', expectedValues.newFramesetTopFrameHeadingColor);
        expect.soft(this.newFramePopupLocators.newFramesetTabTopFrameHeading(page)).toHaveCSS('text-shadow', expectedValues.newFramesetTopFrameHeadingShadow);
        expect.soft(this.newFramePopupLocators.newFramesetTabTopFrameParagraph(page)).toHaveCSS('color', expectedValues.newFramesetTopFrameParagraphColor);
        expect.soft(this.newFramePopupLocators.newFramesetTabTopFrameBody(page)).toHaveCSS('background-color', expectedValues.newFramesetTopFrameBodyColor);

        const contentFrameHeading = await this.newFramePopupLocators.newFramesetTabContentFrameHeading(page).innerText();
        const contentFrameParagraph = await this.newFramePopupLocators.newFramesetTabContentFrameParagraph(page).innerText();
        expect.soft(contentFrameHeading).toEqual(expectedValues.newFramesetContentFrameHeadingText);
        expect.soft(contentFrameParagraph).toEqual(expectedValues.newFramesetContentFrameParagraphText);

        if (context.browser().browserType().name() === 'chromium'){
            const headingCSS = await getElementCSS(this.newFramePopupLocators.newFramesetTabContentFrameHeading(page));
            expect.soft(headingCSS.color).toEqual(expectedValues.newFramesetContentFrameHeadingColor);
            expect.soft(headingCSS.textShadow).toEqual(expectedValues.newFramesetContentFrameHeadingShadow);

            const paragraphCSS = await getElementCSS(this.newFramePopupLocators.newFramesetTabContentFrameParagraph(page));
            expect.soft(paragraphCSS.color).toEqual(expectedValues.newFramesetContentFrameParagraphColor);

            const bodyCSS = await getElementCSS(this.newFramePopupLocators.newFramesetTabContentFrameBody(page));
            expect.soft(bodyCSS.backgroundColor).toEqual(expectedValues.newFramesetContentFrameBodyColor);
        }
    }
}
