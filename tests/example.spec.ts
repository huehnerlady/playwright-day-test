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
        url: 'http://www.cuba-hp.de/24Stunden/index.php?code=d8bc48b4cadefa1c6960f229606faf61',
        imageHost: 'http://www.cuba-hp.de/24Stunden',
        solutions: ['4298', '4296', '4310', '4308']
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
        html = html.replace(/\.\/images/g, `${imageHost}/images`);
        fs.writeFileSync(join(__dirname, `${suffix}.html`), html, {
            flag: 'w',
        });
    }
}


for (const {description, url, solutions, imageHost} of testData) {
    test(description, async ({page}) => {
        await page.goto(url);

        const input = page.locator('input[type=text]');

        if (solutions.length > 0 && await input.count() > 0) {
            for (const solution of solutions) {
                const suffix = solution.replace(/ /g, "_");
                const dataSuffix = `${description}-${suffix}`
                await expect(input).toBeVisible();
                await input.fill(solution);
                await takeData(`${dataSuffix}-before`, imageHost, page, true);
                await page.locator('input[type=submit]').click();
                await takeData(dataSuffix, imageHost, page);
            }
        } else {
            await takeData(description, imageHost, page);
        }
    });
}
