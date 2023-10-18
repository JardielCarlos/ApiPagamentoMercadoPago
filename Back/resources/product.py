from flask_restful import Resource, marshal, reqparse
from model.products import Products, productsFields
from helpers.database import db

parser = reqparse.RequestParser()


parser.add_argument("title", type=str, help="title não informado", required=True)
parser.add_argument("description", type=str, help="description não informada", required=True)
parser.add_argument("value", type=float, help="value não informado", required=True)
parser.add_argument("imgURL", type=str, help="title não informado", required=True)

class Product(Resource):
  def get(self):
    products = Products.query.all()
    return marshal(products, productsFields), 200
  
  def post(self):
    args = parser.parse_args()

    product = Products(args['title'],args['description'],args['value'],args['imgURL'])
    
    db.session.add(product)
    db.session.commit()

    return marshal(product, productsFields), 201
