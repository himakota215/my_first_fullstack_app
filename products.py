from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from datetime import datetime
from database import get_db
from models import Product
from auth import get_current_user # యూజర్ అథెంటికేషన్ కోసం

router = APIRouter(
    prefix="/products",
    tags=["Products"],
    dependencies=[Depends(get_current_user)] # అన్ని ప్రొడక్ట్ ఎండ్‌పాయింట్‌లను ప్రొటెక్ట్ చేయండి
)

class ProductBase(BaseModel):
    name: str
    description: str | None = None
    price: float
    stock: int

class ProductCreate(ProductBase):
    pass

class ProductResponse(ProductBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True

@router.get("/", response_model=list[ProductResponse])
def read_products(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    products = db.query(Product).offset(skip).limit(limit).all()
    return products

@router.get("/{product_id}", response_model=ProductResponse)
def read_product(product_id: int, db: Session = Depends(get_db)):
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if db_product is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return db_product