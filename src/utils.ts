import { TImportEntityMap } from "./remove-barrel-import/remove-barrel-import";

export const getEntityMap = (entities: Record<string, string>): TImportEntityMap => {
    const entityMap: TImportEntityMap = {};

    for (const [key, value] of Object.entries(entities)) {
        entityMap[key] = {
            moduleName: key,
            path: value,
        }
    }

    return entityMap;
}