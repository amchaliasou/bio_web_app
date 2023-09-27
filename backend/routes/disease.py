from typing import Any, Dict, List, Optional

from fastapi import APIRouter, HTTPException
from sqlalchemy import or_, and_, not_
from sqlalchemy.orm import joinedload

from db.database import SessionLocal
from models.disease import (
    DISEASE,
    DISEASE_MESH_CLASS,
    DISEASE_ONTOLOGY,
    DISEASE_PHENOTYPIC_ABNORMALITY,
)
from models.gene import GENE, GENE_DISEASE_ASSOC
from schemas.disease import (
    AllDiseasesResponse,
    DISEASE_MESH_CLASSBase,
    DISEASE_ONTOLOGYBase,
    DISEASE_PHENOTYPIC_ABNORMALITYBase,
    DISEASEBase,
    DiseaseCreate,
)

router = r = APIRouter()


@r.get("/diseases", response_model=List[DISEASEBase])
def get_all_diseases(search: Optional[str] = None):
    with SessionLocal() as db:
        query = (
            db.query(DISEASE)
            .outerjoin(DISEASE.disease_mesh_class)
            .outerjoin(DISEASE.disease_ontology)
            .outerjoin(DISEASE.disease_phenotypic_abnormality)
            .options(
                joinedload(DISEASE.disease_mesh_class),
                joinedload(DISEASE.disease_ontology),
                joinedload(DISEASE.disease_phenotypic_abnormality),
            )
        )
        if search:
            query = query.filter(
                or_(
                    DISEASE.UMLS_CUI.ilike(f"%{search}%"),
                    DISEASE.Disease_Name.ilike(f"%{search}%"),
                    DISEASE.MeSH.ilike(f"%{search}%"),
                    DISEASE.OMIM.ilike(f"%{search}%"),
                    DISEASE.Semantic_Type.ilike(f"%{search}%"),
                    DISEASE_MESH_CLASS.MeSH_Class.ilike(f"%{search}%"),
                    DISEASE_ONTOLOGY.Ontology.ilike(f"%{search}%"),
                    DISEASE_PHENOTYPIC_ABNORMALITY.Phenotypic_Abnormality.ilike(
                        f"%{search}%"
                    ),
                )
            )
        print(search)
        diseases = query.all()
    return diseases


@router.get("/disease/{UMLS_CUI}")
def read_disease(UMLS_CUI: str):
    db = SessionLocal()

    try:
        disease_data = db.query(DISEASE).filter(DISEASE.UMLS_CUI == UMLS_CUI).first()
        if disease_data is None:
            raise HTTPException(status_code=404, detail="Disease not found")

        mesh_class = (
            db.query(DISEASE_MESH_CLASS)
            .filter(DISEASE_MESH_CLASS.UMLS_CUI == UMLS_CUI)
            .all()
        )
        phenotypic_abnormality = (
            db.query(DISEASE_PHENOTYPIC_ABNORMALITY)
            .filter(DISEASE_PHENOTYPIC_ABNORMALITY.UMLS_CUI == UMLS_CUI)
            .all()
        )
        ontology = (
            db.query(DISEASE_ONTOLOGY)
            .filter(DISEASE_ONTOLOGY.UMLS_CUI == UMLS_CUI)
            .all()
        )
        gene_associated = (
            db.query(GENE_DISEASE_ASSOC)
            .filter(GENE_DISEASE_ASSOC.UMLS_CUI == UMLS_CUI)
            .all()
        )

        # gene = db.query(GENE).filter(GENE.Entrez_ID == gene_associated[0].Entrez_ID).all()

        # Combine all data into a single dictionary
        combined_data = {
            "disease": disease_data,
            "mesh_class": mesh_class,
            "phenotypic_abnormality": phenotypic_abnormality,
            "ontology": ontology,
            "gene_associated": gene_associated,
        }
        return combined_data

    finally:
        db.close()


