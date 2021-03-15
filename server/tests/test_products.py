from app import app, db
import json
from tests.lib import login

def test_get_products():

    client = app.test_client()
    response = client.get("/api/products")

    assert len(response.json) == 18
    assert response.status_code == 200

def test_get_single_product():

    client = app.test_client()
    response = client.get("/api/products/1")

    assert response.json["brand"] == "Puma"
    assert response.status_code == 200    

def test_post_product():

    client = app.test_client()

    token = login(client)

    product_data = {"product_name": "Nike running shoe", "brand": "Nike", "category": "Shoes", "condition": "Used", "description": "Black running shoe", "gender": "Unisex", "in_stock": True, "price": 15.99, "size": "8", "product_image": "Shoe image"}
    request_headers = {"Authorization": f"Bearer {token}"}
    product_response = client.post(
        "/api/products",
        data=json.dumps(product_data),
        content_type="application/json",
        headers=request_headers,
    )

    assert product_response.json["category"] == "Shoes"

def test_delete_product():
    client = app.test_client()

    token = login(client)

    product_data = {"product_name": "Nike running shoe", "brand": "Nike", "category": "Shoes", "condition": "Used", "description": "Black running shoe", "gender": "Unisex", "in_stock": True, "price": 15.99, "size": "8", "product_image": "Shoe image"}
    request_headers = {"Authorization": f"Bearer {token}"}
    product_response = client.delete(
        "/api/products/15",
        data=json.dumps(product_data),
        content_type="application/json",
        headers=request_headers,
    )
    print(product_response.json)

    assert product_response.json['message'] == 'Product deleted successfully'
    assert product_response.status_code == 200  

def test_update_product():

    client = app.test_client()  

    token = login(client)

    update_request = {"brand": "Ted Baker"}
    request_headers = {"Authorization": f"Bearer {token}"}
    product_response = client.put(
        "/api/products/5",
        data=json.dumps(update_request),
        content_type="application/json",
        headers=request_headers,
    )

    assert product_response.json["brand"] == "Ted Baker"
    assert product_response.status_code == 200      
