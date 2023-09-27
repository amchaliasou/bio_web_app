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
import { useLayoutEffect, useMemo } from "react";
import bioService from "services/bioService";
import { useStores } from "stores/rootStore";
import { useDisease } from "./hooks/useDisease";
import "./index.css";
const EditDisease: React.FC = observer(() => {
  const { diseaseStore, functionalityStore, authenticationStore } = useStores();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  useLayoutEffect(() => {
    if (!authenticationStore.isAuthenticated) window.location.href = "/";
  }, []);

  const { umlsCui } = useDisease();
  const handleSubmit = (values: any) => {
    console.log(values);
    if (!umlsCui) return;
    functionalityStore.triggerActivity(true);
    bioService
      .updateDisease(umlsCui, values)
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
  const initialValues = useMemo(() => {
    return {
      UMLS_CUI: diseaseStore.diseaseExtended?.disease?.UMLS_CUI,
      Disease_Name: diseaseStore.diseaseExtended?.disease?.Disease_Name,
      MeSH: diseaseStore.diseaseExtended?.disease?.MeSH,
      OMIM: diseaseStore.diseaseExtended?.disease?.OMIM,
      Semantic_Type: diseaseStore.diseaseExtended?.disease?.Semantic_Type,
      disease_mesh_class: diseaseStore.diseaseExtended?.mesh_class.map(
        (item: any) => ({
          MeSH_Class: item.MeSH_Class,
        })
      ),
      disease_phenotypic_abnormality:
        diseaseStore.diseaseExtended?.phenotypic_abnormality.map(
          (item: any) => ({
            Phenotypic_Abnormality: item.Phenotypic_Abnormality,
          })
        ),
      disease_ontology: diseaseStore.diseaseExtended?.ontology.map(
        (item: any) => ({
          Ontology: item.Ontology,
        })
      ),
      gene_disease_assoc: diseaseStore.diseaseExtended?.gene_associated.map(
        (item: any) => ({
          PMID: item.PMID,
          Entrez_ID: item.Entrez_ID,
          Score: item.Score,
          Association_Type: item.Association_Type,
          PMID_Year: item.PMID_Year,
        })
      ),
    };
  }, [diseaseStore.diseaseExtended]);

  useLayoutEffect(() => {
    console.log(initialValues);

    form.setFieldsValue(initialValues);
  }, [initialValues, diseaseStore.diseaseExtended]);

  return (
    <Card
      style={{width: "40%"}}
      title={`Edit  ${initialValues.UMLS_CUI}`}
      className="edit-new-disease-card"
    >
      {contextHolder}
      <Form
        onFinish={handleSubmit}
        layout="vertical"
        initialValues={initialValues}
        form={form}
      >
        <Form.Item
          label="UMLS_CUI"
          name="UMLS_CUI"
          rules={[{ required: true, message: "Please input UMLS_CUI!" }]}
        >
          <Input disabled />
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
          Gene Disease Assoc
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
                  Add GENE DISEASE ASSOC
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Disease
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
});

export default EditDisease;
