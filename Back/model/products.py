from flask_restful import fields
from helpers.database import db

productsFields = {
  "id": fields.Integer,
  "title": fields.String,
  "description": fields.String,
  "value": fields.Float,
  "imgURL": fields.String
}

class Products(db.Model):
  __tablename__ = "tb_products"

  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String, nullable=False)
  description = db.Column(db.String, nullable=False)
  value = db.Column(db.Float, nullable=False)
  imgURL = db.Column(db.String, nullable=False)

  def __init__(self, title, description, value, imgURL):
    self.title = title
    self.description = description
    self.value = value
    self.imgURL = imgURL

  def __repr__(self):
    return f"<Product {self.title}>"
