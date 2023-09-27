DROP DATABASE IF EXISTS mybiodb;
CREATE DATABASE IF NOT EXISTS mybiodb;
USE mybiodb;

CREATE TABLE DISEASE(
       UMLS_CUI VARCHAR(15) NOT NULL UNIQUE,
       Disease_Name VARCHAR(50),
       MeSH VARCHAR(15),
       OMIM VARCHAR(15),
       Semantic_Type VARCHAR(45),
       PRIMARY KEY(UMLS_CUI));
 
CREATE TABLE DISEASE_MESH_CLASS (
       UMLS_CUI VARCHAR(15) NOT NULL,
       MeSH_Class VARCHAR(100) DEFAULT 'Unknown',
       PRIMARY KEY (UMLS_CUI, MeSH_Class),
       FOREIGN KEY (UMLS_CUI)
       REFERENCES DISEASE(UMLS_CUI) ON DELETE CASCADE);
 
CREATE TABLE DISEASE_PHENOTYPIC_ABNORMALITY (
       UMLS_CUI VARCHAR(15) NOT NULL,
       Phenotypic_Abnormality VARCHAR(45)DEFAULT 'Unknown',
       PRIMARY KEY (UMLS_CUI, Phenotypic_Abnormality),
       FOREIGN KEY (UMLS_CUI)
       REFERENCES DISEASE(UMLS_CUI) ON DELETE CASCADE);
 
CREATE TABLE DISEASE_ONTOLOGY (
       UMLS_CUI VARCHAR(15) NOT NULL,
       Ontology VARCHAR(50) DEFAULT 'Unknown',
       PRIMARY KEY (UMLS_CUI, Ontology),
       FOREIGN KEY (UMLS_CUI)
       REFERENCES DISEASE(UMLS_CUI) ON DELETE CASCADE);
 
CREATE TABLE GENE (
       Entrez_ID int not null unique,
       Gene_Symbol VARCHAR(15),
       Uniprot_Accession VARCHAR(15),
       Full_Name VARCHAR(60),
       Protein_Class VARCHAR(50),
       DPI decimal(5,3),
       DSI decimal(5,3),
       pLi VARCHAR(20),
       PRIMARY KEY (Entrez_ID));
 
CREATE TABLE GENE_DISEASE_ASSOC (
       UMLS_CUI VARCHAR(15) NOT NULL,
       Entrez_ID int not null,
       PMID bigint not null,
       PMID_Year Year,
       Score decimal (4,3),
       Association_Type VARCHAR(25),
       PRIMARY KEY (UMLS_CUI, Entrez_ID, PMID),
       FOREIGN KEY (UMLS_CUI)
       REFERENCES DISEASE(UMLS_CUI) ON DELETE CASCADE,
       FOREIGN KEY (Entrez_ID)
       REFERENCES GENE(Entrez_ID) ON DELETE CASCADE);
 
INSERT INTO DISEASE (UMLS_CUI, Disease_Name, MeSH, OMIM, Semantic_Type) 
VALUES ('C0002395', 'Alzheimer\'s Disease', 'D000544', 104300, 'Disease or Syndrome');

INSERT INTO DISEASE (UMLS_CUI, Disease_Name, MeSH, OMIM, Semantic_Type) 
VALUES ('C0085220', 'Cerebral Amyloid Angiopathy', 'D016657', null, 'Disease or Syndrome');
 
INSERT INTO DISEASE (UMLS_CUI, Disease_Name, MeSH, OMIM, Semantic_Type) 
VALUES ('C0001080', 'Achondroplasia', 'D000130', 100800, 'Congenital Abnormality'); 
 
INSERT INTO DISEASE (UMLS_CUI, Disease_Name, MeSH, OMIM, Semantic_Type) 
VALUES ('C0028754', 'Obesity', 'D009765', 601665, 'Disease or Syndrome');  

