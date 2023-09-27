import { makeAutoObservable } from "mobx";
import bioService from "services/bioService";
import { GENE } from "services/bioService/dto";

class GeneStore {
  genes: GENE[] = [];
  editGene: GENE | null = null;
  openEditModal = false;
  constructor() {
    makeAutoObservable(this);
  }

  public getAllGenes = async (search: string | undefined) => {
    const response = await bioService.getGenes(search);
    this.genes = response;
    return response;
  };

  toggleEditModal = (value: boolean) => {
    this.openEditModal = value;
  };
  public setEditGene = (gene: GENE | null) => {
    this.editGene = gene;
  };
}

export default GeneStore;
