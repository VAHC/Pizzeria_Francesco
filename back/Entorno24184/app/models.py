from app.database import get_db

class Pizza:
    
    def __init__(self, id_pizza=None, variedad=None, ingredientes=None, tamanio=None, precio_salon=None, precio_delivery=None):
        self.id_pizza = id_pizza
        self.variedad = variedad
        self.ingredientes = ingredientes
        self.tamanio = tamanio
        self.precio_salon = precio_salon
        self.precio_delivery = precio_delivery
    
    def save(self):
        db = get_db()
        cursor = db.cursor() # cursor me permite entrar a diferentes variables
        if self.id_pizza:
            cursor.execute("""
                UPDATE pizzas SET variedad = %s, ingredientes = %s, tamanio = %s, precio_salon = %s, precio_delivery = %s
                WHERE id_pizza = %s
            """, (self.variedad, self.ingredientes, self.tamanio, self.precio_salon, self.precio_delivery, self.id_pizza))
        else:
            cursor.execute("""
                INSERT INTO pizzas (variedad, ingredientes, tamanio, precio_salon, precio_delivery) VALUES (%s, %s, %s, %s, %s)
            """, (self.variedad, self.ingredientes, self.tamanio, self.precio_salon, self.precio_delivery))
            self.id_pizza = cursor.lastrowid
        db.commit()
        cursor.close()
    
    @staticmethod
    def get_all():
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM pizzas")
        rows = cursor.fetchall()
        pizzas = [Pizza(id_pizza=row[0], variedad=row[1], ingredientes=row[2], tamanio=row[3], precio_salon=row[4], precio_delivery=row[5]) for row in rows]
        cursor.close()
        return pizzas

    @staticmethod
    def get_by_id(pizza_id):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM pizzas WHERE id_pizza = %s", (pizza_id,))
        row = cursor.fetchone()
        cursor.close()
        if row:
            return Pizza(id_pizza=row[0], variedad=row[1], ingredientes=row[2], tamanio=row[3], precio_salon=row[4], precio_delivery=row[5])
        return None

    def delete(self):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("DELETE FROM pizzas WHERE id_pizza = %s", (self.id_pizza,))
        db.commit()
        cursor.close()

    def serialize(self):
        return {
            'id_pizza': self.id_pizza,
            'variedad': self.variedad,
            'ingredientes': self.ingredientes,
            'tamanio': self.tamanio,
            'precio_salon': self.precio_salon,
            'precio_delivery': self.precio_delivery
        }

# Usuarios

class Usuario:
    
    def __init__(self, id_usuario=None, nombre=None, apellido=None, correo=None, telefono=None):
        self.id_usuario = id_usuario
        self.nombre = nombre
        self.apellido = apellido
        self.correo = correo
        self.telefono = telefono
    
    def save(self):
        db = get_db()
        cursor = db.cursor() # cursor me permite entrar a diferentes variables
        if self.id_usuario:
            cursor.execute("""
                UPDATE usuarios SET nombre = %s, apellido = %s, correo = %s, telefono = %s
                WHERE id_usuario = %s
            """, (self.nombre, self.apellido, self.correoo, self.telefono, self.id_usuario))
        else:
            cursor.execute("""
                INSERT INTO usuarios (nombre, apellido, correo, telefono) VALUES (%s, %s, %s, %s)
            """, (self.nombre, self.apellido, self.correo, self.telefono))
            self.id_pizza = cursor.lastrowid
        db.commit()
        cursor.close()
    
    @staticmethod
    def get_all():
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM usuarios")
        rows = cursor.fetchall()
        usuarios = [Usuario(id_usuario=row[0], nombre=row[1], apellido=row[2], correo=row[3], telefono=row[4]) for row in rows]
        cursor.close()
        return usuarios

    @staticmethod
    def get_by_id(usuario_id):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM usuarios WHERE id_usuario = %s", (usuario_id,))
        row = cursor.fetchone()
        cursor.close()
        if row:
            return Pizza(id_usuario=row[0], nombre=row[1], apellido=row[2], correo=row[3], telefono=row[4])
        return None

    def delete(self):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("DELETE FROM pizzas WHERE id_usuario = %s", (self.id_usuario,))
        db.commit()
        cursor.close()

    def serialize(self):
        return {
            'id_usuario': self.id_usuario,
            'nombre': self.nombre,
            'apellido': self.apellido,
            'correo': self.telefono,
            'telefono': self.telefono
        }