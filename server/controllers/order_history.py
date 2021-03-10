from flask import Blueprint, request, g
from models.order_history import OrderHistory
from serializers.order_history import OrderHistorySchema
from marshmallow.exceptions import ValidationError
from decorators.secure_route import secure_route

order_history_schema = OrderHistorySchema()

router = Blueprint(__name__, "order_history")

# ! get all previous orders

@router.route('/users/<int:user_id>/order-history', methods=["GET"])
def get_all_order_history(user_id):
    orders = OrderHistory.query.get(user_id)
    return order_history_schema.jsonify(orders, many=True), 200

# ! get a specific previous order

