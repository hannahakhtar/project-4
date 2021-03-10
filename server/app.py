from flask import Flask
app = Flask(__name__)

# ! Hello world flask app to start you off. Replace this with blueprints and routers and so on.
@app.route('/api')
def index():
    return { 'message': "Hello, World!" }