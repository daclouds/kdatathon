from flask import Flask, escape, request, render_template

app = Flask(__name__, static_url_path='')

# @app.route('/hello')
# def hello():
#     name = request.args.get("name", "World")
#     return 'Hello, {escape(name)}!'

@app.route('/')
def root():
    w = request.args.get('w', type = int)
    h = request.args.get('h', type = int)
    print(w, h)
    a = [w, h]
    return render_template("index.html", a=a)
