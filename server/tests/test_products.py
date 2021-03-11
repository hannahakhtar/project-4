from app import app, db
import json
from tests.lib import login

def test_get_products():

    client = app.test_client()
    response = client.get("/api/products")

    assert len(response.json) == 14
    assert response.status_code == 200

def test_single_products():

    client = app.test_client()
    response = client.get("/api/products/1")

    assert response.json['id'] == 1
    assert response.status_code == 200    

def test_post_product():

    client = app.test_client()

    token = login(client)

    product_data = {"product_name": "Nike running shoe", "brand": "Nike", "category": "Shoes", "condition": "Used", "description": "Black running shoe", "gender": "Unisex", "in_stock": True, "price": 15.99, "product_image": "Shoe image"}
    request_headers = {"Authorization": f"Bearer {token}"}
    product_response = client.post(
        "/api/products",
        data=json.dumps(product_data),
        content_type="application/json",
        headers=request_headers,
    )

    assert product_response.json['product_name'] == 'Nike running shoe'