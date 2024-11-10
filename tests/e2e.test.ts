import { readFileSync } from 'fs';
import { execSync } from "child_process"
import { glob } from 'glob';
import { REPLACE_MAP } from '@/constants';

const PLAYGROUND_PATH = 'tests/playground';

describe("attack on barrel", () => {
  beforeAll(() => {
    // Assemble
    execSync('npm run set', { stdio: 'inherit' })

    // TODO: Mock not working
    jest.spyOn(console, 'log').mockImplementation(() => {});

    // Act
    execSync('npm run attack', { stdio: 'inherit' })
  })

  describe("non-replaceable", () => {
    it ("should not replace the barrel import if it is not replaceable", async () => {
      const filePaths = await glob(`${PLAYGROUND_PATH}/replaceability-non-replaceable/**/*.ts`);

      expect(filePaths.length).not.toBe(0)
      for (const filePath of filePaths) {
        const playgroundContent = readFileSync(filePath, 'utf-8');
        const fixtureContent = readFileSync(filePath.replace("/playground", "/fixtures") , 'utf-8');

        expect(playgroundContent).toBe(fixtureContent)
      }
    })
  })

  describe("replaceable", () => {
    it ("should replace the barrel import if it is replaceable", async () => {
      const filePaths = await glob(`${PLAYGROUND_PATH}/replaceability-replaceable/**/*.ts`);

      expect(filePaths.length).not.toBe(0)
      for (const filePath of filePaths) {
        const playgroundContent = readFileSync(filePath, 'utf-8');

        expect(playgroundContent).not.toContain(`${REPLACE_MAP[0].barrelPath};`)
        expect(playgroundContent).toContain(`${REPLACE_MAP[0].barrelPath}/`)
      }
    })
  })
})
