from flask import jsonify, request
from app.models import Pizza, Usuario

def index() :
    return jsonify({'message': 'Hello World API Pizza_Francesco'})

def create_pizza():
    data = request.json
    new_pizza = Pizza(variedad=data['variedad'], ingredientes=data['ingredientes'], tamanio=data['tamanio'], precio_salon=float(data['precio_salon']), precio_delivery=float(data['precio_delivery']))
    new_pizza.save()
    return jsonify({'message': 'Pizza creada exitosamente'}), 201

def get_all_pizzas():
    pizzas = Pizza.get_all()
    return jsonify([pizza.serialize() for pizza in pizzas])

def get_pizza(pizza_id):
    pizza = Pizza.get_by_id(pizza_id)
    if not pizza:
        return jsonify({'message': 'Pizza not found'}), 404
    return jsonify(pizza.serialize())

def update_pizza(pizza_id):
    pizza = Pizza.get_by_id(pizza_id)
    if not pizza:
        return jsonify({'message': 'Pizza not found'}), 404
    data = request.json
    pizza.variedad = data['variedad']
    pizza.ingredientes = data['ingredientes']
    pizza.tamanio = data['tamanio']
    pizza.precio_salon = float(data['precio_salon'])
    pizza.precio_delivery = float(data['precio_delivery'])
    pizza.save()
    return jsonify({'message': 'Pizza actualizada exitosamente'})

def delete_pizza(pizza_id):
    pizza = Pizza.get_by_id(pizza_id)
    if not pizza:
        return jsonify({'message': 'Pizza not found'}), 404
    pizza.delete()
    return jsonify({'message': 'Pizza eliminada exitosamente'})

# Usuarios

def create_usuario():
    data = request.json
    new_usuario = Usuario(nombre=data['nombre'], apellido=data['apellido'], correo=data['correo'], telefono=data['telefono'])
    new_usuario.save()
    return jsonify({'message': 'Usuario creado exitosamente'}), 201

def get_all_usuarios():
    usuarios = Usuario.get_all()
    return jsonify([Usuario.serialize() for Usuario in usuarios])

def get_usuario(usuario_id):
    usuario = Usuario.get_by_id(usuario_id)
    if not usuario:
        return jsonify({'message': 'Usuario no encontrado'}), 404
    return jsonify(usuario.serialize())

def update_usuario(usuario_id):
    usuario = Usuario.get_by_id(usuario_id)
    if not usuario:
        return jsonify({'message': 'Usuario no encontrado'}), 404
    data = request.json
    usuario.no = data['apellido']
    usuario.apellido = data['apellido']
    usuario.correo = data['correo']
    usuario.telefono = data['telefono']
    usuario.save()
    return jsonify({'message': 'Usuario actualizado exitosamente'})

def delete_usuario(usuario_id):
    usuario = Usuario.get_by_id(usuario_id)
    if not usuario:
        return jsonify({'message': 'Usuario no encontrado'}), 404
    usuario.delete()
    return jsonify({'message': 'Usuario borrado exitosamente'})