from flask_sqlalchemy import SQLAlchemy

from sqlalchemy import create_engine
from sqlalchemy.dialects.postgresql import JSON


db = SQLAlchemy()

class Providers(db.Model):
    _id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    _type = db.Column(db.String(20), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    profile = db.Column(db.JSON)
    address = db.Column(db.String(100), nullable=False)
    profession = db.Column(db.String(100), nullable=False)
    contact_no = db.Column(db.BigInteger) 
    gender = db.Column(db.String(10), nullable=False)
    settings = db.Column(db.JSON)

class Customers(db.Model):
    _id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    _type = db.Column(db.String(20), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    profile = db.Column(db.JSON)
    address = db.Column(db.String(100), nullable=False)
    street_no = db.Column(db.String(100), nullable=False)
    contact_no = db.Column(db.BigInteger) 
    gender = db.Column(db.String(10), nullable=False)
    settings = db.Column(db.JSON)

class Services(db.Model):
    _id = db.Column(db.Integer, primary_key=True)
    service_name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(200), nullable=False)
    description = db.Column("about", db.Text)
    provider_id = db.Column(db.Integer, db.ForeignKey('providers._id'), nullable=False)
    provider = db.relationship('Providers', backref=db.backref('services', lazy=True))
    
class Requests(db.Model):
    _id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers._id'), nullable=False)
    provider_id = db.Column(db.Integer, db.ForeignKey('providers._id'), nullable=False)

    request_details = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(20), default='pending')
    date = db.Column(db.DateTime, nullable=False)

    customer = db.relationship('Customers', backref=db.backref('requests', lazy=False))
    provider = db.relationship('Providers', backref=db.backref('requests', lazy=False))













