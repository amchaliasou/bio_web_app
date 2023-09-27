import { DeleteTwoTone, EditTwoTone, LockOutlined } from "@ant-design/icons";
import { Popconfirm, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import bioService from "services/bioService";
import { GENE } from "services/bioService/dto";
import { useStores } from "stores/rootStore";

export const useGeneColumns = () => {
  const navigate = useNavigate();
  const { authenticationStore, functionalityStore, geneStore } = useStores();

  const geneColumns: ColumnsType<GENE> = [
    {
      title: "Entrez_ID",
      dataIndex: "Entrez_ID",
    },
    {
      title: "Gene_Symbol",
      dataIndex: "Gene_Symbol",
    },
    {
      title: "Uniprot_Accession",
      dataIndex: "Uniprot_Accession",
    },
    {
      title: "Full_Name",
      dataIndex: "Full_Name",
    },
    {
      title: "Protein_Class",
      dataIndex: "Protein_Class",
    },
    {
      title: "DPI",
      dataIndex: "DPI",
    },
    {
      title: "DSI",
      dataIndex: "DSI",
    },
    {
      title: "pLi",
      dataIndex: "pLi",
    },
    {
      title: "Actions",
      dataIndex: "operation",
      render(value, record, index) {
        return (
          <div className="table-row-actions">
            {authenticationStore.isAuthenticated ? (
              <>
                <Tooltip title="Edit">
                  <EditTwoTone
                    onClick={() => {
                      geneStore.setEditGene(record);
                      geneStore.toggleEditModal(true);
                    }}
                  />
                </Tooltip>
                <Popconfirm
                  title="Are you sure you want to delete this entry?"
                  onConfirm={() => {
                    bioService.deleteGene(record.Entrez_ID).then(() => {
                      functionalityStore.toggleShouldUpdate();
                    });
                  }}
                >
                  <Tooltip title="Delete">
                    <DeleteTwoTone twoToneColor="gray" />
                  </Tooltip>
                </Popconfirm>
              </>
            ) : (
              <>
                <Tooltip title="Actions are locked for guest users">
                  <LockOutlined />
                </Tooltip>
              </>
            )}
          </div>
        );
      },
    },
  ];

  return { geneColumns };
};
