import { generateMatchPattern, getNonReplaceableImportStr, getReplaceableImportStr } from "./remove-barrel-import.utils";

export type TImportEntityMap = Record<string, {        
    moduleName: string;
    path: string;
}>;

type TRemoveBarrelParams = {
    fileContent: string;
    barrelPath: string;
    importEntityMap: TImportEntityMap;
}

type TRemoveBarrelResponse = [string, { hasChanged: boolean }];

export const removeBarrelImport = ({ barrelPath, fileContent, importEntityMap }: TRemoveBarrelParams): TRemoveBarrelResponse => {
    let hasChanged = false;
    
    const matchPattern = generateMatchPattern({ barrelPath });
    const updatedContent = fileContent.replace(matchPattern, (matchStr, importStr) => {
        const imports = importStr
            .split(",")
            .map((variable) => variable.trim())
            .filter(Boolean);
        
        const replaceableImports = imports.filter((variable) => !!importEntityMap[variable]);
        const nonReplaceableImports = imports.filter((variable) => !importEntityMap[variable]);

        if (replaceableImports.length === 0) return matchStr;

        hasChanged = true;

        const nonReplaceableImportsStr = getNonReplaceableImportStr({ imports: nonReplaceableImports, barrelPath });
        const replaceableImportsStr = getReplaceableImportStr({ imports: replaceableImports, importEntityMap, barrelPath });

        return [nonReplaceableImportsStr, replaceableImportsStr].join("")
    })

    return [updatedContent, { hasChanged }];
}