import { glob } from "glob";
import { readFileSync, writeFileSync } from "fs"

import { REPLACE_MAP } from "./constants";
import { removeBarrelImport } from "./remove-barrel-import/remove-barrel-import";
import { getEntityMap } from "./utils";
import { CONFIG } from "./config";

const replaceBarrelFiles = async () => {
    const filePaths = await glob(CONFIG.DIRECTORY_MATCH);

    for (const filePath of filePaths) {
        let fileContent = readFileSync(filePath, "utf-8");
        let hasChanged = false;

        for (const replaceMap of REPLACE_MAP) {
            const importEntityMap = getEntityMap(replaceMap.map);

            const [currFileContent, currHasChanged] = removeBarrelImport({
                barrelPath: replaceMap.barrelPath,
                fileContent,
                importEntityMap,
            });

            fileContent = currFileContent;
            if (currHasChanged) hasChanged = true;
        }


        if (hasChanged) {
            console.log("Updated: ", filePath);
            writeFileSync(filePath, fileContent);
        }
    }
}

replaceBarrelFiles();