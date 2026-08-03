import {test, Page} from '@playwright/test';
import * as fs from "node:fs";
import {join} from "node:path";
import {TestData} from "./utils";

const testData: TestData[] = [
    {
        description: 'tag1',
        url: 'http://www.cuba-hp.de/24Stunden/index.php?code=8f62af03d748cc4d00856f5a84986adb',
        imageHost: 'http://www.cuba-hp.de/24Stunden',
        solutions: ['QE', 'MR']
    },
    {
        description: 'tag2',
        url: 'http://www.cuba-hp.de/24Stunden2/index.php?code=7b0f417c6b09bb2607ea8c254b16af91',
        imageHost: 'http://www.cuba-hp.de/24Stunden2',
        solutions: ['']
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
                const suffix = solution
                    .replace(/ /g, "_")
                    .replace(/[":<>|*?\r\n]/g, "");
                const dataSuffix = `${description}-${suffix}`

                if (solution !== '' && await input.count() > 0) {
                    await input.fill(solution);
                    await takeData(`before-${dataSuffix}`, imageHost, page, true);
                    await page.locator('input[type=submit]').click();
                }
                await takeData(dataSuffix, imageHost, page);
            });
        }
    });
}
