import { useMemo } from "react";

export const useAbnormality = (data: any) => {

const phenotypicAbnormalityDataSource = useMemo(()=>{
    return data?.map((d:any, index:number) => ({ key: index, ...d }));
}, [data]);

const phenotypicAbnormalityColumns = [
  {
    title: 'Phenotypic_Abnormality',
    dataIndex: 'Phenotypic_Abnormality',
    key: 'Phenotypic_Abnormality',
  }
];

  return {  phenotypicAbnormalityDataSource,  phenotypicAbnormalityColumns };
}