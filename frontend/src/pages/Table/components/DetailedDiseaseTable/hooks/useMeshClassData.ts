import { useMemo } from "react";

export const useMeshClassData = (data: any) => {

const meshClassDataSource = useMemo(()=>{
    return data?.map((d:any, index:number) => ({ key: index, ...d }));
}, [data]);

const meshClassColumns = [
  {
    title: 'MeSH_Class',
    dataIndex: 'MeSH_Class',
    key: 'MeSH_Class',
  }
];

  return { meshClassDataSource, meshClassColumns };
}