-- INSERT INTO DISEASE (UMLS_CUI, Disease_Name, MeSH, OMIM, Semantic_Type) 
-- VALUES ('C0266470', 'Cerebellar Hypoplasia', 'C562568', 213000, 'Congenital Abnormality');  

INSERT INTO DISEASE (UMLS_CUI, Disease_Name, MeSH, OMIM, Semantic_Type) 
VALUES ('C0030567', 'Parkinson Disease', 'D010300', 516000, 'Disease or Syndrome');  

-- INSERT INTO DISEASE (UMLS_CUI, Disease_Name, MeSH, OMIM, Semantic_Type) 
-- VALUES ('C0677886', 'Epithelial ovarian cancer', null, 167000, 'Neoplastic Process');  
--  
-- INSERT INTO DISEASE (UMLS_CUI, Disease_Name, MeSH, OMIM, Semantic_Type) 
-- VALUES ('C0022790', 'Krukenberg Tumor', 'D007725', null, 'Neoplastic Process');   

INSERT INTO DISEASE (UMLS_CUI, Disease_Name, MeSH, OMIM, Semantic_Type) 
VALUES ('C0024141', 'Lupus Erythematosus, Systemic', 'D008180', 152700, 'Disease or Syndrome');  

INSERT INTO DISEASE (UMLS_CUI, Disease_Name, MeSH, OMIM, Semantic_Type) 
VALUES ('C0677607', 'Hashimoto Disease', 'D050031', 140300, 'Disease or Syndrome'); 

INSERT INTO DISEASE (UMLS_CUI, Disease_Name, MeSH, OMIM, Semantic_Type) 
VALUES ('C0003873', 'Rheumatoid Arthritis', 'D001172', 180300, 'Disease or Syndrome'); 

INSERT INTO DISEASE (UMLS_CUI, Disease_Name, MeSH, OMIM, Semantic_Type) 
VALUES ('C0033860', 'Psoriasis', 'D011565', null, 'Disease or Syndrome'); 

INSERT INTO DISEASE (UMLS_CUI, Disease_Name, MeSH, OMIM, Semantic_Type) 
VALUES ('C0003872', 'Arthritis, Psoriatic', 'D015535', null, 'Disease or Syndrome');  

INSERT INTO DISEASE (UMLS_CUI, Disease_Name, MeSH, OMIM, Semantic_Type) 
VALUES ('C1527336', 'Sjogren\'s Syndrome', 'D012859', 270150, 'Disease or Syndrome');  

INSERT INTO DISEASE_MESH_CLASS (UMLS_CUI, MeSH_Class)
VALUES ('C0002395', 'Nervous System Diseases'),
	   ('C0002395', 'Mental Disorders');

INSERT INTO DISEASE_PHENOTYPIC_ABNORMALITY (UMLS_CUI, Phenotypic_Abnormality) 
VALUES ('C0002395', 'Abnormality of the nervous system');

INSERT INTO DISEASE_ONTOLOGY (UMLS_CUI, Ontology)
VALUES ('C0002395', 'genetic disease'),
	   ('C0002395', 'disease of anatomical entity');
       
INSERT INTO DISEASE_MESH_CLASS (UMLS_CUI, MeSH_Class)
VALUES ('C0001080', 'Congenital, Hereditary, and Neonatal Diseases and Abnormalities'),
	   ('C0001080', 'Musculoskeletal Diseases');

-- INSERT INTO DISEASE_PHENOTYPIC_ABNORMALITY (UMLS_CUI, Phenotypic_Abnormality) 
-- VALUES ('C0001080', null);

INSERT INTO DISEASE_ONTOLOGY (UMLS_CUI, Ontology)
VALUES ('C0001080', 'genetic disease'),
	   ('C0001080', 'disease of anatomical entity');
 
INSERT INTO DISEASE_MESH_CLASS (UMLS_CUI, MeSH_Class)
VALUES ('C0028754', 'Pathological Conditions, Signs and Symptoms'),
	   ('C0028754', 'Nutritional and Metabolic Diseases');

