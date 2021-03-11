from app import ma
from models.wishlist import Wishlist
from marshmallow import fields

class WishlistSchema(ma.SQLAlchemyAutoSchema):
    class Meta: 
        model = Wishlist
        load_instance = True

    user = fields.Nested('UserSchema')    
    product = fields.Nested('ProductSchema')   

class SimpleWishlistSchema(ma.SQLAlchemyAutoSchema):
    class Meta: 
        model = Wishlist
        load_instance = True

    user_id = fields.Integer(required=True)
    product_id = fields.Integer(required=True)
