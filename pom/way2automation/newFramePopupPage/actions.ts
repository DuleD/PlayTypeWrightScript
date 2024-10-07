import { expect, type BrowserContext, type Page} from '@playwright/test';
import { Locators } from './locators';
import { expectedValues } from './expectedValues';
import { getLocatorCSS } from '../../../utils/helpers';
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
    async evaluateNewFramesetWindowTopFrame(page: Page){
        const topFrameHeadingLocator = this.newFramePopupLocators.newFramesetTabTopFrameHeading(page);
        const topFrameParagraphLocator = this.newFramePopupLocators.newFramesetTabContentFrameParagraph(page);
        const topFrameBodyLocator = this.newFramePopupLocators.newFramesetTabTopFrameBody(page);
        expect.soft(await topFrameHeadingLocator.innerText()).toEqual(expectedValues.newFramesetTopFrameHeadingText);
        expect.soft(await topFrameParagraphLocator.innerText()).toEqual(expectedValues.newFramesetTopFrameParagraphText);
        expect.soft(topFrameHeadingLocator).toHaveCSS('color', expectedValues.newFramesetTopFrameHeadingColor);
        expect.soft(topFrameHeadingLocator).toHaveCSS('text-shadow', expectedValues.newFramesetTopFrameHeadingShadow);
        expect.soft(topFrameParagraphLocator).toHaveCSS('color', expectedValues.newFramesetTopFrameParagraphColor);
        expect.soft(topFrameBodyLocator).toHaveCSS('background-color', expectedValues.newFramesetTopFrameBodyColor);
    }
    async evaluateNewFramesetWindowContentFrame(page: Page){
        const contentFrameHeadingLocator = this.newFramePopupLocators.newFramesetTabContentFrameHeading(page);
        const contentFrameParagraphLocator = this.newFramePopupLocators.newFramesetTabContentFrameParagraph(page);
        const contentFrameBodyLocator = this.newFramePopupLocators.newFramesetTabContentFrameBody(page);
        expect.soft(await contentFrameHeadingLocator.innerText()).toEqual(expectedValues.newFramesetContentFrameHeadingText);
        expect.soft(await contentFrameParagraphLocator.innerText()).toEqual(expectedValues.newFramesetContentFrameParagraphText);

        const contentFrameHeadingStyles = await getLocatorCSS(contentFrameHeadingLocator);
        const contentFrameParagraphStyles = await getLocatorCSS(contentFrameParagraphLocator);
        const contentFrameBodyStyles = await getLocatorCSS(contentFrameBodyLocator);
        expect.soft(contentFrameHeadingStyles['color']).toEqual(expectedValues.newFramesetContentFrameHeadingColor);
        expect.soft(contentFrameHeadingStyles['text-shadow']).toEqual(expectedValues.newFramesetContentFrameHeadingShadow);
        expect.soft(contentFrameParagraphStyles['color']).toEqual(expectedValues.newFramesetContentFrameParagraphColor);
        expect.soft(contentFrameBodyStyles['background-color']).toEqual( expectedValues.newFramesetContentFrameBodyColor);
    }
    async evaluateNewFramesetWindow(context: BrowserContext){
        const page = await newTabOrWindowChecks.newTabCheck(context);
        await this.evaluateNewFramesetWindowTopFrame(page);
        await this.evaluateNewFramesetWindowContentFrame(page);
    }
}
