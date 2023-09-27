import { useMemo } from "react";

export const useOntologyData = (data: any) => {

const ontologyDataSource = useMemo(()=>{
    return data?.map((d:any, index:number) => ({ key: index, ...d }));
}, [data]);

const ontologyColumns = [
  {
    title: 'Ontology',
    dataIndex: 'Ontology',
    key: 'Ontology',
  }
];

  return {  ontologyDataSource,  ontologyColumns };
}