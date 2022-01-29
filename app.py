from flask import Flask, jsonify, render_template, request
import json, urllib.request

# API MOCKACHINO
api = "https://www.mockachino.com/e87585d1-9630-4f"

def getResponse(api, endpoint='/'):
    handler = urllib.request.urlopen(api + endpoint)
    response = ''

    for linea in handler:
        response += linea.decode()

    return json.loads(response)

# FLASK
app = Flask(__name__, static_url_path='/static')

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/login", methods=["POST", "GET"])
def login():
    listaUsuarios = getResponse(api, "/usuarios")["usuarios"]

    if request.method == "POST":
        for usr in listaUsuarios:
            if request.form["email"] == usr["email"]:
                if request.form["password"] == usr["password"]:
                    return render_template("index.html")
    
    return render_template("login.html")

@app.route("/directores")
def getDirectores():
    return getResponse(api, "/directores")

@app.route("/generos")
def getGeneros():
    return getResponse(api, "/generos")


""" @app.route("/subir_pelicula", methods=["POST", "GET"])
def subir_pelicula():
    if request.method == "POST":
        ultimoId = listaPeliculas[-1]['id']

        data = jsonify({
            "id": ultimoId, 
            "title": request.form["title"],
            "director": request.form["director"],
            "date": request.form["date"],
            "poster": request.form["poster"],
            "overview": request.form["overview"],
            "genre": [
                    {
                        "id":0,
                        "name": request.form["genre"]
                    }
            ],
        })
    else:
        return render_template("subir_pelicula.html")

    return render_template("subir_pelicula.html") """

if __name__ == "__main__":
    app.run()



