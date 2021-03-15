from flask import Blueprint, request, g
from models.product import Product
from serializers.product import ProductSchema
from marshmallow.exceptions import ValidationError
from decorators.secure_route import secure_route

product_schema = ProductSchema()

router = Blueprint(__name__, "product")

@router.route("/products", methods=["GET"])
def get_all_products():
    products = Product.query.all()

    return product_schema.jsonify(products, many=True), 200

@router.route("/products/<int:product_id>", methods=["GET"])
def get_single_product(product_id):
    product = Product.query.get(product_id) 

    if not product:
        return { "message": "Product does not exist" }, 404 

    return product_schema.jsonify(product), 200

@router.route("/products", methods=["POST"])
@secure_route
def post_product():
    try:
        product = product_schema.load(request.json)
        product.user = g.current_user
    except ValidationError as e:
        return { 'errors': e.messages, 'messages': 'Something went wrong' }  

    product.save()

    return product_schema.jsonify(product), 201 

@router.route("/products/<int:product_id>", methods=["PUT"])
@secure_route
def update_product(product_id):
    existing_product = Product.query.get(product_id)

    # if existing_product.user != g.current_user:
    #     return {'errors': 'Sorry - you can not edit this product'}, 402

    try:
        product = product_schema.load(
            request.json,
            instance=existing_product,
            partial=True
        )
    except ValidationError as e:
        return { 'errors': e.messages, 'messages': 'Something went wrong' }

    product.save()

    return product_schema.jsonify(product), 200   

@router.route("/products/<int:product_id>", methods=["DELETE"]) 
@secure_route  
def remove_product(product_id):
    product = Product.query.get(product_id)

    if not product:
        return {'errors': 'Sorry - could not find that product'}, 404


    if product.user != g.current_user:
        return {'errors': 'Sorry - you can not delete this product'}, 402

    product.remove()

    return { 'message': 'Product deleted successfully' }, 200