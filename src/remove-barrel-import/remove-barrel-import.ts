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
    console.log(barrelPath, fileContent, importEntityMap);

    return ["", { hasChanged: true }];
}