INSERT INTO DISEASE_PHENOTYPIC_ABNORMALITY (UMLS_CUI, Phenotypic_Abnormality) 
VALUES ('C0028754', 'Growth abnormality');

INSERT INTO DISEASE_ONTOLOGY (UMLS_CUI, Ontology)
VALUES ('C0028754', 'disease of metabolism');

-- INSERT INTO DISEASE_MESH_CLASS (UMLS_CUI, MeSH_Class)
-- VALUES ('C0266470', 'Congenital, Hereditary, and Neonatal Diseases and Abnormalities'),
-- 	   ('C0266470', 'Nervous System Diseases'),
--        ('C0266470', 'Mental Disorders');

-- INSERT INTO DISEASE_PHENOTYPIC_ABNORMALITY (UMLS_CUI, Phenotypic_Abnormality) 
-- VALUES ('C0266470', 'Abnormality of the nervous system');

-- INSERT INTO DISEASE_ONTOLOGY (UMLS_CUI, Ontology)
-- VALUES ('C0266470', null);
 
INSERT INTO DISEASE_MESH_CLASS (UMLS_CUI, MeSH_Class)
VALUES ('C0030567', 'Nervous System Diseases');

-- INSERT INTO DISEASE_PHENOTYPIC_ABNORMALITY (UMLS_CUI, Phenotypic_Abnormality) 
-- VALUES ('C0030567', null);

INSERT INTO DISEASE_ONTOLOGY (UMLS_CUI, Ontology)
VALUES ('C0030567', 'genetic disease'),
	   ('C0030567', 'disease of anatomical entity');

-- INSERT INTO DISEASE_MESH_CLASS (UMLS_CUI, MeSH_Class)
-- VALUES ('C0677886', 'Neoplasms'),
--        ('C0677886', 'Female Urogenital Diseases and Pregnancy Complications'),
--        ('C0677886', 'Endocrine System Diseases');
       
-- INSERT INTO DISEASE_PHENOTYPIC_ABNORMALITY (UMLS_CUI, Phenotypic_Abnormality) 
-- VALUES ('C0677886', null);

-- INSERT INTO DISEASE_ONTOLOGY (UMLS_CUI, Ontology)
-- VALUES ('C0677886', 'disease of cellular proliferation'),
-- 	   ('C0677886', 'disease of anatomical entity');

-- INSERT INTO DISEASE_MESH_CLASS (UMLS_CUI, MeSH_Class)
-- VALUES ('C0022790', 'Neoplasms');
       
-- INSERT INTO DISEASE_PHENOTYPIC_ABNORMALITY (UMLS_CUI, Phenotypic_Abnormality) 
-- VALUES ('C0022790', null);

-- INSERT INTO DISEASE_ONTOLOGY (UMLS_CUI, Ontology)
-- VALUES ('C0022790', 'disease of cellular proliferation'),
-- 	   ('C0022790', 'disease of anatomical entity');

INSERT INTO DISEASE_MESH_CLASS (UMLS_CUI, MeSH_Class)
VALUES ('C0024141', 'Skin and Connective Tissue Diseases'),
       ('C0024141', 'Immune System Diseases');
       
INSERT INTO DISEASE_PHENOTYPIC_ABNORMALITY (UMLS_CUI, Phenotypic_Abnormality) 
VALUES ('C0024141', 'Abnormality of the immune system');

INSERT INTO DISEASE_ONTOLOGY (UMLS_CUI, Ontology)
VALUES ('C0024141', 'disease of anatomical entity');

INSERT INTO DISEASE_MESH_CLASS (UMLS_CUI, MeSH_Class)
VALUES ('C0677607', 'Endocrine System Diseases');
       
INSERT INTO DISEASE_PHENOTYPIC_ABNORMALITY (UMLS_CUI, Phenotypic_Abnormality) 
VALUES ('C0677607', 'Abnormality of the immune system'),
       ('C0677607', 'Abnormality of the endocrine system');

