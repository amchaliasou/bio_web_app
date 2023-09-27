// DISEASE DTO
export interface DISEASE {
    Semantic_Type: string
    Disease_Name: string
    MeSH: string
    UMLS_CUI: string
    OMIM: string | null
}
  
// DISEASE_MESH_CLASS DTO
export interface DISEASE_MESH_CLASS {
    UMLS_CUI: string;
    MeSH_Class: string;
}

// DISEASE_PHENOTYPIC_ABNORMALITY DTO
export interface DISEASE_PHENOTYPIC_ABNORMALITY {
    UMLS_CUI: string;
    Phenotypic_Abnormality: string;
}

// DISEASE_ONTOLOGY DTO
export interface DISEASE_ONTOLOGY {
    UMLS_CUI: string;
    Ontology: string;
}

// GENE_DISEASE_ASSOC DTO
export interface GENE_DISEASE_ASSOC {
    UMLS_CUI: string;
    Entrez_ID: number;
    PMID: number;
    Score: number;
    Association_Type: string;
}

// GENE DTO
export interface GENE {
    Entrez_ID: number;
    Gene_Symbol: string;
    Uniprot_Accession: string;
    Full_Name: string;
    Protein_Class: string;
    DPI: number;
    DSI: number;
    pLi: string;
}

// AllDiseasesResponse DTO
export interface AllDiseasesResponse {
    disease_mesh_class: DISEASE_MESH_CLASS;
    disease_phenotypic_abnormality: DISEASE_PHENOTYPIC_ABNORMALITY;
    disease_ontology: DISEASE_ONTOLOGY;
    gene_disease_assoc: GENE_DISEASE_ASSOC[];
    gene: GENE[];
}

// Optional: For creating a new disease and its related attributes
export interface DiseaseCreate {
    disease: DISEASE_MESH_CLASS;
    mesh_class?: DISEASE_MESH_CLASS[];
    phenotypic_abnormality?: DISEASE_PHENOTYPIC_ABNORMALITY[];
    ontology?: DISEASE_ONTOLOGY[];
    gene_disease_assoc?: GENE_DISEASE_ASSOC[];
}
