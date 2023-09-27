import { Table } from "antd";
import React, { useLayoutEffect } from "react";
import bioService from "services/bioService";
import { useAbnormality } from "./hooks/useAbnormality";
import { useGeneDiseaseAssocData } from "./hooks/useGeneDiseaseAssocData";
import { useMeshClassData } from "./hooks/useMeshClassData";
import { useOntologyData } from "./hooks/useOntologyData";
interface DetailedTableProps {
  data: any;
}
const DetailedDiseaseTable: React.FC<DetailedTableProps> = ({
  data,
}: DetailedTableProps) => {
  const [details, setDetails] = React.useState<any>();

  useLayoutEffect(() => {
    bioService.getDiseaseDetails(data.UMLS_CUI).then((res) => {
      setDetails(res);
    });
  }, [data]);
  const { geneAssocDataSource, geneAssocColumns } = useGeneDiseaseAssocData(
    details?.gene_associated
  );
  const { meshClassDataSource, meshClassColumns } = useMeshClassData(
    details?.mesh_class
  );
  const { ontologyDataSource, ontologyColumns } = useOntologyData(
    details?.ontology
  );
  const { phenotypicAbnormalityDataSource, phenotypicAbnormalityColumns } =
    useAbnormality(details?.phenotypic_abnormality);
  return (
    <div>
      <Table dataSource={meshClassDataSource} columns={meshClassColumns} />
      <Table dataSource={ontologyDataSource} columns={ontologyColumns} />
      <Table
        dataSource={phenotypicAbnormalityDataSource}
        columns={phenotypicAbnormalityColumns}
      />
      <h2>Genes Associated</h2>
      <Table dataSource={geneAssocDataSource} columns={geneAssocColumns} />
    </div>
  );
};

export default DetailedDiseaseTable;
