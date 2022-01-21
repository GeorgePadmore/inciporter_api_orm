const { Incident } = require("../models");


module.exports = {

    getAllIncidents: () => new Promise((resolve, reject) => {

        try {

            Incident.findAll({
                attributes: ['client_id', 'incident_desc', 'city', 'country', 'weather_report', 'createdAt']
            }).then((incidents) => {
                resolve(incidents);
            }).catch((error) => {
                console.log('error in query', {error});
                throw error;
            });
            
        } catch (error) {
            throw error;
        }

    }),

    getClientIncidents: (client_id) => new Promise((resolve, reject) => {

        try {

            Incident.findAll({
                attributes: ['client_id', 'incident_desc', 'city', 'country', 'weather_report', 'createdAt'],
                where: {
                    client_id: client_id
                }
            }).then((incidents) => {
                resolve(incidents);
            }).catch((error) => {
                console.log('error in query', {error});
                throw error;
            });

        } catch (error) {
            throw error;
        }

    }),
  
    SaveIncident: (data, callback) =>  {

        try {

            Incident.create({
                client_id: data.client_id, 
                incident_desc: data.incident_desc, 
                city: data.city,
                country: data.country,
                weather_report: data.weather_report
            }).catch((error) => {
                console.log('error in query', {error});
                throw error;
            });

            return callback(null, true);

        } catch (error) {
            throw error;
        }

    },
    
}