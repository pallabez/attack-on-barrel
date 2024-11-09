type TImportEntity = {
    from: {
        moduleName: string;
    },
    to: {
        moduleName: string;
        path: string;
    }
}

type TRemoveBarrelParams = {
    fileContent: string;
    barrelPath: string;
    importEntities: TImportEntity[];
}

export const removeBarrelImport = ({ barrelPath, fileContent, importEntities }: TRemoveBarrelParams): string => {
    console.log(barrelPath, fileContent, importEntities);
    


    return "";
}