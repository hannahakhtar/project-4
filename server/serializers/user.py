from app import ma
from models.user import User
from marshmallow import fields

class UserSchema(ma.SQLAlchemyAutoSchema):

    class Meta:
        model = User
        load_instance = True
        exclude = ('password_hash',)
        load_only = ('email', 'password')

    password = fields.String(required=True)

    #! IMPORT PRODUCT SCHEMA LATER

    product = fields.Nested('ProductSchema', many=True)
    #wishlist = fields.Nested('WishlistSchema', many=True)