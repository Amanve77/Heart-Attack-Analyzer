function calculateRisk() {
    var formData = {
        age: parseInt(document.forms['calculator']['age'].value),
        sex: document.forms['calculator']['sex'].checked ? 1 : 0,
        cp: parseInt(document.forms['calculator']['cp'].value),
        trtbps: parseInt(document.forms['calculator']['trtbps'].value),
        chol: parseInt(document.forms['calculator']['chol'].value),
        fbs: parseInt(document.forms['calculator']['fbs'].value),
        restecg: parseInt(document.forms['calculator']['restecg'].value),
        thalachh: parseInt(document.forms['calculator']['thalachh'].value),
        oldpeak: parseFloat(document.forms['calculator']['oldpeak'].value),
        slp: parseInt(document.forms['calculator']['slp'].value),
        caa: parseInt(document.forms['calculator']['caa'].value),
        thall: parseInt(document.forms['calculator']['thall'].value),
        exng: document.forms['calculator']['exng'].checked ? 1 : 0
    };

    for (var key in formData) {
        if (formData.hasOwnProperty(key) && (formData[key] === "" || isNaN(formData[key]))) {
            alert("Please fill in all fields with valid numeric values.");
            return false;
        }
    }

    if (isNaN(formData.age) || formData.age <= 0) {
        alert("Please enter a valid age.");
        return false;
    }

    var numericFields = ['trtbps', 'chol', 'oldpeak', 'slp', 'caa', 'thalachh'];
    for (var i = 0; i < numericFields.length; i++) {
        if (isNaN(formData[numericFields[i]]) || formData[numericFields[i]] <= 0) {
            alert("Please enter valid numeric values for blood pressure, cholesterol, oldpeak, slope, number of major vessels, and thallium stress test result.");
            return false;
        }
    }

    fetch('/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        var resultDiv = document.getElementById('predictionResult');
        resultDiv.innerHTML = 'Prediction: ' + data.prediction + ', Predicted Class: ' + data.predicted_class;
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while processing the request.');
    });

    return true;
}

