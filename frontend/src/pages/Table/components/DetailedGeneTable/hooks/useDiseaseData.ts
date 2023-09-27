import { useMemo } from "react";

export const useDiseaseData = (data: any) => {
  const diseaseDataSource = useMemo(
    () =>
      data?.flatMap((d: any, index: number) => {
        return d.map((mc: any) => ({ key: index, ...mc }));
      }),
    [data]
  );
  const diseaseColumns = [
    {
      title: "UMLS_CUI",
      dataIndex: "UMLS_CUI",
      key: "UMLS_CUI",
    },
    {
      title: "Disease_Name",
      dataIndex: "Disease_Name",
      key: "Disease_Name",
    },
    {
      title: "MeSH",
      dataIndex: "MeSH",
      key: "MeSH",
    },
    {
      title: "OMIM",
      dataIndex: "OMIM",
      key: "OMIM",
    },
    {
      title: "Semantic_Type",
      dataIndex: "Semantic_Type",
      key: "Semantic_Type",
    },
 
  ];

  return { diseaseDataSource, diseaseColumns };
};
