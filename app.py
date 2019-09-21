from flask import Flask, escape, request, render_template, jsonify

app = Flask(__name__, static_url_path='')

@app.route('/hello', methods=['POST'])
def hello():
  if request.method == 'POST':
    ret = analysis(request.json)
    return jsonify(ret)
  return jsonify([])

@app.route('/')
def root():
  return render_template("index.html")

def analysis(params):
  return ['Jon Doe', 14, 15, 18, 14, 7]
