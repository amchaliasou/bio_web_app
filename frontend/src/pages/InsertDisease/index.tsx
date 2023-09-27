import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Divider,
  Form,
  Input,
  InputNumber,
  Space,
  message,
} from "antd";
import { observer } from "mobx-react";
import { useLayoutEffect } from "react";
import bioService from "services/bioService";
import { useStores } from "stores/rootStore";
import "./index.css";
const InsertDisease: React.FC = observer(() => {
  const { functionalityStore, authenticationStore } = useStores();
  const [messageApi, contextHolder] = message.useMessage();

  useLayoutEffect(() => {
    if (!authenticationStore.isAuthenticated) window.location.href = "/";
  }, []);

  const handleSubmit = (values: any) => {
    // bioService.insertDisease(values);
    functionalityStore.triggerActivity(true);
    bioService
      .addDisease(values)
      .then((res) => {
        messageApi.open({
          type: "success",
          content: res.message,
        });
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        functionalityStore.triggerActivity(false);
      });
  };

  return (
    <Card title="Insert New Disease Or Association" className="insert-new-disease-card">
      <Form onFinish={handleSubmit} layout="vertical">
        <Form.Item
          label="UMLS_CUI"
          name="UMLS_CUI"
          rules={[{ required: true, message: "Please input UMLS_CUI!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Disease Name" name="Disease_Name">
          <Input />
        </Form.Item>
        <Form.Item label="MeSH" name="MeSH">
          <Input />
        </Form.Item>
        <Form.Item label="OMIM" name="OMIM">
          <Input />
        </Form.Item>
        <Form.Item label="Semantic Type" name="Semantic_Type">
          <Input />
        </Form.Item>
        <Divider orientation="left" plain>
          Disease Mesh Class
        </Divider>
        <Form.List name="disease_mesh_class">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    label="MeSH Class"
                    {...restField}
                    name={[name, "MeSH_Class"]}
                    rules={[{ required: true, message: "Missing MeSH Class" }]}
                  >
                    <Input />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                >
                  Add MeSH Class
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Divider orientation="left" plain>
          Disease Phenotypic Abnormality
        </Divider>
        <Form.List name="disease_phenotypic_abnormality">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    label="Phenotypic Abnormality"
                    {...restField}
                    name={[name, "Phenotypic_Abnormality"]}
                    rules={[
                      {
                        required: true,
                        message: "Missing Phenotypic Abnormality",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                >
                  Add Phenotypic Abnormality
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Divider orientation="left" plain>
          Disease Ontology
        </Divider>
        <Form.List name="disease_ontology">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    label="Ontology"
                    {...restField}
                    name={[name, "Ontology"]}
                    rules={[{ required: true, message: "Missing Ontology" }]}
                  >
                    <Input />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                >
                  Add Ontology
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Divider orientation="left" plain>
          Gene Disease Association
        </Divider>
        <Form.List name="gene_disease_assoc">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "Entrez_ID"]}
                    label="Entrez_ID"
                    rules={[{ required: true, message: "Missing Entrez_ID" }]}
                  >
                    <InputNumber />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "PMID"]}
                    label="PMID"
                    rules={[{ required: true, message: "Missing PMID" }]}
                  >
                    <InputNumber />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "PMID_Year"]}
                    label="PMID_Year"
                  >
                    <InputNumber />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "Score"]}
                    label="Score"
                  >
                    <InputNumber step={0.001} />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "Association_Type"]}
                    label="Association_Type"
                  >
                    <Input />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                >
                  Add Gene - Disease Association
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
});

export default InsertDisease;
