import { type BrowserContext, expect } from '@playwright/test';

export async function newTabCheck(context: BrowserContext){
    const allPages = context.pages();
    expect(allPages.length).toEqual(2);
    const newPage = allPages[1];
    await newPage.waitForLoadState();

    const initialPageInternalDimension = await allPages[0].evaluate(() => [window.innerWidth, window.innerHeight]);
    const newPageInternalDimension = await newPage.evaluate(() => [window.innerWidth, window.innerHeight]);
    expect(initialPageInternalDimension).toEqual(newPageInternalDimension);
    return newPage;
}
export async function newWindowCheck(context: BrowserContext){
    const allPages = context.pages();
    expect(allPages.length).toEqual(2);
    const newPage = allPages[1];
    await newPage.waitForLoadState();

    const initialPageInternalDimension = await allPages[0].evaluate(() => [window.innerWidth, window.innerHeight]);
    const newPageInternalDimension = await newPage.evaluate(() => [window.innerWidth, window.innerHeight]);
    expect(initialPageInternalDimension).not.toEqual(newPageInternalDimension);
    return newPage;
}
export async function multipleNewWindowsCheck(context: BrowserContext, newWindowsNumber: number){
    const allPages = context.pages();
    expect(allPages.length).toEqual(newWindowsNumber + 1);
    const initialPageInternalDimension = await allPages[0].evaluate(() => [window.innerWidth, window.innerHeight]);
    allPages.shift();

    for (const page of allPages){
        const newPageInternalDimension = await page.evaluate(() => [window.innerWidth, window.innerHeight]);
        expect(initialPageInternalDimension).not.toEqual(newPageInternalDimension);
    }
}