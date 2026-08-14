import {test, Page} from '@playwright/test';
import * as fs from "node:fs";
import {join} from "node:path";
import {TestData} from "./utils";

const testData: TestData[] = [
    {
        description: 'tag2',
        url: 'https://www.cuba-hp.de/24Stunden2/index.php?code=f21ac9f3543765f2acbedb493d2fafa9',
        imageHost: 'http://www.cuba-hp.de/24Stunden2',
        solutions: [
  "BAAWS","BABWS","BACWS","BADWS","BAEWS","BAFWS","BAGWS","BAHWS","BAIWS","BAJWS","BAKWS","BALWS","BAMWS","BANWS","BAOWS","BAPWS","BAQWS","BARWS","BASWS","BATWS","BAUWS","BAVWS","BAWWS","BAXWS","BAYWS","BAZWS",
  "BBAWS","BBBWS","BBCWS","BBDWS","BBEWS","BBFWS","BBGWS","BBHWS","BBIWS","BBJWS","BBKWS","BBLWS","BBMWS","BBNWS","BBOWS","BBPWS","BBQWS","BBRWS","BBSWS","BBTWS","BBUWS","BBVWS","BBWWS","BBXWS","BBYWS","BBZWS",
  "BCAWS","BCBWS","BCCWS","BCDWS","BCEWS","BCFWS","BCGWS","BCHWS","BCIWS","BCJWS","BCKWS","BCLWS","BCMWS","BCNWS","BCOWS","BCPWS","BCQWS","BCRWS","BCSWS","BCTWS","BCUWS","BCVWS","BCWWS","BCXWS","BCYWS","BCZWS",
  "BDAWS","BDBWS","BDCWS","BDDWS","BDEWS","BDFWS","BDGWS","BDHWS","BDIWS","BDJWS","BDKWS","BDLWS","BDMWS","BDNWS","BDOWS","BDPWS","BDQWS","BDRWS","BDSWS","BDTWS","BDUWS","BDVWS","BDWWS","BDXWS","BDYWS","BDZWS",
  "BEAWS","BEBWS","BECWS","BEDWS","BEEWS","BEFWS","BEGWS","BEHWS","BEIWS","BEJWS","BEKWS","BELWS","BEMWS","BENWS","BEOWS","BEPWS","BEQWS","BERWS","BESWS","BETWS","BEUWS","BEVWS","BEWWS","BEXWS","BEYWS","BEZWS",
  "BFAWS","BFBWS","BFCWS","BFDWS","BFEWS","BFFWS","BFGWS","BFHWS","BFIWS","BFJWS","BFKWS","BFLWS","BFMWS","BFNWS","BFOWS","BFPWS","BFQWS","BFRWS","BFSWS","BFTWS","BFUWS","BFVWS","BFWWS","BFXWS","BFYWS","BFZWS",
  "BGAWS","BGBWS","BGCWS","BGDWS","BGEWS","BGFWS","BGGWS","BGHWS","BGIWS","BGJWS","BGKWS","BGLWS","BGMWS","BGNWS","BGOWS","BGPWS","BGQWS","BGRWS","BGSWS","BGTWS","BGUWS","BGVWS","BGWWS","BGXWS","BGYWS","BGZWS",
  "BHAWS","BHBWS","BHCWS","BHDWS","BHEWS","BHFWS","BHGWS","BHHWS","BHIWS","BHJWS","BHKWS","BHLWS","BHMWS","BHNWS","BHOWS","BHPWS","BHQWS","BHRWS","BHSWS","BHTWS","BHUWS","BHVWS","BHWWS","BHXWS","BHYWS","BHZWS",
  "BIAWS","BIBWS","BICWS","BIDWS","BIEWS","BIFWS","BIGWS","BIHWS","BIIWS","BIJWS","BIKWS","BILWS","BIMWS","BINWS","BIOWS","BIPWS","BIQWS","BIRWS","BISWS","BITWS","BIUWS","BIVWS","BIWWS","BIXWS","BIYWS","BIZWS",
  "BJAWS","BJBWS","BJCWS","BJDWS","BJEWS","BJFWS","BJGWS","BJHWS","BJIWS","BJJWS","BJKWS","BJLWS","BJMWS","BJNWS","BJOWS","BJPWS","BJQWS","BJRWS","BJSWS","BJTWS","BJUWS","BJVWS","BJWWS","BJXWS","BJYWS","BJZWS",
  "BKAWS","BKBWS","BKCWS","BKDWS","BKEWS","BKFWS","BKGWS","BKHWS","BKIWS","BKJWS","BKKWS","BKLWS","BKMWS","BKNWS","BKOWS","BKPWS","BKQWS","BKRWS","BKSWS","BKTWS","BKUWS","BKVWS","BKWWS","BKXWS","BKYWS","BKZWS",
  "BLAWS","BLBWS","BLCWS","BLDWS","BLEWS","BLFWS","BLGWS","BLHWS","BLIWS","BLJWS","BLKWS","BLLWS","BLMWS","BLNWS","BLOWS","BLPWS","BLQWS","BLRWS","BLSWS","BLTWS","BLUWS","BLVWS","BLWWS","BLXWS","BLYWS","BLZWS",
  "BMAWS","BMBWS","BMCWS","BMDWS","BMEWS","BMFWS","BMGWS","BMHWS","BMIWS","BMJWS","BMKWS","BMLWS","BMMWS","BMNWS","BMOWS","BMPWS","BMQWS","BMRWS","BMSWS","BMTWS","BMUWS","BMVWS","BMWWS","BMXWS","BMYWS","BMZWS",
  "BNAWS","BNBWS","BNCWS","BNDWS","BNEWS","BNFWS","BNGWS","BNHWS","BNIWS","BNJWS","BNKWS","BNLWS","BNMWS","BNNWS","BNOWS","BNPWS","BNQWS","BNRWS","BNSWS","BNTWS","BNUWS","BNVWS","BNWWS","BNXWS","BNYWS","BNZWS",
  "BOAWS","BOBWS","BOCWS","BODWS","BOEWS","BOFWS","BOGWS","BOHWS","BOIWS","BOJWS","BOKWS","BOLWS","BOMWS","BONWS","BOOWS","BOPWS","BOQWS","BORWS","BOSWS","BOTWS","BOUWS","BOVWS","BOWWS","BOXWS","BOYWS","BOZWS",
  "BPAWS","BPBWS","BPCWS","BPDWS","BPEWS","BPFWS","BPGWS","BPHWS","BPIWS","BPJWS","BPKWS","BPLWS","BPMWS","BPNWS","BPOWS","BPPWS","BPQWS","BPRWS","BPSWS","BPTWS","BPUWS","BPVWS","BPWWS","BPXWS","BPYWS","BPZWS",
  "BQAWS","BQBWS","BQCWS","BQDWS","BQEWS","BQFWS","BQGWS","BQHWS","BQIWS","BQJWS","BQKWS","BQLWS","BQMWS","BQNWS","BQOWS","BQPWS","BQQWS","BQRWS","BQSWS","BQTWS","BQUWS","BQVWS","BQWWS","BQXWS","BQYWS","BQZWS",
  "BRAWS","BRBWS","BRCWS","BRDWS","BREWS","BRFWS","BRGWS","BRHWS","BRIWS","BRJWS","BRKWS","BRLWS","BRMWS","BRNWS","BROWS","BRPWS","BRQWS","BRRWS","BRSWS","BRTWS","BRUWS","BRVWS","BRWWS","BRXWS","BRYWS","BRZWS",
  "BSAWS","BSBWS","BSCWS","BSDWS","BSEWS","BSFWS","BSGWS","BSHWS","BSIWS","BSJWS","BSKWS","BSLWS","BSMWS","BSNWS","BSOWS","BSPWS","BSQWS","BSRWS","BSSWS","BSTWS","BSUWS","BSVWS","BSWWS","BSXWS","BSYWS","BSZWS",
  "BTAWS","BTBWS","BTCWS","BTDWS","BTEWS","BTFWS","BTGWS","BTHWS","BTIWS","BTJWS","BTKWS","BTLWS","BTMWS","BTNWS","BTOWS","BTPWS","BTQWS","BTRWS","BTSWS","BTTWS","BTUWS","BTVWS","BTWWS","BTXWS","BTYWS","BTZWS",
  "BUAWS","BUBWS","BUCWS","BUDWS","BUEWS","BUFWS","BUGWS","BUHWS","BUIWS","BUJWS","BUKWS","BULWS","BUMWS","BUNWS","BUOWS","BUPWS","BUQWS","BURWS","BUSWS","BUTWS","BUUWS","BUVWS","BUWWS","BUXWS","BUYWS","BUZWS",
  "BVAWS","BVBWS","BVCWS","BVDWS","BVEWS","BVFWS","BVGWS","BVHWS","BVIWS","BVJWS","BVKWS","BVLWS","BVMWS","BVNWS","BVOWS","BVPWS","BVQWS","BVRWS","BVSWS","BVTWS","BVUWS","BVVWS","BVWWS","BVXWS","BVYWS","BVZWS",
  "BWAWS","BWBWS","BWCWS","BWDWS","BWEWS","BWFWS","BWGWS","BWHWS","BWIWS","BWJWS","BWKWS","BWLWS","BWMWS","BWNWS","BWOWS","BWPWS","BWQWS","BWRWS","BWSWS","BWTWS","BWUWS","BWVWS","BWWWS","BWXWS","BWYWS","BWZWS",
  "BXAWS","BXBWS","BXCWS","BXDWS","BXEWS","BXFWS","BXGWS","BXHWS","BXIWS","BXJWS","BXKWS","BXLWS","BXMWS","BXNWS","BXOWS","BXPWS","BXQWS","BXRWS","BXSWS","BXTWS","BXUWS","BXVWS","BXWWS","BXXWS","BXYWS","BXZWS",
  "BYAWS","BYBWS","BYCWS","BYDWS","BYEWS","BYFWS","BYGWS","BYHWS","BYIWS","BYJWS","BYKWS","BYLWS","BYMWS","BYNWS","BYOWS","BYPWS","BYQWS","BYRWS","BYSWS","BYTWS","BYUWS","BYVWS","BYWWS","BYXWS","BYYWS","BYZWS",
  "BZAWS","BZBWS","BZCWS","BZDWS","BZEWS","BZFWS","BZGWS","BZHWS","BZIWS","BZJWS","BZKWS","BZLWS","BZMWS","BZNWS","BZOWS","BZPWS","BZQWS","BZRWS","BZSWS","BZTWS","BZUWS","BZVWS","BZWWS","BZXWS","BZYWS","BZZWS"
]
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
