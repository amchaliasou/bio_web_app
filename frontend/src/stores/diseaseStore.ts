import { makeAutoObservable } from "mobx";
import bioService from "services/bioService";
import { DISEASE } from "services/bioService/dto";

class DiseaseStore {
  diseases: DISEASE[] = [];
  diseaseExtended: any = null;
  constructor() {
    makeAutoObservable(this);
  }

  public getAllDiseases = async (search: string |undefined) => {
    const response = await bioService.getDiseases(search);
    this.diseases = response;
    return response;
  }

  public getDiseaseExtended = async (umlsCui:string) => {
    const response = await bioService.getDiseaseDetails(umlsCui);
    this.diseaseExtended = response;
    return response;
  }

  public clearDisease = () => {
    this.diseaseExtended = null;
  }
}

export default DiseaseStore;