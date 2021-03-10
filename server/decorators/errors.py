from app import app
from flask import Flask, jsonify
from marshmallow.exceptions import ValidationError


@app.errorhandler(ValidationError)
def validation_error(e):
    return {"errors": e.messages, "messages": "Something went wrong"}

@app.errorhandler(Exception)
def general_error(e):
    return {"errors": str(e), "messages": "Something went wrong"}
