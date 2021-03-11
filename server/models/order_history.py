
from app import db, bcrypt
from models.base import BaseModel
from sqlalchemy.ext.hybrid import hybrid_property
import jwt
from datetime import *
from config.environment import secret

class OrderHistory(db.Model, BaseModel):

    __tablename__ = 'order_history'

    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"))
    product_id = db.Column(db.Integer, db.ForeignKey("product.id", ondelete="CASCADE"))

