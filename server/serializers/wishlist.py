from app import ma
from models.wishlist import Wishlist
from marshmallow import fields

class WishlistSchema(ma.SQLAlchemyAutoSchema):
    class Meta: 
        model = Wishlist
        load_instance = True

    user = fields.Nested('UserSchema')    
    product = fields.Nested('ProductSchema')    
