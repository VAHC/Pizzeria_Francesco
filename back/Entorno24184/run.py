from flask import Flask
from flask_cors import CORS
from app.database import init_app
from app.views import *

app=Flask(__name__)

init_app(app)

CORS(app)

# Rutas de la API-REST
app.route('/', methods=['GET'])(index)
app.route('/api/pizzas/', methods=['POST'])(create_pizza)
app.route('/api/pizzas/', methods=['GET'])(get_all_pizzas)
app.route('/api/pizzas/<int:pizza_id>', methods=['GET'])(get_pizza)
app.route('/api/pizzas/<int:pizza_id>', methods=['PUT'])(update_pizza)
app.route('/api/pizzas/<int:pizza_id>', methods=['DELETE'])(delete_pizza)

# Usuarios
app.route('/api/usuarios/', methods=['POST'])(create_usuario)
app.route('/api/usuarios/', methods=['GET'])(get_all_usuarios)
app.route('/api/usuarios/<int:usuario_id>', methods=['GET'])(get_usuario)
app.route('/api/usuarios/<int:usuario_id>', methods=['PUT'])(update_usuario)
app.route('/api/usuarios/<int:usuario_id>', methods=['DELETE'])(delete_usuario)

if __name__ == '__main__' :
    app.run(debug=True)



# @app.route('/')
# def index() :
#     return 'Hola desde flask'

# @app.route('/hello')
# def saludo() :
#     return 'Buenas tardes'
