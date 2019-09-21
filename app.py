from flask import Flask, escape, request, render_template, jsonify

app = Flask(__name__, static_url_path='')

@app.route('/hello', methods=['POST'])
def hello():
  if request.method == 'POST':
    analysis(request.json)
    # ret = request.json
    print (ret)
    return jsonify(ret)
  return jsonify([])

@app.route('/')
def root():
  return render_template("index.html")

def analysis(params):
  return ['Jon Doe', 14, 15, 18, 14, 7]