@r.post("/add_disease")
def add_disease(disease_data: DiseaseCreate):
    db = SessionLocal()
    # Create and add the new disease to the database
    new_disease = DISEASE(
        **disease_data.dict(
            exclude={
                "disease_mesh_class",
                "disease_ontology",
                "disease_phenotypic_abnormality",
                "gene_disease_assoc",
            }
        )
    )
    db.add(new_disease)
    db.flush()  # Flush to get the new_disease UMLS_CUI

    # Add related data to the DISEASE_MESH_CLASS table
    for mesh_class in disease_data.disease_mesh_class:
        db.add(
            DISEASE_MESH_CLASS(
                UMLS_CUI=new_disease.UMLS_CUI, MeSH_Class=mesh_class.MeSH_Class
            )
        )

    # Add related data to the DISEASE_ONTOLOGY table
    for ontology in disease_data.disease_ontology:
        db.add(
            DISEASE_ONTOLOGY(UMLS_CUI=new_disease.UMLS_CUI, Ontology=ontology.Ontology)
        )

    # Add related data to the DISEASE_PHENOTYPIC_ABNORMALITY table
    for phenotypic_abnormality in disease_data.disease_phenotypic_abnormality:
        db.add(
            DISEASE_PHENOTYPIC_ABNORMALITY(
                UMLS_CUI=new_disease.UMLS_CUI,
                Phenotypic_Abnormality=phenotypic_abnormality.Phenotypic_Abnormality,
            )
        )

    # Add related data to the GENE_DISEASE_ASSOC table
    for assoc in disease_data.gene_disease_assoc:
        db.add(GENE_DISEASE_ASSOC(**assoc.dict(), UMLS_CUI=new_disease.UMLS_CUI))

    db.commit()
    return {"message": "Disease added successfully"}


@r.put("/update_disease/{umls_cui}")
def update_disease(umls_cui: str, disease_data: DiseaseCreate):
    db = SessionLocal()
    # Fetch the existing disease record
    existing_disease = db.query(DISEASE).filter(DISEASE.UMLS_CUI == umls_cui).first()
    # Check if the disease exists
    if existing_disease is None:
        raise HTTPException(status_code=404, detail="Disease not found")

    # Update the fields of the existing disease record
    for field, value in disease_data.dict(
        exclude={
            "disease_mesh_class",
            "disease_ontology",
            "disease_phenotypic_abnormality",
            "gene_disease_assoc",
        }
    ).items():
        setattr(existing_disease, field, value)

    # Handle related records in DISEASE_MESH_CLASS
    handle_related_records(
        db,
        umls_cui,
        existing_disease.disease_mesh_class,
        disease_data.disease_mesh_class,
        DISEASE_MESH_CLASS,
        "MeSH_Class",
    )

    # Handle related records in DISEASE_ONTOLOGY
    handle_related_records(
        db,
        umls_cui,
        existing_disease.disease_ontology,
        disease_data.disease_ontology,
        DISEASE_ONTOLOGY,
        "Ontology",
    )

    # Handle related records in DISEASE_PHENOTYPIC_ABNORMALITY
    handle_related_records(
        db,
        umls_cui,
        existing_disease.disease_phenotypic_abnormality,
        disease_data.disease_phenotypic_abnormality,
        DISEASE_PHENOTYPIC_ABNORMALITY,
        "Phenotypic_Abnormality",
    )

    # Handle related records in GENE_DISEASE_ASSOC
    existing_assoc = {
        assoc.Entrez_ID: assoc for assoc in existing_disease.gene_disease_assoc
    }
    new_assoc = {data.Entrez_ID: data for data in disease_data.gene_disease_assoc}

    # Delete removed records
    for entrez_id, obj in existing_assoc.items():
        if entrez_id not in new_assoc:
            db.delete(obj)

    # Add new records or update existing ones
    for entrez_id, data in new_assoc.items():
        if entrez_id in existing_assoc:
            # Update existing record
            obj = existing_assoc[entrez_id]
            for field, value in data.dict().items():
                setattr(obj, field, value)
        else:
            # Add new record
            db.add(GENE_DISEASE_ASSOC(**data.dict(), UMLS_CUI=umls_cui))

    # Commit the transaction
    db.commit()

    return {"message": "Disease updated successfully"}


def handle_related_records(
    db, umls_cui, existing_records, new_data, ModelClass, unique_field
):
    existing_dict = {getattr(obj, unique_field): obj for obj in existing_records}
    new_dict = {getattr(data, unique_field): data for data in new_data}

    # Delete removed records
    for unique_value, obj in existing_dict.items():
        if unique_value not in new_dict:
            db.delete(obj)

    # Add new records or update existing ones
    for unique_value, data in new_dict.items():
        if unique_value in existing_dict:
            # Update existing record if necessary
            obj = existing_dict[unique_value]
            for field, value in data.dict().items():
                setattr(obj, field, value)
        else:
            # Add new record
            db.add(ModelClass(**data.dict(), UMLS_CUI=umls_cui))


@r.delete("/delete_disease/{UMLS_CUI}")
def delete_disease(UMLS_CUI: str):
    with SessionLocal() as db:
        disease = db.query(DISEASE).filter(DISEASE.UMLS_CUI == UMLS_CUI).first()
        if disease is None:
            raise HTTPException(status_code=404, detail="Disease not found")
        db.delete(disease)
        db.commit()
    return {"message": "Disease successfully deleted"}
