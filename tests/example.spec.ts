import {test, Page} from '@playwright/test';
import * as fs from "node:fs";
import {join} from "node:path";

type TestData = {
    description: string,
    url: string,
    imageHost: string,
    solutions?: string[]
}

const generateTestData = (): string[] => {
    const values = ['B', 'M', 'T']
    let solutions: string[] = [];
    for (const first of values) {
        for (const second of values) {
            for (const third of values) {
                solutions.push(`LKS${first}LD${second}KB${third}BNH`)
            }
        }
    }
    return solutions;
}

const generateAllPermutations = (letters: string[]): string[] => {
    // Frequenzmap erzeugen
    const freq: Record<string, number> = {};
    for (const l of letters) {
        freq[l] = (freq[l] ?? 0) + 1;
    }

    const result: string[] = [];
    const current: string[] = [];
    const totalLength = letters.length;

    const backtrack = () => {
        if (current.length === totalLength) {
            result.push(current.join(""));
            return;
        }

        for (const letter of Object.keys(freq)) {
            if (freq[letter] > 0) {
                freq[letter]--;
                current.push(letter);

                backtrack();

                current.pop();
                freq[letter]++;
            }
        }
    };

    backtrack();
    return result;
};

const letters = ['B','B','B','D','D','H','K','K','L','L','M','N','S','T'];

const testData: TestData[] = [
    {
        description: 'tag1',
        url: 'http://www.cuba-hp.de/24Stunden/index.php?code=612da6eadc5adfe4ab27f25fa7780f7b',
        imageHost: 'http://www.cuba-hp.de/24Stunden',
        solutions: generateAllPermutations(letters)
    },
    {
        description: 'tag2',
        url: 'http://www.cuba-hp.de/24Stunden2/index.php?code=f7bcfdbf4059374fe5054e0f8f591c90',
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
                    await takeData(`${dataSuffix}-before`, imageHost, page, true);
                    await page.locator('input[type=submit]').click();
                }
                await takeData(dataSuffix, imageHost, page);
            });
        }
    });
}