INSERT INTO DISEASE_ONTOLOGY (UMLS_CUI, Ontology)
VALUES ('C0677607', 'disease of anatomical entity');

INSERT INTO DISEASE_MESH_CLASS (UMLS_CUI, MeSH_Class)
VALUES ('C0003873', 'Skin and Connective Tissue Diseases'),
	   ('C0003873', 'Musculoskeletal Diseases'),
       ('C0003873', 'Immune System Diseases');
       
INSERT INTO DISEASE_PHENOTYPIC_ABNORMALITY (UMLS_CUI, Phenotypic_Abnormality) 
VALUES ('C0003873', 'Abnormality of the skeletal system');

INSERT INTO DISEASE_ONTOLOGY (UMLS_CUI, Ontology)
VALUES ('C0003873', 'disease of anatomical entity');

INSERT INTO DISEASE_MESH_CLASS (UMLS_CUI, MeSH_Class)
VALUES ('C0003872', 'Skin and Connective Tissue Diseases'),
	   ('C0003872', 'Musculoskeletal Diseases');
       
-- INSERT INTO DISEASE_PHENOTYPIC_ABNORMALITY (UMLS_CUI, Phenotypic_Abnormality) 
-- VALUES ('C0003872', null);

INSERT INTO DISEASE_ONTOLOGY (UMLS_CUI, Ontology)
VALUES ('C0003872', 'syndrome');

INSERT INTO DISEASE_MESH_CLASS (UMLS_CUI, MeSH_Class)
VALUES ('C1527336', 'Skin and Connective Tissue Diseases'),
	('C1527336', 'Musculoskeletal Diseases'),
       ('C1527336', 'Immune System Diseases'),
       ('C1527336', 'Eye Diseases'),
       ('C1527336', 'Stomatognathic Diseases');       
       
-- INSERT INTO DISEASE_PHENOTYPIC_ABNORMALITY (UMLS_CUI, Phenotypic_Abnormality) 
-- VALUES ('C1527336', null);

INSERT INTO DISEASE_ONTOLOGY (UMLS_CUI, Ontology)
VALUES ('C1527336', 'disease of anatomical entity');

INSERT INTO DISEASE_MESH_CLASS (UMLS_CUI, MeSH_Class)
VALUES ('C0085220', 'Nutritional and Metabolic Diseases'),
	   ('C0085220', 'Nervous System Diseases'),
       ('C0085220', 'Cardiovascular Diseases');  

INSERT INTO DISEASE_PHENOTYPIC_ABNORMALITY (UMLS_CUI, Phenotypic_Abnormality) 
VALUES ('C0085220', 'Abnormality of metabolism/homeostasis');

