import { useLayoutEffect, useMemo } from "react";
import { useStores } from "stores/rootStore";
import { useDiseaseColumns } from "./useDiseaseColumns";
import { useGeneColumns } from "./useGeneColumns";

export const useDataSource = () => {
  const { functionalityStore, diseaseStore, geneStore, authenticationStore } =
    useStores();

  const { diseaseColumns } = useDiseaseColumns();
  const { geneColumns } = useGeneColumns();
  useLayoutEffect(() => {
    if (functionalityStore.searchParam === "Disease") {
      functionalityStore.triggerActivity(true);
      diseaseStore
        .getAllDiseases(functionalityStore.searchValue)
        .finally(() => {
          functionalityStore.triggerActivity(false);
        });
    }

    if (functionalityStore.searchParam === "Gene") {
      functionalityStore.triggerActivity(true);
      geneStore.getAllGenes(functionalityStore.searchValue).finally(() => {
        functionalityStore.triggerActivity(false);
      });
    }
  }, [
    functionalityStore.searchParam,
    functionalityStore.searchValue,
    functionalityStore.shouldUpdate,
  ]);

  const columns = useMemo(() => {
    if (functionalityStore.searchParam === "Disease") return diseaseColumns;
    if (functionalityStore.searchParam === "Gene") return geneColumns;
    return [] 
  }, [functionalityStore.searchParam, authenticationStore.isAuthenticated]);

  const dataSource = useMemo(() => {
    if (functionalityStore.searchParam === "Disease")
      return diseaseStore.diseases;
    if (functionalityStore.searchParam === "Gene") return geneStore.genes;
    return [];
  }, [
    functionalityStore.searchParam,
    diseaseStore.diseases,
    geneStore.genes,
    authenticationStore.isAuthenticated,
    functionalityStore.shouldUpdate,
  ]);

  return { columns, dataSource };
};
