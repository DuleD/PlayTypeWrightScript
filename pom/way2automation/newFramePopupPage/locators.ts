import { type Page } from '@playwright/test';

export class Locators{

    //New Tabs
    newPageBody(page: Page){
        return page.locator('body');
    }
    newPageHyperlink(page: Page){
        return this.newPageBody(page).getByRole('link');
    }

    //New Frameset Tabs
    newFramesetTabTopFrame(page: Page){
        return page.frameLocator('frame[name="topFrame"]');
    }
    newFramesetTabContentFrame(page: Page){
        return page.frameLocator('frame[name="contentFrame"]');
    }
    newFramesetTabTopFrameHeading(page: Page){
        return this.newFramesetTabTopFrame(page).getByRole('heading');
    }
    newFramesetTabContentFrameHeading(page: Page){
        return this.newFramesetTabContentFrame(page).getByRole('heading');
    }
    newFramesetTabTopFrameParagraph(page: Page){
        return this.newFramesetTabTopFrame(page).getByRole('paragraph');
    }
    newFramesetTabContentFrameParagraph(page: Page){
        return this.newFramesetTabContentFrame(page).getByRole('paragraph');
    }
    newFramesetTabTopFrameBody(page: Page){
        return this.newFramesetTabTopFrame(page).locator('body');
    }
    newFramesetTabContentFrameBody(page: Page){
        return this.newFramesetTabContentFrame(page).locator('body');
    }
}