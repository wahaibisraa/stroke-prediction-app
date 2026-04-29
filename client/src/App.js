import React, { useState, useEffect } from 'react';
import { Container, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';

function App() {
  const [inputs, setInputs] = useState({
    gender: '',
    age: '',
    hypertension: '',
    heart_disease: '',
    ever_married: '',
    work_type: '',
    Residence_type: '',
    avg_glucose_level: '',
    bmi: '',
    smoking_status: '',
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState('');
  const [prevInputs, setPrevInputs] = useState(null); // Store previous inputs

  // Handle input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  // Function to handle form submission and prediction
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if all fields are filled
    for (const key in inputs) {
      if (inputs[key] === '') {
        setError('Please fill in all the fields');
        return;
      }
    }

    setError('');

    // If the inputs haven't changed, don't make a new prediction
    if (JSON.stringify(inputs) === JSON.stringify(prevInputs)) {
      return; // Skip prediction
    }

    // Simulated API call for prediction
    const response = await fakePredictionAPI(inputs);
    setPrediction(response.prediction);
    setPrevInputs(inputs); // Save the current inputs for future comparisons
  };

  // Simulated API call
  const fakePredictionAPI = async (data) => {
    const strokeRisk = Math.random() > 0.5 ? 1 : 0; // Randomly predicting stroke risk
    return { prediction: strokeRisk };
  };

  return (
    <Container>
      <h1 className="my-4 text-center">Stroke Prediction App</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="gender">Gender</Label>
          <Input type="select" name="gender" id="gender" value={inputs.gender} onChange={handleInputChange}>
            <option value="">Select</option>
            <option value="0">Male</option>
            <option value="1">Female</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="age">Age</Label>
          <Input
            type="number"
            name="age"
            id="age"
            value={inputs.age}
            onChange={handleInputChange}
            placeholder="Enter age"
          />
        </FormGroup>
        <FormGroup>
          <Label for="hypertension">Hypertension</Label>
          <Input type="select" name="hypertension" id="hypertension" value={inputs.hypertension} onChange={handleInputChange}>
            <option value="">Select</option>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="heart_disease">Heart Disease</Label>
          <Input type="select" name="heart_disease" id="heart_disease" value={inputs.heart_disease} onChange={handleInputChange}>
            <option value="">Select</option>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="ever_married">Ever Married</Label>
          <Input type="select" name="ever_married" id="ever_married" value={inputs.ever_married} onChange={handleInputChange}>
            <option value="">Select</option>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="work_type">Work Type</Label>
          <Input type="select" name="work_type" id="work_type" value={inputs.work_type} onChange={handleInputChange}>
            <option value="">Select</option>
            <option value="0">Private</option>
            <option value="1">Self-employed</option>
            <option value="2">Govt_job</option>
            <option value="3">Children</option>
            <option value="4">Never_worked</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="Residence_type">Residence Type</Label>
          <Input type="select" name="Residence_type" id="Residence_type" value={inputs.Residence_type} onChange={handleInputChange}>
            <option value="">Select</option>
            <option value="0">Urban</option>
            <option value="1">Rural</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="avg_glucose_level">Average Glucose Level</Label>
          <Input
            type="number"
            name="avg_glucose_level"
            id="avg_glucose_level"
            value={inputs.avg_glucose_level}
            onChange={handleInputChange}
            placeholder="Enter glucose level"
          />
        </FormGroup>
        <FormGroup>
          <Label for="bmi">BMI</Label>
          <Input
            type="number"
            name="bmi"
            id="bmi"
            value={inputs.bmi}
            onChange={handleInputChange}
            placeholder="Enter BMI"
          />
        </FormGroup>
        <FormGroup>
          <Label for="smoking_status">Smoking Status</Label>
          <Input type="select" name="smoking_status" id="smoking_status" value={inputs.smoking_status} onChange={handleInputChange}>
            <option value="">Select</option>
            <option value="0">Unknown</option>
            <option value="1">Never smoked</option>
            <option value="2">Formerly smoked</option>
            <option value="3">Smokes</option>
          </Input>
        </FormGroup>
        <Button type="submit" color="primary">Predict Stroke Risk</Button>
      </Form>

      {error && <Alert color="danger" className="my-3">{error}</Alert>}

      {prediction !== null && (
        <div className="my-4">
          <h3>Prediction Result:</h3>
          <Alert color={prediction === 1 ? "danger" : "success"}>
            {prediction === 1 ? 'Risk of Stroke' : 'No Stroke Risk'}
          </Alert>
        </div>
      )}
    </Container>
  );
}

export default App;
