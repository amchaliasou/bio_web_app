import httpService from "services/httpService";
import {
  AllDiseasesResponse,
  DISEASE,
  DISEASE_MESH_CLASS,
  DISEASE_ONTOLOGY,
  DISEASE_PHENOTYPIC_ABNORMALITY,
  DiseaseCreate,
  GENE,
  GENE_DISEASE_ASSOC,
} from "./dto";

class BioService {
  public async getDiseases(search: string | undefined): Promise<DISEASE[]> {
    const result = await httpService.get(
      `/api/disease/diseases${search ? `?search=${search}` : ""}`
    );
    return result.data;
  }

  public async getAllDiseases(): Promise<AllDiseasesResponse[]> {
    const result = await httpService.get("/api/disease/all_diseases/");
    return result.data;
  }
  public async getDiseaseDetails(umls_cui: string): Promise<any[]> {
    const result = await httpService.get(`/api/disease/disease/${umls_cui}`);
    return result.data;
  }

  public async deleteDiseaseById(umls_cui: string): Promise<any[]> {
    const result = await httpService.delete(
      `/api/disease/delete_disease/${umls_cui}`
    );
    return result.data;
  }

  public async addDisease(diseaseData: DiseaseCreate): Promise<any> {
    const result = await httpService.post(
      "/api/disease/add_disease",
      diseaseData
    );
    return result.data;
  }

  public async updateDisease(
    umls_cui: string,
    diseaseData: DiseaseCreate
  ): Promise<any> {
    const result = await httpService.put(
      `/api/disease/update_disease/${umls_cui}`,
      diseaseData
    );
    return result.data;
  }

  public async getDiseaseMeshClassById(
    id: string
  ): Promise<DISEASE_MESH_CLASS> {
    const result = await httpService.get(
      `/api/disease/disease_mesh_class/${id}/`
    );
    return result.data;
  }

  public async getDiseasePhenotypicAbnormalityById(
    id: string
  ): Promise<DISEASE_PHENOTYPIC_ABNORMALITY> {
    const result = await httpService.get(
      `/api/disease/disease_phenotypic_abnormality/${id}/`
    );
    return result.data;
  }

  public async getDiseaseOntologyById(id: string): Promise<DISEASE_ONTOLOGY> {
    const result = await httpService.get(
      `/api/disease/disease_ontology/${id}/`
    );
    return result.data;
  }
  public async getGenes(search: string | undefined): Promise<GENE[]> {
    const result = await httpService.get(
      `/api/gene/genes${search ? `?search=${search}` : ""}`
    );
    return result.data;
  }

  public async getGeneById(id: number): Promise<any> {
    const result = await httpService.get(`/api/gene/gene/${id}/`);
    return result.data;
  }

  public async addGene(values: GENE): Promise<GENE> {
    const result = await httpService.post(`/api/gene/add_gene`, values);
    return result.data;
  }
  public async updateGene(values: GENE): Promise<GENE> {
    const result = await httpService.put(`/api/gene/update_gene`, values);
    return result.data;
  }

  public async deleteGene(entrez_id: number): Promise<any[]> {
    const result = await httpService.delete(
      `/api/gene/delete_gene/${entrez_id}`
    );
    return result.data;
  }

  public async getGeneDiseaseAssocById(
    id: string
  ): Promise<GENE_DISEASE_ASSOC> {
    const result = await httpService.get(`/api/gene/gene_disease_assoc/${id}/`);
    return result.data;
  }
}

export default new BioService();
