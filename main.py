from flask import Flask, escape, request, render_template, jsonify
import pandas as pd
app = Flask(__name__, static_url_path='')

@app.route('/hello', methods=['POST'])
def hello():
  if request.method == 'POST':
    analysis(request.json)
    # ret = request.json
    # print (ret)
    return jsonify(['Jon Doe', 14, 15, 18, 14, 7])
  return jsonify([])

@app.route('/')
def root():
  return render_template("index.html")

def analysis(params):
  data = pd.read_csv('./data.csv')
  data_X = data.drop(['person_id','death'],axis=1)
  data_Y = data['death']
  from sklearn.linear_model import LogisticRegression
  lr = LogisticRegression(C=10000)
  lr.fit(data_X, data_Y)
  pred_y = lr.predict(data_X)
  print (pred_y)
  return ['Jon Doe', 14, 15, 18, 14, 7]
