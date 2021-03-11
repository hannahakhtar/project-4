from app import app, db
import json
from tests.lib import login

def test_get_wishlist():
    client = app.test_client()
    token = login(client)
    request_headers = {"Authorization": f"Bearer {token}"}
    wishlist_response = client.get(
        "/api/wishlist/2",
        content_type="application/json",
        headers=request_headers,
    )
    assert len(wishlist_response.json) == 2
    assert wishlist_response.status_code == 200


def test_add_wishlist():
    client = app.test_client()
    token = login(client)
    wishlist_data = {"user_id": 2, "product_id": 1}
    request_headers = {"Authorization": f"Bearer {token}"}
    wishlist_response = client.post(
        "/api/users/2/wishlist/1",
        data=json.dumps(wishlist_data),
        content_type="application/json",
        headers=request_headers,
    )
    assert wishlist_response.status_code == 201
    assert wishlist_response.json['user_id'] == 2
    assert wishlist_response.json['product_id'] == 1

def test_delete_wishlist():
    client = app.test_client()
    token = login(client)
    wishlist_data = {"user_id": 2, "product_id": 1}
    request_headers = {"Authorization": f"Bearer {token}"}
    wishlist_response = client.delete(
        "/api/users/2/wishlist/1",
        data=json.dumps(wishlist_data),
        content_type="application/json",
        headers=request_headers,
    )
    assert wishlist_response.json['message'] == 'Wishlist item deleted successfully'
    assert wishlist_response.status_code == 200


