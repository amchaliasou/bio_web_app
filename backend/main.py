from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

# Import the route modules
from routes import disease, gene, user  

# FastAPI app initialization
app = FastAPI(
    title="BioInformatics",
    description="Bioinformatics Web Application",
    version="1.0.0",
)


origins = [
    "http://localhost",
    "http://localhost:3000",
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Exception handling
@app.exception_handler(Exception)
def validation_exception_handler(request, err):
    base_error_message = f"Failed to execute: {request.method}: {request.url}"
    return JSONResponse(
        status_code=400, content={"message": f"{base_error_message}. Detail: {err}"}
    )


app.include_router(
    user.router,
    prefix="/api/user",
    tags=["User"],
)
app.include_router(
    gene.router,
    prefix="/api/gene",
    tags=["Gene"],
)
app.include_router(
    disease.router,
    prefix="/api/disease",
    tags=["Disease"],
)
