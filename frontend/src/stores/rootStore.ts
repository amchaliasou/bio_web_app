// RootStore.js
import React from "react";
import AuthenticationStore from "./authStore";
import DiseaseStore from "./diseaseStore";
import FunctionalityStore from "./functionalityStore";
import GeneStore from "./geneStore";

class RootStore {
  functionalityStore: FunctionalityStore;
  authenticationStore: AuthenticationStore;
  diseaseStore: DiseaseStore;
  geneStore: GeneStore;
  constructor() {
    this.functionalityStore = new FunctionalityStore();
    this.authenticationStore = new AuthenticationStore();
    this.diseaseStore = new DiseaseStore();
    this.geneStore = new GeneStore();
  }
}

export default RootStore;

const StoresContext = React.createContext(new RootStore());

// this will be the function available for the app to connect to the stores
export const useStores = () => React.useContext(StoresContext);
