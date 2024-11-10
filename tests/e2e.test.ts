import { readFileSync } from 'fs';
import { execSync } from "child_process"

const PLAYGROUND_PATH = "/tests/playground"
const FIXTURES_PATH = "/tests/fixtures"

describe("attack on barrel", () => {
  describe("non-replaceable", () => {
    it ("should not replace the barrel import if it is not replaceable", () => {
      // Assemble
      execSync('npm run set', { stdio: 'inherit' })

      // Act
      execSync('npm run attack', { stdio: 'inherit' })

      // Assert
      const playgroundContent = readFileSync(`${PLAYGROUND_PATH}/replaceability-replaceable`, "utf-8");
      const fixtureContent = readFileSync(`${FIXTURES_PATH}/replaceability-replaceable`, "utf-8");

      expect(playgroundContent).not.toBe(fixtureContent)
    })
  })
})
