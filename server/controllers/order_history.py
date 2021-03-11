from flask import Blueprint, request, g
from models.order_history import OrderHistory
from serializers.order_history import OrderHistorySchema
from marshmallow.exceptions import ValidationError
from decorators.secure_route import secure_route

order_history_schema = OrderHistorySchema()

router = Blueprint(__name__, "order_history")

# @router.route('/order-history', methods=["GET"])
# def get_all_users_order_history():
#     orders = OrderHistory.query.all()
#     return order_history_schema.jsonify(orders, many=True), 200

@router.route('/users/<int:user_id>/order-history', methods=["GET"])
@secure_route
def get_all_order_history(user_id):
    orders = OrderHistory.query.filter_by(user_id = user_id)
    if user_id != g.current_user.id:
        return {'errors': 'Sorry - you can not view this user\'s orders'}, 402
    if not orders.first():
        return {'errors': 'Could not find any orders by this ID'}, 402
    print('i am an order', order_history_schema.jsonify(orders, many=True))
    return order_history_schema.jsonify(orders, many=True), 200

@router.route('/users/<int:user_id>/order-history/<int:order_history_id>', methods=["GET"])
@secure_route
def get_one_order_history(user_id, order_history_id):
    orders = OrderHistory.query.filter_by(user_id = user_id)
    orders = orders.filter_by(id = order_history_id)
    if user_id != g.current_user.id:
        return {'errors': 'Sorry - you can not view this user\'s orders'}, 402
    if not orders.first():
        return {'errors': 'Could not find an order by this ID'}, 402
    return order_history_schema.jsonify(orders, many=True), 200     
