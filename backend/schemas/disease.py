from typing import List, Union

from pydantic import BaseModel, Field

class DISEASEBase(BaseModel):
    Semantic_Type: str
    Disease_Name: str
    MeSH: str
    UMLS_CUI: str
    OMIM: Union[str, None] 
    
class DISEASE_MESH_CLASSBase(BaseModel):
    UMLS_CUI: str
    MeSH_Class: str


class DISEASE_PHENOTYPIC_ABNORMALITYBase(BaseModel):
    UMLS_CUI: str
    Phenotypic_Abnormality: str


class DISEASE_ONTOLOGYBase(BaseModel):
    UMLS_CUI: str
    Ontology: str


class GENEBase(BaseModel):
    Entrez_ID: int
    Gene_Symbol: str
    Uniprot_Accession: str
    Full_Name: str
    Protein_Class: Union[str,None]
    DPI: float
    DSI: float
    pLi: str


class GENE_DISEASE_ASSOCBase(BaseModel):
    UMLS_CUI: str
    Entrez_ID: int
    PMID: int
    Score: float
    Association_Type: str

class GENE_DISEASE_ASSOC_CREATE(BaseModel):
    Entrez_ID: int
    PMID: int
    Score: float
    Association_Type: str
    
class DISEASE_ONTOLOGY_CREATE(BaseModel):
    Ontology: str
    
class DISEASE_MESH_CREATE(BaseModel):
    MeSH_Class: str


class DISEASE_PHENOTYPIC_ABNORMALITY_CREATE(BaseModel):
    Phenotypic_Abnormality: str

    
class ResponseModel(BaseModel):
    disease_mesh_class: DISEASE_MESH_CLASSBase
    disease_phenotypic_abnormality: DISEASE_PHENOTYPIC_ABNORMALITYBase
    disease_ontology: DISEASE_ONTOLOGYBase
    gene_disease_assoc: GENE_DISEASE_ASSOCBase
    gene: GENEBase

class AllDiseasesResponse(BaseModel):
    response: List[ResponseModel]
    
class DiseaseCreate(BaseModel):
    UMLS_CUI: str
    Disease_Name: str
    MeSH: str
    OMIM: str
    Semantic_Type: str
    disease_mesh_class:List[DISEASE_MESH_CREATE]
    disease_ontology: List[DISEASE_ONTOLOGY_CREATE]
    disease_phenotypic_abnormality:List[DISEASE_PHENOTYPIC_ABNORMALITY_CREATE]
    gene_disease_assoc: List[GENE_DISEASE_ASSOC_CREATE]
