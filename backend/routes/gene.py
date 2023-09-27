from typing import List, Optional

from fastapi import APIRouter, HTTPException
from sqlalchemy import or_
from sqlalchemy.orm import joinedload

from db.database import SessionLocal
from models.gene import GENE, GENE_DISEASE_ASSOC
from schemas.disease import GENE_DISEASE_ASSOCBase, GENEBase
from models.disease import (
    DISEASE,
    DISEASE_MESH_CLASS,
    DISEASE_ONTOLOGY,
    DISEASE_PHENOTYPIC_ABNORMALITY,
)
from schemas.gene import GeneCreate

router = r = APIRouter()


@router.get("/genes", response_model=List[GENEBase])
def get_all_genes(search: Optional[str] = None):
    with SessionLocal() as db:
        query = db.query(GENE).options(joinedload(GENE.gene_disease_assoc))

        if search:
            # Apply filters based on the search parameter for each attribute of the tables
            query = query.filter(
                or_(
                    GENE.Entrez_ID.ilike(f"%{search}%"),
                    GENE.Gene_Symbol.ilike(f"%{search}%"),
                    GENE.Uniprot_Accession.ilike(f"%{search}%"),
                    GENE.Full_Name.ilike(f"%{search}%"),
                    GENE.Protein_Class.ilike(f"%{search}%"),
                    GENE.DPI.ilike(f"%{search}%"),
                    GENE.DSI.ilike(f"%{search}%"),
                    GENE.pLi.ilike(f"%{search}%"),
                    GENE_DISEASE_ASSOC.UMLS_CUI.ilike(f"%{search}%"),
                    GENE_DISEASE_ASSOC.PMID.ilike(f"%{search}%"),
                    GENE_DISEASE_ASSOC.Score.ilike(f"%{search}%"),
                    GENE_DISEASE_ASSOC.Association_Type.ilike(f"%{search}%"),
                )
            )

    # Execute the query and return the results
    genes = query.all()
    return genes


@r.get("/gene/{id}")
def get_gene_by_id(id: int):
    with SessionLocal() as db:
        gene = db.query(GENE).filter(GENE.Entrez_ID == id).first()
        gene_disease_assoc = (
            db.query(GENE_DISEASE_ASSOC)
            .filter(GENE_DISEASE_ASSOC.Entrez_ID == id)
            .all()
        )
        diseases = []
        for item in gene_disease_assoc:
            diseases.append(
                db.query(DISEASE).filter(DISEASE.UMLS_CUI == item.UMLS_CUI).all()
            )

        if gene is None:
            raise HTTPException(status_code=404, detail="GENE not found")
        return {
            "gene": gene,
            "gene_disease_assoc": gene_disease_assoc,
            "diseases": diseases,
        }


@r.get("/gene_disease_assoc/{id}", response_model=GENE_DISEASE_ASSOCBase)
def get_gene_disease_assoc_by_id(id: str):
    db = SessionLocal()
    item = (
        db.query(GENE_DISEASE_ASSOC).filter(GENE_DISEASE_ASSOC.UMLS_CUI == id).first()
    )
    db.close()
    if item is None:
        raise HTTPException(status_code=404, detail="GENE_DISEASE_ASSOC not found")
    return item


@r.post("/add_gene")
async def add_gene(gene_data: GeneCreate):
    # return gene_data
    with SessionLocal() as db:
        new_gene = GENE(**gene_data.dict())
        try:
            db.add(new_gene)
            db.commit()
        except:
            db.rollback()
            raise HTTPException(status_code=404, detail="GENE already exists")

        return gene_data


@router.put("/update_gene")
async def update_gene(gene_data: GeneCreate):
    # Fetch the existing gene record
    with SessionLocal() as db:
        existing_gene = (
            db.query(GENE).filter(GENE.Entrez_ID == gene_data.Entrez_ID).first()
        )

        # Check if the gene exists
        if existing_gene is None:
            raise HTTPException(status_code=404, detail="Gene not found")

        # Update the fields of the existing gene record
        for field, value in gene_data.dict().items():
            setattr(existing_gene, field, value)

        try:
            # Commit the transaction
            db.commit()
        except Exception as e:
            db.rollback()
            raise HTTPException(status_code=400, detail=str(e))

        return {"message": "Gene updated successfully"}


@r.delete("/delete_gene/{entrez_id}")
async def delete_gene(entrez_id: int):
    db = SessionLocal()
    try:
        # Query the gene by Entrez_ID
        gene = db.query(GENE).filter(GENE.Entrez_ID == entrez_id).first()

        # Check if the gene exists
        if gene is None:
            raise HTTPException(status_code=404, detail="Gene not found")

        # Delete the gene
        db.delete(gene)
        db.commit()

        return {"message": "Gene successfully deleted"}

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        db.close()
