type TImportEntity = {
    from: {
        moduleName: string;
        path: string;
    },
    to: {
        moduleName: string;
        path: string;
    }
}

type TReplacerParams = {
    fileContent: string;
    importEntities: TImportEntity[];
}

export const replacer = ({ fileContent, importEntities }: TReplacerParams): string => {
    console.log(fileContent, importEntities);
    return "";
}