from app import db
from models.base import BaseModel

class Wishlist(db.Model, BaseModel):

    __tablename__ = 'Wishlist'
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"))
    product_id = db.Column(db.Integer, db.ForeignKey('product.id', ondelete="CASCADE"))