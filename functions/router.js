const router = require("express").Router()
const { body } = require('express-validator');
const { ProcessRecieveReport, ProcessGetIncidents, ProcessGetClientIncidents } = require("./processor");

//endpoint req_submit_report with request body validation
router.post(
    "/req_submit_report",
    body('client_id').exists().isInt(),
    body('incident_desc').exists(),
    body('city').exists(),
    body('incident_desc').optional(), 
    ProcessRecieveReport
);

router.get("/get_incidents", ProcessGetIncidents); //Get all incidents

router.get("/get_client_incident/:client_id", ProcessGetClientIncidents); //Get all incidents

module.exports = router;