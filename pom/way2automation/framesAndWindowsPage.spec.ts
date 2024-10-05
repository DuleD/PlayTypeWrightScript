import { expect, type BrowserContext, type Page } from '@playwright/test';

export class FramesAndWindowsPage{
    readonly page: Page;
    readonly newWindowExpectedText: string;
    readonly separateNewWindowExpectedText: string;
    readonly multipleWindowsExpectedFrameText: string;
    readonly multipleWindowsExpectedValues: string[];
    constructor(page: Page) {
        this.page = page;
        this.newWindowExpectedText = 'New Browser Tab';
        this.separateNewWindowExpectedText = 'Open New Seprate Window'
        this.multipleWindowsExpectedFrameText = 'Open multiple pages'
        this.multipleWindowsExpectedValues = ['Open Window-1', 'Open Window-2', 'Open Window-3'];
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

    //Methods
    async goTo() {
        await this.page.goto('https://www.way2automation.com/way2auto_jquery/frames-and-windows.php#load_box');
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
            const textContent = await this.newPageHyperlink(page).innerText();
            const containsValue = this.multipleWindowsExpectedValues.some(value => textContent.includes(value));
            expect(containsValue).toBeTruthy();
        }
    }

}