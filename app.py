from flask import Flask, render_template, request, jsonify
import pickle 


app = Flask(__name__)

# Connect to the database

# Load Logistic Regression model
with open('regmodel.pkl', 'rb') as f:
    regmodel = pickle.load(f)

@app.route('/')
def home():
    return render_template('homepage.html')

@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Parse form data from the request
        age = int(request.form['age'])
        sex = int(request.form['sex'])
        cp = int(request.form['cp'])
        trtbps = float(request.form['trtbps'])
        chol = int(request.form['chol'])
        fbs = int(request.form['fbs'])
        restecg = int(request.form['restecg'])
        thalachh = int(request.form['thalachh'])
        oldpeak = float(request.form['oldpeak'])
        slp = int(request.form['slp'])
        caa = int(request.form['caa'])
        thall = int(request.form['thall'])
        exng = int(request.form['exng'])

        # Prepare input data for Logistic Regression
        input_data = [[age, sex, cp, trtbps, chol, fbs, restecg, thalachh, oldpeak, slp, caa, thall, exng]]

        # Make prediction using Logistic Regression
        prediction_probabilities = regmodel.predict_proba(input_data)[0]
        
        # Get the probability of having a heart attack
        probability_of_heart_attack = prediction_probabilities[1] * 100

        return render_template('index.html', prediction_text='Probability of having a Heart Attack is: {:.2f}%'.format(probability_of_heart_attack))
    
    except Exception as e:
        # Return error response if any exception occurs
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=False)