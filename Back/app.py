from flask import Flask
from flask_restful import Api
from helpers.database import db, migrate
from helpers.configCORS import cors
from resources.product import Product

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:senhasecreta@localhost:5432/apiMercadoPago"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
cors.init_app(app)
migrate.__init__(app, db)
api = Api(app)

api.add_resource(Product, '/products')

if __name__ == '__main__':
  app.run(debug=True)