INSERT INTO GENE (Entrez_ID, Gene_Symbol, Uniprot_Accession, Full_Name, Protein_Class, DPI, DSI, pLi)
VALUES (351, 'APP', 'P05067', 'amyloid beta precursor protein', 'Enzyme modulator', 0.846, 0.422, '0.046544'),
	   (1636, 'ACE', 'P12821', 'angiotensin I converting enzyme', 'Enzyme', 0.923, 0.328, '1.0344e-37'),
       (348, 'APOE', 'P02649', 'apolipoprotein E', null, 0.962, 0.338, '0.0018685'),
       (3553, 'IL1B', 'P01584', 'interleukin 1 beta', null, 0.962, 0.276, '0.13005'),
       (7124, 'TNF', 'P01375', 'tumor necrosis factor', 'Signaling', 0.962, 0.231, '0.8033'),
       (5621, 'PRNP', 'P04156', 'prion protein', null, 0.923, 0.445, '0.00063182'),
       (2147, 'F2', 'P00734', 'coagulation factor II, thrombin', 'Enzyme', 0.885, 0.415, '0.0011118'),
       (4311, 'MME', 'P08473', 'membrane metalloendopeptidase', 'Enzyme', 0.808, 0.407, '1.465e-18'),
       (3123, 'HLA-DRB1', 'P01911', 'major histocompatibility complex, class II, DR beta 1', 'Immune response', 0.923, 0.333, '0.0010997'),
       (1471, 'CST3', 'P01034', 'cystatin C', null, 0.808, 0.436, '0.0039011'),
       (3605, 'IL17A', 'Q16552', 'interleukin 17A', null, 0.923, 0.324, '0.043049'),
       (3586, 'IL10', 'P22301', 'interleukin 10', null, 0.923, 0.281, '0.0058874'),
       (3552, 'IL1A', 'P01583', 'interleukin 1 alpha', null, 0.962, 0.333, '0.0001602'),
       (968, 'CD68', 'P34810', 'CD68 molecule', 'Transporter', 0.808, 0.408, '0.0000014063'),
       (2261, 'FGFR3', 'P22607', 'fibroblast growth factor receptor 3', 'Kinase', 0.846, 0.391, '0.000016432'),
       (4882, 'NPR2', 'P20594', 'natriuretic peptide receptor 2', 'Kinase', 0.615, 0.573, '0.000042042'),
       (2688, 'GH1', 'P01241', 'growth hormone 1', 'Signaling', 0.923, 0.373, '0.030057'),
       (5741, 'PTH', 'P01270', 'parathyroid hormone', null, 0.846, 0.397, '0.012093'),
       (4160, 'MC4R', 'P32245', 'melanocortin 4 receptor', 'G-protein coupled receptor', 0.692, 0.535, '0.00091697'),
       (5468, 'PPARG', 'P37231', 'peroxisome proliferator activated receptor gamma', 'Nuclear receptor', 0.885, 0.358, '0.029194'),
       (5443, 'POMC', 'P01189', 'proopiomelanocortin', null, 0.846, 0.356, '0.00011658'),
       (1401, 'CRP', 'P02741', 'C-reactive protein', null, 0.962, 0.299, '0.0036969'),
       (958, 'CD40', 'P25942', 'CD40 molecule', null, 0.846, 0.396, '0.84603'),
       (6622, 'SNCA', 'P37840', 'synuclein alpha', 'Transporter', 0.885, 0.427, '0.8829'),
       (5071, 'PRKN', 'O60260', 'parkin RBR E3 ubiquitin protein ligase', 'Enzyme', 0.846, 0.431, '6.9346e-7'),
       (7038, 'TG', 'P01266', 'thyroglobulin', 'Enzyme modulator', 0.808, 0.48, '2.8802e-59'),
       (1493, 'CTLA4', 'P16410', 'cytotoxic T-lymphocyte associated protein 4', null, 0.923, 0.369, '6.9346e-7'),
       (716, 'C1S', 'O60260', 'parkin RBR E3 ubiquitin protein ligase', 'Enzyme', 0.846, 0.431, '0.94085'),
       (2213, 'FCGR2B', 'P31994', 'Fc fragment of IgG receptor IIb', 'Cell adhesion', 0.846, 0.522, '0.45637'),
       (1773, 'DNASE1', 'P24855', 'deoxyribonuclease 1', null, 0.846, 0.505, '6.9801e-21'),
       (26191, 'PTPN22', 'Q9Y2R2', 'protein tyrosine phosphatase non-receptor type 22', null, 0.846, 0.438, '3.4921e-21'),
       (6775, 'STAT4', 'Q14765', 'signal transducer and activator of transcription 4', 'Nucleic acid binding', 0.769, 0.471, '0.7662'),
       (6583, 'SLC22A4', 'Q9H015', 'solute carrier family 22 member 4', 'Transporter', 0.769, 0.603, '1.8253e-8'),
       (3663, 'IRF5', 'Q13568', 'interferon regulatory factor 5', 'Transcription factor', 0.731, 0.489, '0.0090365'),
       (79092, 'CARD14', 'Q9BXL6', 'caspase recruitment domain family member 14', null, 0.846, 0.546, '1.2051e-19'),
       (6774, 'STAT3', 'P40763', 'signal transducer and activator of transcription 3', 'Nucleic acid binding', 0.923, 0.32, '1'),
       (7422, 'VEGFA', 'P15692', 'vascular endothelial growth factor A', 'Signaling', 0.923, 0.266, '0.000024085'),
       (3596, 'IL13', 'P35225', 'interleukin 13', null, 0.846, 0.386, '0.014426'),
       (10758, 'TRAF3IP2', 'O43734', 'TRAF3 interacting protein 2', null, 0.692, 0.585, '1.615e-9'),
       (3107, 'HLA-C', 'P10321', 'major histocompatibility complex, class I, C', null, 0.846, 0.415, '0.0000015695'),
       (7128, 'TNFAIP3', 'P21580', 'TNF alpha induced protein 3', 'Enzyme', 0.808, 0.481, '0.99972'),
       (10318, 'TNIP1', 'Q15025', 'TNFAIP3 interacting protein 1', null, 0.769, 0.564, '0.47559')
       ;

