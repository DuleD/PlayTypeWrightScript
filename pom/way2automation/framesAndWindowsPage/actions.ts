import { expect, type Page } from '@playwright/test';
import { expectedValues } from './expectedValues';
import { Locators } from './locators';
import { waitForNumber } from '../../../utils/helpers';

export class Actions{
    readonly framesAndWindowsLocators: Locators;
    constructor(page: Page) {
        this.framesAndWindowsLocators = new Locators(page);
    }

    async goTo() {
        await this.framesAndWindowsLocators.page.goto('https://www.way2automation.com/way2auto_jquery/frames-and-windows.php#load_box');
    }
    async openNewBrowserTab() {
        const hyperlink = this.framesAndWindowsLocators.newWindowFrameTextLink();
        expect.soft(await hyperlink.innerText()).toEqual(expectedValues.newWindowText);

        await hyperlink.click();
        await this.framesAndWindowsLocators.page.context().waitForEvent('page');
    }
    async openNewSeparateWindow() {
        await this.framesAndWindowsLocators.separateNewWindowResponsiveTab().click();
        const hyperlink = this.framesAndWindowsLocators.separateNewWindowFrameTextLink();
        expect.soft(await hyperlink.innerText()).toEqual(expectedValues.separateNewWindowText);

        await hyperlink.click();
        await waitForNumber(() => this.framesAndWindowsLocators.page.context().pages().length, 2)
    }
    async openNewMultipleWindows() {
        await this.framesAndWindowsLocators.multipleWindowsResponsiveTab().click();
        const hyperlink = this.framesAndWindowsLocators.multipleWindowsFrameTextLink();
        expect.soft(await hyperlink.innerText()).toEqual(expectedValues.multipleWindowsFrameText);

        await hyperlink.click();
        await waitForNumber(() => this.framesAndWindowsLocators.page.context().pages().length, expectedValues.multipleWindowsNumber + 1)
    }
    async openNewFramesetWindow() {
        await this.framesAndWindowsLocators.framesetWindowResponsiveTab().click();
        const hyperlink = this.framesAndWindowsLocators.framesetWindowFrameTextLink();
        expect.soft(await hyperlink.innerText()).toEqual(expectedValues.framesetWindowText);

        await hyperlink.click();
        await this.framesAndWindowsLocators.page.context().waitForEvent('page');
    }
}