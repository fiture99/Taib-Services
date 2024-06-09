from flask import Flask, jsonify, request,redirect, url_for
from data import db, Services, Providers, Customers, Requests
from flask_bcrypt import Bcrypt 
import os
from flask_cors import CORS
from datetime import datetime
import jwt

# app = Flask(__name__)

# #Configuring our sample database on ElephantSQL for now, until AWS is set up

app = Flask(__name__)
cors = CORS(app)
# migrate = Migrate(app, db)
#Configuring our sample database on ElephantSQL for now, until AWS is set up

# app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://wkqmjhrt:FLZo15GpZ1jvzZ85Qkfm_TPIEv2G5s3e@rain.db.elephantsql.com/wkqmjhrt"
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost/taibservices'

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost/taibservices'

db.init_app(app)

bcrypt = Bcrypt(app)
# Create the tables before running the application
with app.app_context():
    db.create_all()




# SECRET_KEY = 'your_secret_key'  # Make sure to use a secure key

# def get_authenticated_customer_id():
#     auth_header = request.headers.get('Authorization')
#     if auth_header:
#         try:
#             token = auth_header.split(" ")[1]
#             payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
#             return payload.get('customer_id')
#         except jwt.ExpiredSignatureError:
#             return None
#         except jwt.InvalidTokenError:
#             return None
#     return None

# @app.route("/auth/customer", methods=["GET"])
# def get_authenticated_customer():
#     authenticated_customer_id = get_authenticated_customer_id()
#     if authenticated_customer_id:
#         customer = Customers.query.filter_by(_id=authenticated_customer_id).first()
#         if customer:
#             customer_info = {
#                 "id": customer._id,
#                 "first_name": customer.first_name,
#                 "last_name": customer.last_name,
#                 "email": customer.email,
#                 # Add other attributes if needed
#             }
#             return jsonify(customer_info), 200
#     return jsonify({"error": "Customer not found"}), 404


# Route for adding a new provider

@app.route("/login", methods=['GET', 'POST'])
def login():
    data = request.json

    email = data.get("email")
    password = data.get( "password" )
    customerId = data.get("_id")

    #  Check if user exists in database
    user = Providers.query.filter_by(email=email).first() or Customers.query.filter_by(email=email).first()
    if not user:
        return jsonify({'error': 'Invalid Username or Password'}), 404

    # Check if the password is correct
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({'error': 'Invalid Username or Password'}), 401
    

     # Determine the user's role
    if user._type == 'provider':
        
        # Redirect to the Provider Page
        return redirect(url_for('provider_page'))
    
    elif user._type == 'customer':
        
        # Redirect to the User Page
        return redirect(url_for('customer_page'))
    
    else:
         return jsonify({'error': 'Unknown user type'}), 500

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    data = request.json

    # Extract user data from the request
    # email = data.get('email')
    # password = data.get('password')
    # # role = data.get('role')

    # # Validate the received data
    # if not email or not password:
    return jsonify({'error': 'Email and password are required'})

@app.route("/provider_page")
def provider_page():
#    return jsonify({'provider': 'Welcome to the provider Page'}), 201
    # Assume you have a variable `user_type` that holds the user type
    user_type = 'provider'
    return jsonify({'user_type': user_type, 'message': 'Welcome to the provider Page '}), 200




@app.route("/customer_page")
def customer_page():
    user_type = 'customer'
    return jsonify({'user_type': user_type, 'message': 'Welcome to the Customer Page '}), 200


@app.route("/provider/provider_register", methods=["POST"])
def register_provider():
    data = request.json

    # Extract required fields from the JSON data
    email = data.get('email')
    password = data.get('password')
    first_name = data.get('firstName')
    last_name = data.get('lastName')
    address = data.get('address')
    profession = data.get('profession')
    contact_no = data.get('contact')
    gender = data.get('gender')


    # Hash the password
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        # Validation
    if not email or not password or not first_name or not last_name or not address or not gender:
        return jsonify({'error': 'Missing required fields'}), 400

    # Check if the email is already registered
    existing_user = Providers.query.filter_by(email=email).first() or Customers.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'error': 'Email is already registered'}), 409

    # Create a new provider
    new_provider = Providers(
        email=email,
        password=hashed_password,
        _type="provider",
        first_name=first_name,
        last_name=last_name,
        address=address,
        profession=profession,
        contact_no=contact_no,
        gender=gender,
    )

    # Add the new provider to the database
    db.session.add(new_provider)
    db.session.commit()
    full_name = "{} {}".format(first_name, last_name)
    return jsonify({'message': 'Provider {} registered successfully'.format(full_name)}), 201

