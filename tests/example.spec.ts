import {test, expect, Page} from '@playwright/test';
import * as fs from "node:fs";
import {join} from "node:path";

type TestData = {
    description: string,
    url: string,
    imageHost: string,
    solutions?: string[]
}

const testData: TestData[] = [
    {
        description: 'tag1',
        url: 'http://www.cuba-hp.de/24Stunden/index.php?code=c01c9b5bbbe9bc9f91bd4b1f21ed4d8b',
        imageHost: 'http://www.cuba-hp.de/24Stunden',
        solutions: ['Trampantojos en El Vendrell', 'El Vendrell']
    },
    {
        description: 'tag2',
        url: 'http://www.cuba-hp.de/24Stunden2/index.php?code=c8fcbdf2a1cd04c0ff86cea65121f08a',
        imageHost: 'http://www.cuba-hp.de/24Stunden2',
        solutions:['Die unendliche Geschichte', 'OLAFS ORTE ODER KINDER']
    }
];

const takeData = async (suffix: string, imageHost: string, page: Page, onlyScreenshot: boolean = false): Promise<void> => {
    await page.screenshot({path: `screenshot-${suffix}.png`, fullPage: true});
    if (!onlyScreenshot) {
        let html = await page.content();
        html = html.replace(/src="/g, `src="${imageHost}/`);
        fs.writeFileSync(join(__dirname, `${suffix}.html`), html, {
            flag: 'w',
        });
    }
}


for (const {description, url, solutions, imageHost} of testData) {
    test.describe(description, () => {
        for (const solution of solutions) {
            test(solution, async ({page}) => {
                await page.goto(url);
                const input = page.locator('input[type=text]');
                const suffix = solution.replace(/ /g, "_");
                const dataSuffix = `${description}-${suffix}`

                if (solution !== '' && await input.count() > 0) {
                    await input.fill(solution);
                    await takeData(`${dataSuffix}-before`, imageHost, page, true);
                    await page.locator('input[type=submit]').click();
                }
                await takeData(dataSuffix, imageHost, page);
            });
        }
    });
}
