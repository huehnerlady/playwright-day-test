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

test('tag1-for', async ({page}) => {
    test.setTimeout(1200000);
    const testData: TestData = {
        description: '',
        url: 'http://www.cuba-hp.de/24Stunden/index.php?code=d8bc48b4cadefa1c6960f229606faf61',
        imageHost: 'http://www.cuba-hp.de/24Stunden',
    }
    const {url, imageHost} = testData;
    await page.goto(url);

    const A = 1;
    const input = page.locator('input[type=text]');
    if (await input.count() > 0) {
        for (let B = 1; B <= 9; B++) {
            for (let C = 1; C <= 9; C++) {
                for (let D = 1; D <= 9; D++) {
                    for (let E = 1; E <= 9; E++) {
                        for (let F = 1; F <= 9; F++) {
                            await page.goto(url);
                            const solution = (D + F) * 360 - (E * B) / A - C
                            await input.fill(`${solution}`);
                            await page.locator('input[type=submit]').click();

                            const fail = page.getByText('Leider die falsche Antwort!')
                            if (await fail.count() > 0) {
                                console.log(`tag1-for-${solution} wrong`)
                            } else {
                                console.log(`tag1-for-${solution} correct`)
                                await takeData(`tag1-for-${solution}`, imageHost, page);
                            }
                        }
                    }
                }
            }
        }
    } else {
        await takeData(`tag1-for-no-textfield`, imageHost, page);
    }
})

