import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from imblearn.over_sampling import SMOTE
from sklearn.preprocessing import MinMaxScaler

# Function to preprocess data
def preprocess_data(data):
    label_encoder = LabelEncoder()
    data['gender'] = label_encoder.fit_transform(data['gender'])
    data['ever_married'] = label_encoder.fit_transform(data['ever_married'])
    data['work_type'] = label_encoder.fit_transform(data['work_type'])
    data['Residence_type'] = label_encoder.fit_transform(data['Residence_type'])
    data['smoking_status'] = label_encoder.fit_transform(data['smoking_status'])

    # Filling null values with mean
    data = data.fillna(data.mean())

    return data

# Function to balance dataset using SMOTE
def balance_dataset(X, y):
    sm = SMOTE(random_state=42)
    X_res, y_res = sm.fit_resample(X, y)
    return X_res, y_res

# Function to train logistic regression model
def train_logistic_regression(X_train, y_train):
    lr = LogisticRegression(max_iter=400)
    lr.fit(X_train, y_train)
    return lr

# Function to train random forest model
def train_random_forest(X_train, y_train):
    classifier_rf = RandomForestClassifier(n_estimators=100, random_state=42)
    classifier_rf.fit(X_train, y_train)
    return classifier_rf

# Function to preprocess input and make predictions
def make_predictions(model, input_data, scaler):
    input_data = preprocess_data(input_data)
    X = input_data.drop(['stroke', 'id'], axis=1)
    X_scaled = scaler.transform(X)  # Use the scaler fitted on training data
    return model.predict(X_scaled)

# Load the dataset
data = pd.read_csv(r'C:\Users\DELL\Desktop\Project\healthcare-dataset-stroke-data.csv')

# Preprocess data
data = preprocess_data(data)

# Split data into features and target
X = data.drop(['stroke', 'id'], axis=1)
y = data['stroke']

# Balance dataset
X_res, y_res = balance_dataset(X, y)

# Train Logistic Regression model
logistic_regression_model = train_logistic_regression(X_res, y_res)

# Train Random Forest model
random_forest_model = train_random_forest(X_res, y_res)

# Fit scaler on the training data
scaler = MinMaxScaler()
scaler.fit(X_res)

# Function to handle user input and make predictions
def get_user_input():
    # Ask for user input
    gender = int(input("Gender (Male=0, Female=1): "))
    age = float(input("Age: "))
    hypertension = int(input("Hypertension (0=No, 1=Yes): "))
    heart_disease = int(input("Heart Disease (0=No, 1=Yes): "))
    ever_married = int(input("Ever Married (0=No, 1=Yes): "))
    work_type = int(input("Work Type (0=Private, 1=Self-employed, 2=Govt_job, 3=Children, 4=Never_worked): "))
    Residence_type = int(input("Residence Type (0=Urban, 1=Rural): "))
    avg_glucose_level = float(input("Average Glucose Level: "))
    bmi = float(input("BMI: "))
    smoking_status = int(input("Smoking Status (0=Unknown, 1=Never smoked, 2=formerly smoked, 3=smokes): "))

    # Create a dictionary with input values
    input_data = {
        'gender': [gender],
        'age': [age],
        'hypertension': [hypertension],
        'heart_disease': [heart_disease],
        'ever_married': [ever_married],
        'work_type': [work_type],
        'Residence_type': [Residence_type],
        'avg_glucose_level': [avg_glucose_level],
        'bmi': [bmi],
        'smoking_status': [smoking_status]
    }

    # Create a DataFrame from input data
    input_df = pd.DataFrame(input_data)

    return input_df

# Get user input and make predictions
def predict_stroke():
    input_data = get_user_input()

    # Choose model for prediction
    model_choice = input("Select Model (1=Logistic Regression, 2=Random Forest): ")

    if model_choice == '1':
        model = logistic_regression_model
    elif model_choice == '2':
        model = random_forest_model
    else:
        print("Invalid model choice.")
        return

    # Make predictions using the selected model
    predictions = make_predictions(model, input_data, scaler)

    # Show prediction result
    if predictions[0] == 1:
        print("Prediction Result: Stroke Risk (Yes)")
    else:
        print("Prediction Result: No Stroke Risk")

# Run the prediction
predict_stroke()
