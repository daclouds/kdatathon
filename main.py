from flask import Flask, escape, request, render_template, jsonify
import pandas as pd
import json
app = Flask(__name__, static_url_path='')

@app.route('/hello', methods=['POST'])
def hello():
  if request.method == 'POST':
    a = analysis(request.json)
    ret = request.json
    return jsonify(a)
  return jsonify([])

@app.route('/')
def root():
  return render_template("index.html")

def analysis(params):
  result = json.dumps(params, ensure_ascii=False)
  r = eval(result)

  from math import exp
  X =-2.456741+0.4386*int(r['gender'])-0.114148*int(r['under_gfr_min'])+0.3673*int(r['under_cr_max'])+0.604602*int(r['alt_max'])+0.069*int(r['ast_max'])+0.32*int(r['a1c_max'])+0.44*int(r['alp_max'])+0.47*int(r['bil_max'])+0.097*int(r['d1_cnt'])-0.28*int(r['hbv'])+0.015*int(r['age'])
  return round(exp(X)/(1+exp(X)), 3) * 100
  
  # data = pd.read_csv('./data.csv')
  # data_X = data.drop(['person_id','death'],axis=1)
  # data_Y = data['death']
  # from sklearn.linear_model import LogisticRegression
  # lr = LogisticRegression(C=10000)
  # lr.fit(data_X, data_Y)
  # pred_y = lr.predict(data_X)
  # return {'normal': [], 'result': pred_y[0]}
