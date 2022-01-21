function define(name, value) {
    Object.defineProperty(exports, name, {
        value:      value,
        enumerable: true
    });
}


define("SUCCESS_INCIDENT_RESP_CODE", "000");
define("SUCCESS_INCIDENT_RESP_DESC", "Incident report has been processed and saved successfully.");

define("FAILURE_RESP_CODE", "999");
define("FAILURE_RESP_DESC", "Request unsuccessful");

define("INCIDENTS_FOUND_RESP_CODE", "001");
define("INCIDENTS_FOUND_RESP_DESC", "Incident records found");

define("ERR_RESP_CODE", "002");
define("ERR_RESP_DESC", "Sorry we couldn't complete your request. Please try again");

define("ERR_GET_INCIDENTS_RESP_CODE", "003");
define("ERR_GET_INCIDENTS_RESP_DESC", "Sorry we couldn't fetch the incident reports. Please try again");

define("NO_INCIDENTS_RESP_CODE", "004");
define("NO_INCIDENTS_RESP_DESC", "No incident has been reported yet.");

define("EMPTY_INCIDENTS_RECORD_RESP_CODE", "010");
define("EMPTY_INCIDENTS_RECORD_RESP_DESC", "Incident records not found");

define("DB_CONN_ERR_RESP_CODE", "004");
define("DB_CONN_ERR_RESP_DESC", "Database connection error");

define("EMPTY_RECORD_RESP_CODE", "005");
define("EMPTY_RECORD_RESP_DESC", "Records not found");
