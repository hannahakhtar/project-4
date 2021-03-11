from app import app, db
import json
from tests.lib import login

def test_get_user():

    client = app.test_client()
    response = client.get("/api/users")

    assert len(response.json) == 3
    assert response.status_code == 200

def test_single_user():

    client = app.test_client()
    response = client.get("/api/users/1")

    assert response.json['username'] == 'indiak'
    assert response.status_code == 200 

def test_signup():

    client = app.test_client()

    product_data = {"username": "sam", "email": "sam@sam.com", "password": "sam123", "first_name": "Sam", "last_name": "Jones", "image": "TODO", "location": "London"}
    product_response = client.post(
        "/api/signup",
        data=json.dumps(product_data),
        content_type="application/json"
    )

    assert product_response.json['username'] == 'sam'        