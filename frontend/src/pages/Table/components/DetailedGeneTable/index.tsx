import { Descriptions, Table } from "antd";
import React, { useLayoutEffect, useMemo } from "react";
import bioService from "services/bioService";
import { useDiseaseData } from "./hooks/useDiseaseData";
import { useGeneDiseaseAssocData } from "./hooks/useGeneDiseaseAssocData";
interface DetailedTableProps {
  data: any;
}
const DetailedGeneTable: React.FC<DetailedTableProps> = ({
  data,
}: DetailedTableProps) => {
  const [details, setDetails] = React.useState<any>();

  useLayoutEffect(() => {
    bioService.getGeneById(data.Entrez_ID).then((res) => {
      setDetails(res);
    });
  }, [data]);

  const { diseaseDataSource, diseaseColumns } = useDiseaseData(
    details?.diseases
  );
  const { geneAssocDataSource, geneAssocColumns } = useGeneDiseaseAssocData(
    details?.gene_disease_assoc
  );

  return (
    <div>
      <h2>Associations with Diseases</h2>
      <Table dataSource={geneAssocDataSource} columns={geneAssocColumns} />
      <h2>Diseases Associated</h2>
      <Table dataSource={diseaseDataSource} columns={diseaseColumns} />
    </div>
  );
};

export default DetailedGeneTable;
