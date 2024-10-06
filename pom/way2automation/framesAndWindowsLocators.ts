import { type Page } from '@playwright/test';

export class FramesAndWindowsLocators{
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    //Responsive Tabs
    responsiveTabs(){
        return this.page.locator('.responsive-tabs');
    }
    separateNewWindowResponsiveTab(){
        return this.responsiveTabs().getByText('Open Seprate New Window');
    }
    multipleWindowsResponsiveTab(){
        return this.responsiveTabs().getByText('Open Multiple Windows');
    }
    framesetWindowResponsiveTab(){
        return this.responsiveTabs().getByText('Frameset');
    }

    //Frames
    newWindowFrame(){
        return this.page.frameLocator('#example-1-tab-1 iframe');
    }
    separateNewWindowFrame(){
        return this.page.frameLocator('#example-1-tab-2 iframe');
    }
    framesetWindowFrame(){
        return this.page.frameLocator('#example-1-tab-3 iframe');
    }
    multipleWindowsFrame(){
        return this.page.frameLocator('#example-1-tab-4 iframe');
    }
    newWindowFrameTextLink(){
        return this.newWindowFrame().getByRole('link');
    }
    separateNewWindowFrameTextLink(){
        return this.separateNewWindowFrame().getByRole('link');
    }
    framesetWindowFrameTextLink(){
        return this.framesetWindowFrame().getByRole('link');
    }
    multipleWindowsFrameTextLink(){
        return this.multipleWindowsFrame().getByRole('link');
    }

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