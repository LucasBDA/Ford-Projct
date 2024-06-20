from flask import *
import google.auth
from google.cloud import bigquery
import google.auth.transport.requests
import os
import tempfile
from flask_sqlalchemy import *

app = Flask(__name__)  
app.secret_key = "avd@2024"

file = "\google-auth.txt"

file_temp = os.path.join(tempfile.gettempdir() + file)

#Comandos de autenticação
'''
gcloud auth login
gcloud auth application-default login
gcloud auth application-default set-quota-project ford-851838bc7d3ff4fd361b4361
gcloud config set project ford-851838bc7d3ff4fd361b4361
enable-httpproxy
$env:http_proxy = 'http://internet.ford.com:83'
$env:https_proxy = 'http://internet.ford.com:83'
gcloud auth print-identity-token
'''

try:
  with open(file_temp, "r+") as google_file:
      content = google_file.readline()
      auth_code = int(content[14:15])
      print(auth_code)
      if(auth_code == 0):
        os.system("gcloud auth application-default login")
        os.system("gcloud auth application-default set-quota-project ford-851838bc7d3ff4fd361b4361")
        os.system("gcloud config set project ford-851838bc7d3ff4fd361b4361")
        os.system("enable-httpproxy")
        os.system("$env:http_proxy = 'http://internet.ford.com:83'")
        os.system("$env:https_proxy = 'http://internet.ford.com:83'")
        os.system("gcloud auth print-identity-token")
        google_file.seek(0)
        google_file.write("Google-auth = 1")
      else:
        print("Google authentication has already been stablished")
except:
  with open(file_temp, "w") as google_file:
    os.system("gcloud auth application-default login")
    os.system("gcloud auth application-default set-quota-project ford-851838bc7d3ff4fd361b4361")
    os.system("gcloud config set project ford-851838bc7d3ff4fd361b4361")
    os.system("enable-httpproxy")
    os.system("$env:http_proxy = 'http://internet.ford.com:83'")
    os.system("$env:https_proxy = 'http://internet.ford.com:83'")
    os.system("gcloud auth print-identity-token")
    google_file.seek(0)
    google_file.write("Google-auth = 1")


# Autenticação e configurações do Google Cloud
credentials, your_project_id = google.auth.default(scopes=["https://www.googleapis.com/auth/cloud-platform"])
auth_req = google.auth.transport.requests.Request()
credentials.refresh(auth_req)  # Refresh token

# Cliente do BigQuery usando as credenciais obtidas
client = bigquery.Client(credentials=credentials, project=your_project_id)