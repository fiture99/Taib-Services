from flask import Flask, jsonify, request,redirect, url_for
from provider import db, Services, Users, Customers
from flask_bcrypt import Bcrypt 
import os
from flask_cors import CORS







# app = Flask(__name__)

# #Configuring our sample database on ElephantSQL for now, until AWS is set up

app = Flask(__name__)
cors = CORS(app)

#Configuring our sample database on ElephantSQL for now, until AWS is set up

# app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://wkqmjhrt:FLZo15GpZ1jvzZ85Qkfm_TPIEv2G5s3e@rain.db.elephantsql.com/wkqmjhrt"
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost/taibservices'

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost/taibservices'

db.init_app(app)

bcrypt = Bcrypt(app)
# Create the tables before running the application
with app.app_context():
    db.create_all()

# @app.route("/provider/register",methods=["POST"])
# # def create_provider():

#     #Extract JSON Data from the http request
    
#     #Process the JSON Data, Validation or any other operations including the file upload


#     #Return a JSON response which looks like this, we might have additional things later on.

#    new_user = Users(
#       first_name= "John Doe",
#       last_name= "John Doe", 
#       email= "johndoe@example.com",
#       _type= "customer",
#       password= "hashed_password",
#       profile= {},
#       settings= {} 
#       )
      
#    db.session.add(new_user)
#    db.session.commit()
#    return jsonify({'message': 'User created successfully'}), 201

@app.route("/api/home", methods=['GET'])
def member():
    return jsonify({
        "message": "Hello Lamin Jawneh!"
                    
    })
# Route for adding a new provider

@app.route("/login", methods=['GET', 'POST'])
def login():
    data = request.json

    email = data.get("email")
    password = data.get( "password" )

    #  Check if user exists in database
    user = Users.query.filter_by(email=email).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404

    # Check if the password is correct
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({'error': 'Invalid password'}), 401
    

     # Determine the user's role
    if user._type == 'provider':
        
        # Redirect to the Provider Page
        return redirect(url_for('provider_page'))
    
    elif user._type == 'customer':
        
        # Redirect to the User Page
        return redirect(url_for('customer_page'))
    
    else:
         return jsonify({'error': 'Unknown user type'}), 500



@app.route("/provider_page")
def provider_page():
    return("Welcomw to the Providers Page")



@app.route("/customer_page")
def customer_page():
    return("Welcome to Customer Page")


@app.route("/provider/provider_register", methods=["POST"])
def register_provider():
    data = request.json

    # Extract required fields from the JSON data
    email = data.get('email')
    password = data.get('password')
    first_name = data.get('first_name')
    last_name = data.get('last_name')


    # Hash the password
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        # Validation
    if not email or not password or not first_name or not last_name:
        return jsonify({'error': 'Missing required fields'}), 400

    # Check if the email is already registered
    existing_user = Users.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'error': 'Email is already registered'}), 409

    # Create a new provider
    new_provider = Users(
        email=email,
        password=hashed_password,
        _type="provider",
        first_name=first_name,
        last_name=last_name,
    )

    # Add the new provider to the database
    db.session.add(new_provider)
    db.session.commit()

    return jsonify({'message': 'Provider registered successfully'}), 201

# Route for getting all providers
@app.route("/provider/service_providers", methods=["GET"])
def get_registered_providers():
    # Query all registered providers
    registered_providers = Users.query.filter_by(_type="provider").all()

    # Prepare the response data
    provider_data = []
    for provider in registered_providers:
        provider_info = {
            "id": provider._id,
            "first_name": provider.first_name,
            "last_name": provider.last_name,
            "email": provider.email,
            # Add other attributes if needed
        }
        provider_data.append(provider_info)

    return jsonify(provider_data), 200



# route for adding a new Customer
@app.route("/customer/customer_registration", methods=['POST'])
def customer_registration():
    data = request.json

    email = data.get('email')
    password = data.get('password')
    first_name = data.get('first_name')
    last_name = data.get('last_name')


      # Hash the password
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        # Validation
    if not email or not password or not first_name or not last_name:
        return jsonify({'error': 'Missing required fields'}), 400

    # Check if the email is already registered
    existing_user = Users.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'error': 'Email is already registered'}), 409

    # Create a new provider
    new_customer = Customers(
        email=email,
        password=hashed_password,
        _type="customer",
        first_name=first_name,
        last_name=last_name,
    )

    # Add the new provider to the database
    db.session.add(new_customer)
    db.session.commit()

    return jsonify({'message': 'Provider registered successfully'}), 201


# Route for adding a new service
@app.route("/services", methods=["POST"])
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
    provider = Users.query.get(provider_id)
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




if __name__ == "__main__":
   app.run(debug=True, port=8080)

    