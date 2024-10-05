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

    //Frames
    newWindowFrame(){
        return this.page.frameLocator('#example-1-tab-1 iframe');
    }
    separateNewWindowFrame(){
        return this.page.frameLocator('#example-1-tab-2 iframe');
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

}