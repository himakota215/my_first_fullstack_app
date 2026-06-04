from fastapi import FastAPI
from auth import router as auth_router
from products import router as products_router
from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI()
app.mount("/", StaticFiles(directory="frontend/build", html=True), name="static")


app.include_router(auth_router)
app.include_router(products_router)

@app.get('/')
def read_root():
    return {"message": "Welcome to the E-commerce API!"}
@app.exception_handler(HTTPException)
def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail},
    )

@app.exception_handler(Exception)
def generic_exception_handler(request: Request, exc: Exception):
    # Log the exception here for debugging purposes
    print(f"An unexpected error occurred: {exc}")
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "An internal server error occurred"},
    )