INSERT INTO GENE_DISEASE_ASSOC (UMLS_CUI, Entrez_ID, PMID, PMID_Year, Score, Association_Type)
VALUES ('C0002395', 351, 31654319, 2020, 0.900, 'Biomarker'),
	   ('C0002395', 1636, 30991105, 2020, 0.900, 'Biomarker'),
       ('C0002395', 348, 31815697, 2020, 0.700, 'GeneticVariation'),
       ('C0002395', 3553, 31715312, 2020, 0.600, 'Biomarker'),
       ('C0002395', 7124, 31683445, 2020, 0.400, 'Biomarker'),
       ('C0002395', 5621, 31358351, 2020, 0.400, 'Biomarker'),
       ('C0002395', 2147, 27437944, 2016, 0.330, 'GeneticVariation'),
       ('C0002395', 4311, 31332715, 2020, 0.300,'AlteredExpression'),
       ('C0002395', 3123, 31358351, 2020, 0.190, 'Biomarker');

INSERT INTO GENE_DISEASE_ASSOC (UMLS_CUI, Entrez_ID, PMID, PMID_Year, Score, Association_Type)
VALUES ('C0085220', 348, 31744003, 2019, 0.500, 'Biomarker'),
	   ('C0085220', 351, 31278851, 2019, 0.500, 'AlteredExpression'),
       ('C0085220', 1471, 28067897, 2017, 0.170, 'Biomarker'),
       ('C0085220', 4311, 28489317, 2017, 0.070, 'GeneticVariation'),
       ('C0085220', 5621, 26354483, 2015, 0.040, 'Biomarker'),
       ('C0085220', 1636, 27884212, 2016, 0.010, 'GeneticVariation'),
       ('C0085220', 2147, 16782234, 2007, 0.010, 'AlteredExpression'),
       ('C0085220', 3605, 28526436, 2017, 0.010, 'AlteredExpression'),
       ('C0085220', 3586, 30796737, 2019, 0.010, 'Biomarker'),
       ('C0085220', 3552, 12947160, 2003, 0.010, 'GeneticVariation'),
       ('C0085220', 968, 9056541, 1997, 0.010, 'Biomarker');

INSERT INTO GENE_DISEASE_ASSOC (UMLS_CUI, Entrez_ID, PMID, PMID_Year, Score, Association_Type)
VALUES ('C0001080', 2261, 31048079, 2020, 1.000, 'GeneticVariation'),
	   ('C0001080', 4882, 22645228, 2012, 0.210, 'GeneticVariation'),
       ('C0001080', 2688, 30706088, 2019, 0.090, 'Biomarker'),
       ('C0001080', 5741, 29104492, 2017, 0.030, 'Biomarker'),
       ('C0001080', 3605, 31184530, 2019, 0.010, 'GeneticVariation');

