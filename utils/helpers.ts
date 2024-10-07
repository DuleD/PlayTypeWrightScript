import { Locator } from '@playwright/test';
interface CSSProperties {
    [property: string]: string;
}
export async function waitForNumber(getValue: () => number, target: number): Promise<void> {
    while (getValue() !== target) {
        await new Promise(resolve => setTimeout(resolve, 100));
    }
}
export async function getLocatorCSS(locator: Locator) : Promise<CSSProperties> {
    const cssProperties = await locator.evaluate((el) => {
        const computedStyles = window.getComputedStyle(el);
        return Object.fromEntries(
            Array.from(computedStyles).map((property) => [property, computedStyles.getPropertyValue(property)]));
    }) as CSSProperties;
    return cssProperties;
}