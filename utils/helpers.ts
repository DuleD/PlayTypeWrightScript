import { Locator } from '@playwright/test';
export async function waitForNumber(getValue: () => number, target: number): Promise<void> {
    while (getValue() !== target) {
        await new Promise(resolve => setTimeout(resolve, 100));
    }
}
export async function getElementCSS(locator: Locator) : Promise<CSSStyleDeclaration> {
    return locator.evaluate((element) => window.getComputedStyle(element));
}