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
        url: 'https://www.cuba-hp.de/24Stunden/index.php?code=a25835f70eec26d389dbb12a75a4f13c',
        imageHost: 'http://www.cuba-hp.de/24Stunden',
        solutions: ['']
    },
    {
        description: 'tag2',
        url: 'http://www.cuba-hp.de/24Stunden2/index.php?code=d8456656c41b0c0b24a6527a0608d832',
        imageHost: 'http://www.cuba-hp.de/24Stunden2',
        solutions: ['489', '434']
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

                if (solution !== '' && await input.count() > 0) {
                    const suffix = solution.replace(/ /g, "_");
                    const dataSuffix = `${description}-${suffix}`
                    await expect(input).toBeVisible();
                    await input.fill(solution);
                    await takeData(`${dataSuffix}-before`, imageHost, page, true);
                    await page.locator('input[type=submit]').click();
                }
                await takeData(description, imageHost, page);
            });
        }
    });
}
