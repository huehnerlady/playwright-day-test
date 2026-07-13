import {test, expect} from '@playwright/test';
import * as fs from "node:fs";
import {join} from "node:path";

const testData = [
    {
        description: 'tag1',
        url: 'https://www.cuba-hp.de/24Stunden/index.php?code=1745320a71260ce686262f6d056f2b04',
        imageHost: 'http://www.cuba-hp.de/24Stunden',
        solution: ''
    },
    {
        description: 'tag2',
        url: 'http://www.cuba-hp.de/24Stunden2/index.php?code=d8456656c41b0c0b24a6527a0608d832',
        imageHost: 'http://www.cuba-hp.de/24Stunden2',
        solution: ''
    },
    // {
    //     description: 'tag3',
    //     url: 'https://www.cuba-hp.de/24Stunden3/index.php?code=bfb93b6dfcb468756e479beb490040ff2616',
    //     imageHost: 'http://www.cuba-hp.de/24Stunden3',
    //     solution: 'Rom Kairo Paris Wien Madrid San Francisco Sydney Montreal'
    // },
];

for  (const {description, url, solution, imageHost} of testData) {
    test(description, async ({page}) => {
        await page.goto(url);

        const input = page.locator('input[type=text]');

        if (solution !== '' && await input.count() > 0) {
            await expect(input).toBeVisible();
            await input.fill(solution);
            await page.locator('input[type=submit]').click();
        }
        
        await page.screenshot({path: `screenshot-${description}.png`, fullPage: true});
        let html = await page.content();
        html = html.replace(/\.\/images/g, `${imageHost}/images`);
        fs.writeFileSync(join(__dirname, `${description}.html`), html, {
            flag: 'w',
        });
    });
}

