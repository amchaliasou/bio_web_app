from sqlalchemy import BIGINT, DECIMAL, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from db.base import Base


class DISEASE(Base):
    __tablename__ = "DISEASE"
    UMLS_CUI = Column(String, primary_key=True)
    Disease_Name = Column(String)
    MeSH = Column(String)
    OMIM = Column(String)
    Semantic_Type = Column(String)
    disease_mesh_class = relationship(
        "DISEASE_MESH_CLASS", back_populates="disease", cascade="all,delete"
    )
    disease_ontology = relationship(
        "DISEASE_ONTOLOGY", back_populates="disease", cascade="all,delete"
    )
    disease_phenotypic_abnormality = relationship(
        "DISEASE_PHENOTYPIC_ABNORMALITY", back_populates="disease", cascade="all,delete"
    )
    gene_disease_assoc = relationship(
        "GENE_DISEASE_ASSOC", back_populates="disease", cascade="all,delete"
    )


class DISEASE_MESH_CLASS(Base):
    __tablename__ = "DISEASE_MESH_CLASS"
    UMLS_CUI = Column(String, ForeignKey("DISEASE.UMLS_CUI"), primary_key=True)
    MeSH_Class = Column(String, primary_key=True)
    disease = relationship("DISEASE")


class DISEASE_ONTOLOGY(Base):
    __tablename__ = "DISEASE_ONTOLOGY"
    UMLS_CUI = Column(String, ForeignKey("DISEASE.UMLS_CUI"), primary_key=True)
    Ontology = Column(String, primary_key=True)
    disease = relationship("DISEASE")


class DISEASE_PHENOTYPIC_ABNORMALITY(Base):
    __tablename__ = "DISEASE_PHENOTYPIC_ABNORMALITY"
    UMLS_CUI = Column(String, ForeignKey("DISEASE.UMLS_CUI"), primary_key=True)
    Phenotypic_Abnormality = Column(String, primary_key=True)
    disease = relationship("DISEASE")
