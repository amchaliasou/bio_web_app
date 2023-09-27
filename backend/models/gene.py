from sqlalchemy import BIGINT, DECIMAL, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from db.base import Base


class GENE(Base):
    __tablename__ = "GENE"
    Entrez_ID = Column(Integer, primary_key=True)
    Gene_Symbol = Column(String)
    Uniprot_Accession = Column(String)
    Full_Name = Column(String)
    Protein_Class = Column(String)
    DPI = Column(DECIMAL)
    DSI = Column(DECIMAL)
    pLi = Column(String)
    
    gene_disease_assoc = relationship("GENE_DISEASE_ASSOC", cascade="all,delete")


class GENE_DISEASE_ASSOC(Base):
    __tablename__ = "GENE_DISEASE_ASSOC"
    # Define columns
    UMLS_CUI = Column(String(15), ForeignKey("DISEASE.UMLS_CUI"), primary_key=True, nullable=False)
    Entrez_ID = Column(Integer, ForeignKey("GENE.Entrez_ID"), primary_key=True, nullable=False)
    PMID = Column(BIGINT, primary_key=True, nullable=False)
    PMID_Year = Column(Integer)  # SQLAlchemy does not have a Year type, so Integer is used
    Score = Column(DECIMAL(4, 3))
    Association_Type = Column(String(25))
    
    # Define relationships
    disease = relationship("DISEASE", back_populates="gene_disease_assoc")
    gene = relationship("GENE", back_populates="gene_disease_assoc")
