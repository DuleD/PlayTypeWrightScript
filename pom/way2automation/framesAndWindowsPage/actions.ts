import { Locators } from './locators';

export class Actions{
    readonly framesAndWindowsPage: Locators;
    constructor(framesAndWindowsPage: Locators) {
        this.framesAndWindowsPage = framesAndWindowsPage;
    }

    async goTo() {
        await this.framesAndWindowsPage.page.goto('https://www.way2automation.com/way2auto_jquery/frames-and-windows.php#load_box');
    }
}