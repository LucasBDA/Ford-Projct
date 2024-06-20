import google.auth.transport.requests
import pandas as pd
import google.auth
import smtplib
import json
import os
from flask import Flask, render_template, request, redirect, send_from_directory, url_for, session, flash, jsonify
from email.mime.multipart import MIMEMultipart
from werkzeug.utils import secure_filename
from email.mime.base import MIMEBase
from google.cloud import bigquery
from openpyxl import Workbook
from datetime import datetime
from email import encoders

from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField, BooleanField
from wtforms.validators import DataRequired


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

app = Flask(__name__)
app.secret_key = 'uma_chave_secreta_muito_segura'
app.config['SECRET_KEY'] = 'your_secret_key'

# Autenticação e configurações do Google Cloud
credentials, your_project_id = google.auth.default(scopes=["https://www.googleapis.com/auth/cloud-platform"])
auth_req = google.auth.transport.requests.Request()
credentials.refresh(auth_req)  # Refresh token

# Cliente do BigQuery usando as credenciais obtidas
client = bigquery.Client(credentials=credentials, project=your_project_id)
