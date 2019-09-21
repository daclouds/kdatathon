from flask import Flask, escape, request, render_template, jsonify
import pandas as pd
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
  data = pd.read_csv('''
  person_id,visit_duration,visit_cnt,gender,is_condition,is_drug1,under_cr_max,under_gfr_min,alt_max,ast_max,alp_max,bil_max,a1c_max,afb,culture,hbv,hcv,d1_cnt,d1_duration,d2_cnt,d2_duration,is_aids,death,age,period,failure
0,241164,1,4,1,0,1,0,0,0,0,0,0,0,0.0,0.0,0.0,0.0,1.0,90.0,0.0,0.0,0.0,0,8.0,86,0
1,19642,1,2,1,0,1,0,0,0,0,0,0,0,0.0,0.0,0.0,0.0,1.0,90.0,0.0,0.0,0.0,0,3.0,92,0
''')
  data_X = data.drop(['person_id','death'],axis=1)
  data_Y = data['death']
  from sklearn.linear_model import LogisticRegression
  lr = LogisticRegression(C=10000)
  lr.fit(data_X, data_Y)
  pred_y = lr.predict(data_X)
  return ['Jon Doe', 14, 15, 18, 14, 7]
