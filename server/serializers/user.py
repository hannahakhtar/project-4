from app import ma
from models.user import User
from marshmallow import fields

class UserSchema(ma.SQLAlchemyAutoSchema):

    class Meta:
        model = User
        load_instance = True
        exclude = ('password_hash',)
        load_only = ('password')

    password = fields.String(required=True)
    product = fields.Nested('ProductSchema', many=True)
    order_history = fields.Nested('OrderHistorySchema', many=True)
    wishlist = fields.Nested('WishlistSchema', many=True)

    class SimpleUserSchema(ma.SQLAlchemyAutoSchema):
        class Meta:
            model = User
            load_instance = True
            exclude = ('password_hash', 'first_name', 'last_name', 'location', 'image', 'created_at')
            load_only = ('email', 'password')

        password = fields.String(required=True)