# Route for getting all providers
@app.route("/provider/service_providers", methods=["GET"])
def get_registered_providers():
    # Query all registered providers
    registered_providers = Providers.query.filter_by(_type="provider").all()

    # Prepare the response data
    provider_data = []
    for provider in registered_providers:
        provider_info = {
            "id": provider._id,
            "first_name": provider.first_name,
            "last_name": provider.last_name,
            "email": provider.email,
            "address": provider.address,
            "contact_no": provider.contact_no,
            "profession": provider.profession,
            # Add other attributes if needed
        }
        provider_data.append(provider_info)

    return jsonify(provider_data), 200



# route for adding a new Customer
@app.route("/customer/customer_registration", methods=['POST'])
def register_customer():
    data = request.json

    # Extract required fields from the JSON data
    email = data.get('email')
    password = data.get('password')
    first_name = data.get('firstName')
    last_name = data.get('lastName')
    address = data.get('address')
    street_no = data.get('street')
    contact_no = data.get('contact')
    gender = data.get('gender')


    # Hash the password
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        # Validation
    if not email or not password or not first_name or not last_name or not address or not gender:
        return jsonify({'error': 'Missing required fields'}), 400

    # Check if the email is already registered
    existing_user = Providers.query.filter_by(email=email).first() or Customers.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'error': 'Email is already registered'}), 409

    # Create a new provider
    new_customer = Customers(
        email=email,
        password=hashed_password,
        _type="customer",
        first_name=first_name,
        last_name=last_name,
        address=address,
        street_no =street_no,
        contact_no=contact_no,
        gender=gender,
    )

    # Add the new Cutomer to the database
    db.session.add(new_customer)
    db.session.commit()
    full_name = "{} {}".format(first_name, last_name)
    return jsonify({'message': 'Customer {} registered successfully'.format(full_name)}), 201




# Route for getting all Customer
@app.route("/customer/customers", methods=["GET"])
def get_registered_customers():
    # Query all registered providers
    registered_customers = Customers.query.filter_by(_type="customer").all()

    # Prepare the response data
    customer_data = []
    for customer in registered_customers:
        customer_info = {
            "id": customer._id,
            "first_name": customer.first_name,
            "last_name": customer.last_name,
            "email": customer.email,
            # "address": address,
            # Add other attributes if needed
        }
        customer_data.append(customer_info)

    return jsonify(customer_data), 200


# Route for adding a new service
@app.route("/add_services", methods=["POST"])
def add_service():
    # Extract JSON data from the HTTP request
    data = request.json

    # Process the JSON data, perform validation, etc.
    service_name = data.get('name')
    category = data.get('category')
    description = data.get('description')
    provider_id = data.get('provider')  # Assuming provider ID is provided in the request

    # Example validation
    if not service_name or not category or not description or not provider_id:
        return jsonify({'error': 'Missing required fields'}), 400

    # Retrieve the provider object based on the provided ID
    provider = Providers.query.get(provider_id)
    if not provider:
        return jsonify({'error': 'Provider not found'}), 404

    # Create a new service object
    new_service = Services(
        service_name=service_name,
        category=category,
        description=description,
        provider=provider
    )

    # Add the new service to the database
    db.session.add(new_service)
    db.session.commit()

    return jsonify({'message': 'Service added successfully'}), 201




# Route for getting all services
@app.route("/services", methods=["GET"])
def get_all_services():
    services = Services.query.all()
    service_list = []
    for service in services:
        service_data = {
            "id": service._id,
            "service_name": service.service_name,
            "category": service.category,
            "description": service.description,
            "provider_id": service.provider_id
        }
        service_list.append(service_data)
    return jsonify(service_list), 200



@app.route("/requests", methods=['POST'])
def requests():
    data = request.json

    customer_id = data.get('customer_id')
    provider_id = data.get('provider_id')
    request_details = data.get('request_details')
    status = data.get('status','pending')
    date = datetime.now()

    if not customer_id or not provider_id or not request_details or not date:
        return jsonify({'error': 'Invalid request'}), 400
    
    new_request = Requests(
        customer_id=customer_id,
        provider_id=provider_id,
        request_details=request_details,
        status=status,
        date=date,
    )

    db.session.add(new_request)
    db.session.commit()
    return jsonify({'message': 'Request added successfully'}), 201
        

@app.route("/customer/<int:customer_id>/requests", methods=['GET'])
def get_customer_requests(customer_id):
    try:
        requests = Requests.query.filter_by(customer_id=customer_id).all()
        if not requests:
            return jsonify({'error': 'No requests found'}), 404

        request_list = [
            {
                'id': request._id,
                'customer_id':request.customer_id,
                'provider_id': request.provider_id,
                'request_details': request.request_details,
                'status': request.status,
                'date': request.date.isoformat() if request.date else None
            }
            for request in requests
        ]
        return jsonify(request_list), 200
        
    except Exception as e:
        print(f"Error fetching File {e}")
        return jsonify({'error':'Fail to fetch the request'})





if __name__ == "__main__":
   app.run(debug=True, port=8080)

    