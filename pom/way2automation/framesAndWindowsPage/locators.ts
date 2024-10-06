import { type Page } from '@playwright/test';

export class Locators{
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
}