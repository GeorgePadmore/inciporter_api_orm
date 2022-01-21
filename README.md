# Incident Reporting API (ORM Version)

A sequel of the Incident Reporting API (incident_reporting_api). This uses Sequelize as the DB ORM instead of raw SQL. 
API to receive reported incidents from insurance clients and return all reported incidents. Its a 

## Installation

- clone this repo
- cd into the folder (incident_reporting_api)
- run the commands below

```bash
npm install
```
- run application with node or nodemon
```bash
node index.js 
or
nodemon index.js
```


## API Reference

#### 1. Get all items

```http
  GET /api/get_incidents
```

#### Response: {
    "resp_code": "001",
    "resp_desc": "Incident records found",
    "details": [ json_object]   
} 


#### 2. Get only items submitted by a client

```http
  GET /api/get_client_incident/:client_id
```

#### Response: {
    "resp_code": "001",
    "resp_desc": "Incident records found",
    "details": [ json_object]   
} 


#### 3. Report Incident

```http
  POST /api/req_submit_report
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `client_id`      | `integer` | **Required**. Id of the client |
| `incident_desc`  | `string` | **Required**. Description of incident |
| `city`      | `string` | **Required**. City of incident |
| `country`      | `string` | **Required**. Country of incident |


#### Response: {
    "resp_code": "000",
    "resp_desc": "Incident report has been processed and saved successfully."
}



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL`

`PORT`

`WEATHER_API_TOKEN`



## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)