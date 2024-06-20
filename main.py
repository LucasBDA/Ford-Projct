from auth import *
import json

@app.route("/")
def form():
    return render_template("form.html")

@app.route("/finish-request", methods=["POST"])
def finishRequest():
    #AUTHENTICATION
    userName = request.form["full-name"]
    userCDSID = request.form["cdsid"]
    userRequest = request.form["request_name"]
    #REQUEST CLARIFICATION
    requestors = {}
    requestType = request.form["request-type"]
    requestCategory = request.form["request-category"]
    productionType = request.form["production-type"]
    requestorsNumberStr = request.form["requestor-number"]
    try:
        requestorsNumber = int(requestorsNumberStr)
    except ValueError:
        requestorsNumber = 0 

    for i in range(1, requestorsNumber + 1):
        #ESSE TRECHO DECLARA UM TEXTO           E ESSE REFERENCIA O "NAME" DO REQUEST
        requestors[f"requestor-{i}-name"] = request.form[f"requestor-{i}-name"]
        requestors[f"requestor-{i}-region"] = request.form[f"requestor-{i}-region"]
        requestors[f"requestor-{i}-cdsid"] = request.form[f"requestor-{i}-cdsid"]

    


@app.route("/vehicle-models", methods=["GET"])
def getVehiclesModels():
    query = "SELECT Model_line FROM `ford-b8f83ad18aa1cacd78847aca.Tables.Veh_Trim_Level` GROUP BY Model_line ORDER BY Model_line ASC"
    results = client.query(query).result()
    modelsList = []
    for model in results:
        modelsList.append(model["Model_line"])
    return jsonify(modelsList)

@app.route("/vehicle-year/<string:model>", methods=["GET"])
def getYearModel(model):
    query = f'SELECT DISTINCT model_year FROM `ford-b8f83ad18aa1cacd78847aca.Tables.Veh_Trim_Level` WHERE TRIM(Model_line) = "{model}" ORDER BY model_year ASC'
    results = client.query(query).result()
    yearList = []
    for year in results:
        yearList.append(year["model_year"])  
    return jsonify(yearList)

@app.route("/vehicle-maker/<string:model>/<string:year>", methods=["GET"])
def getMaker(model, year):
    query = f'SELECT DISTINCT make FROM `ford-b8f83ad18aa1cacd78847aca.Tables.Veh_Trim_Level` WHERE TRIM(Model_line) = "{model}" AND model_year = "{year}"'
    results = client.query(query).result()
    makerList = []
    for maker in results:
        makerList.append(maker["make"])
    return jsonify(makerList)

@app.route("/vehicle-series/<string:model>/<string:year>/<string:maker>", methods=["GET"])
def getSeries(model, year, maker):
    query = f'SELECT DISTINCT Model_Series FROM `ford-b8f83ad18aa1cacd78847aca.Tables.Veh_Trim_Level` WHERE TRIM(Model_line) = "{model}" AND model_year = "{year}" AND TRIM(make) = "{maker}" ORDER BY Model_Series'
    results = client.query(query).result()
    seriesList = []
    for series in results:
        if series != "" and series != " ":
         seriesList.append(series["Model_Series"])
    return jsonify(seriesList)

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))