INSERT INTO GENE_DISEASE_ASSOC (UMLS_CUI, Entrez_ID, PMID, PMID_Year, Score, Association_Type)
VALUES ('C0028754', 4160, 31471646, 2020, 1.000, 'GeneticVariation'),
	   ('C0028754', 5468, 31148857, 2020, 1.000, 'GeneticVariation'),
       ('C0028754', 5443, 30706088, 2019, 0.900, 'AlteredExpression'),
       ('C0028754', 1401, 31763930, 2020, 0.600, 'Biomarker'),
       ('C0028754', 2147, 26315791, 2015, 0.540, 'GeneticVariation'),
       ('C0028754', 958, 30096208, 2018, 0.520, 'Biomarker'),
       ('C0028754', 7124, 31476685, 2020, 0.400, 'Biomarker'),
       ('C0028754', 2688, 31527400, 2019, 0.400, 'Biomarker'),
       ('C0028754', 3586, 30975555, 2020, 0.300, 'AlteredExpression'),
       ('C0028754', 3553, 31522568, 2020, 0.300, 'Biomarker');

INSERT INTO GENE_DISEASE_ASSOC (UMLS_CUI, Entrez_ID, PMID, PMID_Year, Score, Association_Type)
VALUES ('C0030567', 6622, 31836471, 2020, 0.700, 'Biomarker'),
       ('C0030567', 5071, 31647998, 2020, 0.600, 'GeneticVariation'),
       ('C0030567', 348, 31292011, 2020, 0.200, 'GeneticVariation'),
       ('C0030567', 1636, 30868473, 2019, 0.100, 'GeneticVariation'),
       ('C0030567', 5621, 31358351, 2020, 0.100, 'Biomarker');

INSERT INTO GENE_DISEASE_ASSOC (UMLS_CUI, Entrez_ID, PMID, PMID_Year, Score, Association_Type)
VALUES ('C0677607', 7038, 30742860, 2019, 0.600, 'Biomarker'),
       ('C0677607', 1493, 30771152, 2019, 0.500, 'GeneticVariation'),
       ('C0677607', 716, 11390518, 2001, 0.400, 'Biomarker'),
       ('C0677607', 3123, 29958949, 2018, 0.100, 'Biomarker'),
       ('C0677607', 3605, 30814438, 2019, 0.100, 'AlteredExpression'),
       ('C0677607', 7124, 30399324, 2018, 0.090, 'AlteredExpression'),
       ('C0677607', 3586, 30356853, 2018, 0.080, 'Biomarker');

INSERT INTO GENE_DISEASE_ASSOC (UMLS_CUI, Entrez_ID, PMID, PMID_Year, Score, Association_Type)
VALUES ('C0024141', 2213, 31092713, 2019, 0.900, 'GeneticVariation'),
       ('C0024141', 1773, 31343409, 2020, 0.900, 'AlteredExpression'),
       ('C0024141', 26191, 30573655, 2019, 0.800, 'GeneticVariation'),
       ('C0024141', 3123, 30674474, 2019, 0.700, 'AlteredExpression'),
       ('C0024141', 6775, 31762023, 2020, 0.700, 'Biomarker'),
       ('C0024141', 3586, 30991045, 2019, 0.700, 'AlteredExpression'),
       ('C0024141', 1493, 31787598, 2020, 0.700, 'Biomarker'),
       ('C0024141', 3663, 31421124, 2020, 0.700, 'AlteredExpression'),
       ('C0024141', 716, 20727163, 2010, 0.400, 'Biomarker');

