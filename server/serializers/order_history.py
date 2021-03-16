from app import ma
from models.order_history import OrderHistory
from marshmallow import fields

class OrderHistorySchema(ma.SQLAlchemyAutoSchema):
    class Meta: 
        model = OrderHistory
        load_instance = True

    user = fields.Nested('UserSchema')    
    product = fields.Nested('ProductSchema')

class SimpleOrderHistorySchema(ma.SQLAlchemyAutoSchema):
    class Meta: 
        model = OrderHistory
        load_instance = True

    user_id = fields.Integer(required=True)
    product_id = fields.Integer(required=True)