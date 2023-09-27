import { useMemo } from "react";

export const useGeneDiseaseAssocData = (data: any) => {

const geneAssocDataSource = useMemo(()=>{
    return data?.map((d:any, index:number) => ({ key: index, ...d }));
}, [data]);

const geneAssocColumns = [
  {
    title: 'Association Type',
    dataIndex: 'Association_Type',
    key: 'Association_Type',
  },
  {
    title: 'PMID',
    dataIndex: 'PMID',
    key: 'PMID',
  },
  {
    title: 'PMID Year',
    dataIndex: 'PMID_Year',
    key: 'PMID_Year',
  },
  {
    title: 'Score',
    dataIndex: 'Score',
    key: 'Score',
  },
  {
    title: 'UMLS CUI',
    dataIndex: 'UMLS_CUI',
    key: 'UMLS_CUI',
  },
];

  return { geneAssocDataSource, geneAssocColumns };
}