INSERT INTO GENE_DISEASE_ASSOC (UMLS_CUI, Entrez_ID, PMID, PMID_Year, Score, Association_Type)
VALUES ('C0003873', 7124, 31830775, 2020, 0.700, 'AlteredExpression'),
       ('C0003873', 26191, 30573655, 2019, 0.700, 'GeneticVariation'),
       ('C0003873', 6583, 30177313, 2019, 0.700, 'Biomarker'),
       ('C0003873', 1401, 31358361, 2020, 0.600, 'Biomarker'),
       ('C0003873', 3586, 31494241, 2020, 0.500, 'Biomarker'),
       ('C0003873', 6775, 30573655, 2019, 0.500, 'GeneticVariation'),
       ('C0003873', 3123, 31324468, 2020, 0.500, 'GeneticVariation'),
       ('C0003873', 3663, 30573655, 2019, 0.500, 'GeneticVariation'),
       ('C0003873', 958, 30423114, 2019, 0.500, 'GeneticVariation');
       
INSERT INTO GENE_DISEASE_ASSOC (UMLS_CUI, Entrez_ID, PMID, PMID_Year, Score, Association_Type)
VALUES ('C0033860', 79092, 31323190, 2019, 0.700, 'GeneticVariation'),
       ('C0033860', 6774, 31747314, 2020, 0.700, 'Biomarker'),
       ('C0033860', 7422, 31545526, 2020, 0.600, 'Biomarker'),
       ('C0033860', 3596, 30641038, 2019, 0.500, 'Biomarker'),
       ('C0033860', 7128, 30118730, 2019, 0.500, 'GeneticVariation'),
       ('C0033860', 10318, 31020648, 2019, 0.500, 'GeneticVariation'),
       ('C0033860', 7124, 28421729, 2020, 0.400, 'Biomarker'),
       ('C0033860', 1401, 31767465, 2020, 0.400, 'Biomarker'),
       ('C0033860', 3586, 31148856, 2020, 0.200, 'Biomarker'),
       ('C0033860', 26191, 28603863, 2017, 0.190, 'GeneticVariation'),
       ('C0033860', 3586, 26974007, 2016, 0.120, 'GeneticVariation'),
       ('C0033860', 958, 30251731, 2018, 0.100, 'Biomarker');


INSERT INTO GENE_DISEASE_ASSOC (UMLS_CUI, Entrez_ID, PMID, PMID_Year, Score, Association_Type)
VALUES ('C0003872', 10758, 30552173, 2019, 0.470, 'GeneticVariation'),
       ('C0003872', 7124, 31672774, 2020, 0.400, 'GeneticVariation'),
       ('C0003872', 3107, 30578879, 2019, 0.400, 'Biomarker'),
       ('C0003872', 968, 19732956, 2009, 0.300, 'Biomarker'),
       ('C0003872', 1401, 31646356, 2020, 0.100, 'AlteredExpression'),
       ('C0003872', 3605, 31847608, 2020, 0.100, 'Biomarker'),
       ('C0003872', 3123, 26605347, 2015, 0.090, 'GeneticVariation'),
       ('C0003872', 26191, 25923216, 2015, 0.060, 'GeneticVariation'),
       ('C0003872', 3586, 31209492, 2019, 0.060, 'Biomarker');

INSERT INTO GENE_DISEASE_ASSOC (UMLS_CUI, Entrez_ID, PMID, PMID_Year, Score, Association_Type)
VALUES ('C1527336', 6775, 28076899, 2017, 0.450, 'GeneticVariation'),
       ('C1527336', 7128, 31444033, 2019, 0.440, 'Biomarker'),
       ('C1527336', 10318, 27431346, 2020, 0.410, 'Biomarker'),
       ('C1527336', 7124, 30923465, 2019, 0.300, 'GeneticVariation'),
       ('C1527336', 3586, 31425659, 2020, 0.100, 'Biomarker'),
       ('C1527336', 3605, 30844839, 2019, 0.100, 'AlteredExpression'),
       ('C1527336', 3123, 21507567, 2011, 0.070, 'GeneticVariation');


CREATE TABLE USER (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    Role ENUM('Admin', 'Anonymous') NOT NULL
);


INSERT INTO USER (Username, Password,Role)
VALUES ('nina', '$2b$12$ZqLyVJaMBSga.xUVDh1mSugbEgbYkh7Bj9Egu6RVLp8g3sm6TKBoG','Admin');