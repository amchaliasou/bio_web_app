from pydantic import BaseModel, Field

# Define the Pydantic model for the request body
class GeneCreate(BaseModel):
    Entrez_ID: int = Field(...)
    Gene_Symbol: str = Field(...)
    Uniprot_Accession: str = Field(...)
    Full_Name: str = Field(...)
    Protein_Class: str = Field(...)
    DPI: float = Field(...)
    DSI: float = Field(...)
    pLi: str = Field(...)
