var constants = require("./constants");
const { FetchWeather } = require("./functions");
const { validationResult } = require('express-validator');

const  { SaveIncident, getAllIncidents, getClientIncidents } = require("./operations");

module.exports = {

    //Process and fetch all incidents and return in a json format 
    ProcessGetIncidents: (req, res) => {

        getAllIncidents().then( incident_reports => {
            console.log(incident_reports)

            if (incident_reports) {
                res.json({
                    resp_code: constants.INCIDENTS_FOUND_RESP_CODE,
                    resp_desc: constants.INCIDENTS_FOUND_RESP_DESC,
                    details: incident_reports
                })
            } else {
                res.json({
                    resp_code: constants.NO_INCIDENTS_RESP_CODE,
                    resp_desc: constants.NO_INCIDENTS_RESP_DESC
                })
            }
            
            
        }).catch(err => {
                console.log(err);
                res.status(500).json({resp_code: constants.ERR_GET_INCIDENTS_RESP_CODE, resp_desc: constants.ERR_GET_INCIDENTS_RESP_DESC });
            });
    },  
    
    ProcessGetClientIncidents: (req, res) => {
        const client_id = req.params.client_id

        getClientIncidents(client_id).then( incident_reports => {
            console.log(incident_reports)

            if (incident_reports) {
                res.json({
                    resp_code: constants.INCIDENTS_FOUND_RESP_CODE,
                    resp_desc: constants.INCIDENTS_FOUND_RESP_DESC,
                    details: incident_reports
                })
            } else {
                res.json({
                    resp_code: constants.NO_INCIDENTS_RESP_CODE,
                    resp_desc: constants.NO_INCIDENTS_RESP_DESC
                })
            }
            
        }).catch(err => {
                console.log(err);
                res.status(500).json({resp_code: constants.ERR_GET_INCIDENTS_RESP_CODE, resp_desc: constants.ERR_GET_INCIDENTS_RESP_DESC });
            });
    },


    //Recieve, process and save report together with weather report
    ProcessRecieveReport: (req, res) => {
        console.log(req.body)

        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
            if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { incident_desc, city, country } = req.body
        const client_id = parseInt(req.body.client_id)

        //get weather report based on provided city
        const weather_report = FetchWeather(city).then(response => {

            if (response.data.cod && response.data.cod == 200) { //check the response code status before using data. cod 200: successful

                //save incident in DB
                const weather_report = response.data;
                const data = {"client_id": client_id, "incident_desc": incident_desc, "city": city, "country": country, "weather_report": weather_report};

                SaveIncident(data, (incident_error, incident_results) => {
                    if (incident_error !== null) {
                        console.log("error on SaveIncident");
                        console.log(incident_error);
                        return res.json({resp_code: constants.DB_CONN_ERR_RESP_CODE, resp_desc: constants.DB_CONN_ERR_RESP_DESC });
                    }
                    
                    return res.json({ resp_code: constants.SUCCESS_INCIDENT_RESP_CODE, resp_desc: constants.SUCCESS_INCIDENT_RESP_DESC });
                });
                
            }else{
                console.log(response.data.message);
                return res.json({ resp_code: constants.ERR_RESP_CODE, resp_desc: constants.ERR_RESP_DESC });
            }

        }).
        catch(err => {
            console.log(err);
            return res.status(500).json({ resp_code: constants.ERR_RESP_CODE, resp_desc: constants.ERR_RESP_DESC });
        });
  
    }
}