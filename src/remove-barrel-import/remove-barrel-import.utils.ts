import { TImportEntityMap } from "./remove-barrel-import";

type TGenerateMatchPatternParams = {
    barrelPath: string;
}

export const generateMatchPattern = ({ barrelPath }: TGenerateMatchPatternParams): RegExp => {
    // Escape special characters in barrelPath for use in a regex pattern
    const escapedBarrelPath = barrelPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Construct the regex pattern string using the escaped barrelPath
    const patternString = `import\\s*{\\s*([^}]+?)\\s*}\\s*from\\s*["']${escapedBarrelPath}["'];?`;

    // Return the dynamically constructed regex pattern
    return new RegExp(patternString, 'gs');
}

export const getNonReplaceableImportStr = ({ imports }: { imports: string[] }) => {
    if (!imports.length) return "";

    return `import { ${imports.join(", ")} } from "@/components/base";\n`;
}

type TGetReplaceableImportStrParams = {
    imports: string[];
    importEntityMap: TImportEntityMap;
    barrelPath: string;
}

export const getReplaceableImportStr = ({ imports, importEntityMap, barrelPath }: TGetReplaceableImportStrParams) => {
    if (!imports.length) return "";

    return imports
        .map((variable) => {
            const { moduleName, path } = importEntityMap[variable];
            return `import { ${moduleName} } from "${barrelPath}${path}";`;
        })
        .join("\n");
}