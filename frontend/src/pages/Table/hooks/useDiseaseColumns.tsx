import { DeleteTwoTone, EditTwoTone, LockOutlined } from "@ant-design/icons";
import { Popconfirm, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import bioService from "services/bioService";
import { DISEASE } from "services/bioService/dto";

import { useNavigate } from "react-router-dom";
import { useStores } from "stores/rootStore";
export const useDiseaseColumns = () => {
  const { authenticationStore, functionalityStore } = useStores();
  const navigate = useNavigate();

  const diseaseColumns: ColumnsType<DISEASE> = [
    {
      title: "UMLS_CUI",
      dataIndex: "UMLS_CUI",
    },
    {
      title: "Disease_Name",
      dataIndex: "Disease_Name",
    },
    {
      title: "MeSH",
      dataIndex: "MeSH",
    },
    {
      title: "OMIM",
      dataIndex: "OMIM",
    },
    {
      title: "Semantic_Type",
      dataIndex: "Semantic_Type",
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
                    onClick={() => navigate(`/edit-disease/${record.UMLS_CUI}`)}
                  />
                </Tooltip>
                <Popconfirm
                  title="Are you sure you want to delete this entry?"
                  onConfirm={() => {
                    bioService.deleteDiseaseById(record.UMLS_CUI).then(() => {
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

  return { diseaseColumns };
};
