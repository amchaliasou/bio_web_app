import { Button, Form, Input, InputNumber, Modal, notification } from "antd";
import { observer } from "mobx-react";
import React, { useLayoutEffect, useMemo } from "react";
import bioService from "services/bioService";
import { useStores } from "stores/rootStore";
import "./index.css";

interface InsertionModalProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}
const AddGene: React.FC<InsertionModalProps> = observer(
  ({ isModalOpen, handleOk, handleCancel }: InsertionModalProps) => {
    const { functionalityStore, geneStore } = useStores();
    const [form] = Form.useForm();
    const initialValues = useMemo(() => {
      return {
        Entrez_ID: geneStore.editGene?.Entrez_ID,
        Gene_Symbol: geneStore.editGene?.Gene_Symbol,
        Uniprot_Accession: geneStore.editGene?.Uniprot_Accession,
        Full_Name: geneStore.editGene?.Full_Name,
        Protein_Class: geneStore.editGene?.Protein_Class,
        DPI: geneStore.editGene?.DPI,
        DSI: geneStore.editGene?.DSI,
        pLi: geneStore.editGene?.pLi,
      };
    }, [geneStore.editGene]);

    useLayoutEffect(() => {
      form.setFieldsValue(initialValues);
    }, [geneStore.editGene, initialValues]);

    const handleSubmit = (values: any) => {
      var callback = geneStore.editGene
        ? bioService.updateGene
        : bioService.addGene;

      functionalityStore.triggerActivity(true);

      callback(values)
        .then((res) => {
          notification.success({
            message: "Success",
            description: `Succefull ${
              geneStore.editGene ? "Update" : "Add"
            } Gene with Enterz_ID: ${values.Entrez_ID}`,
          });
          functionalityStore.toggleShouldUpdate();
          setTimeout(() => {
            handleCancel();
          });
        })
        .catch((err) => {
          console.error(err);
          notification.error({
            message: "Error",
            description: "Failed to add Gene",
          });
        })
        .finally(() => {
          functionalityStore.triggerActivity(false);
        });
    };
    return (
      <Modal
        title={<span style={{fontSize: '18px', display: 'flex', justifyContent: 'center'}}>{geneStore.editGene ? 'Update' : 'Add'} Gene</span>}
        open={isModalOpen}
        footer={null}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          onFinish={handleSubmit}
          layout="vertical"
          initialValues={initialValues}
          form={form}
        >
          <Form.Item
            label="Entrez_ID"
            name="Entrez_ID"
            rules={[{ required: true, message: "Please input Entrez_ID!" }]}
          >
            <InputNumber disabled={!!geneStore.editGene} />
          </Form.Item>
          <Form.Item label="Gene Symbol" name="Gene_Symbol">
            <Input />
          </Form.Item>
          <Form.Item label="Uniprot Accession" name="Uniprot_Accession">
            <Input />
          </Form.Item>
          <Form.Item label="Full Name" name="Full_Name">
            <Input />
          </Form.Item>
          <Form.Item label="Protein Class" name="Protein_Class">
            <Input />
          </Form.Item>
          <Form.Item label="DPI" name="DPI">
            <InputNumber step={0.001} />
          </Form.Item>
          <Form.Item label="DSI" name="DSI">
            <InputNumber step={0.001} />
          </Form.Item>
          <Form.Item label="pLi" name="pLi">
            <Input />
          </Form.Item>
          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button type="primary" htmlType="submit">
                {geneStore.editGene ? 'Update' : 'Add'} Gene
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
);

export default AddGene;
