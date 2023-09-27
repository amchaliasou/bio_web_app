import { DownOutlined, PlusOutlined, UpOutlined } from "@ant-design/icons";
import { Button, Card, Table  } from "antd";
import AddGene from "components/AddGene";
import { observer } from "mobx-react";
import React, { useCallback } from "react";
import { useNavigate } from "react-router";
import { useStores } from "stores/rootStore";
import DetailedDiseaseTable from "./components/DetailedDiseaseTable";
import DetailedGeneTable from "./components/DetailedGeneTable";
import { useDataSource } from "./hooks/useDataSource";
import "./index.css";

const DataTable: React.FC = observer(() => {
  const { columns, dataSource } = useDataSource();
  const { functionalityStore, authenticationStore, geneStore } = useStores();
  const navigate = useNavigate();
  const table = useCallback(() => {
    return (
      <Table
        columns={columns as any[]}
        dataSource={dataSource as any[]}
        bordered
        rowKey={(record) =>
          functionalityStore.searchParam === "Disease"
            ? record.UMLS_CUI
            : record.Entrez_ID
        }
        className="table"
        expandable={{
          expandedRowRender: (record) =>
            functionalityStore.searchParam === "Disease" ? (
              <DetailedDiseaseTable data={record} />
            ) : (
              <DetailedGeneTable data={record} />
            ),
          expandIcon: ({ expanded, onExpand, record }) =>
            expanded ? (
              <UpOutlined onClick={(e: any) => onExpand(record, e)} />
            ) : (
              <DownOutlined onClick={(e: any) => onExpand(record, e)} />
            ),
        }}
      />
    );
  }, [
    dataSource,
    authenticationStore.isAuthenticated,
    functionalityStore.shouldUpdate,
  ]);

  const handleGeneModal = () => {
    geneStore.setEditGene(null);
    geneStore.toggleEditModal(true);
  };
  return (
    <div className="data-table-wrapper">
      {functionalityStore.searchParam ? (
        <Card
          title={`${functionalityStore.searchParam} Entries`}
          className="data-table"
          bordered
        >
          {authenticationStore.isAuthenticated && (
            <div className="actions">
              <div>
                <Button
                  style={{ backgroundColor: "#72a5b4" }}
                  type="primary"
                  shape="circle"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    functionalityStore.searchParam === "Disease"
                      ? navigate(`/insert-disease`)
                      : handleGeneModal();
                  }}
                />
              </div>
            </div>
          )}
          {table()}
        </Card>
      ) : (
        <div className="no-search-param">
          <h1>Please select one data category from the drop-down list in the search bar to browse or interact with it</h1>
        </div>
      )}
      <AddGene
        isModalOpen={geneStore.openEditModal}
        handleOk={() => geneStore.toggleEditModal(false)}
        handleCancel={() => geneStore.toggleEditModal(false)}
      />
    </div>
  );
});

export default DataTable;
