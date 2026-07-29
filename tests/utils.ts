export type TestData = {
    description: string,
    url: string,
    imageHost: string,
    solutions?: string[]
}

export const generateTestDataForRange = (): string[] => {
    const values = ['B', 'T']
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

// TODO
const generateTestDataAlphabet = (positions: number[], initialString: string): string[] => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split("");
    let solutions: string[] = [];
    let string = initialString.split("");
    for (const position of positions) {
        for (const letter of letters) {
            string[position] = letter;
            solutions.push(string.join(""));
        }
    }
    return solutions;
}
