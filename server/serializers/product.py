from app import ma
from models.product import Product
from marshmallow import fields

class ProductSchema(ma.SQLAlchemyAutoSchema):
    class Meta: 
        model = Product
        load_instance = True

    # user = fields.Nested('UserSchema')    
