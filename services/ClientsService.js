const BaseService = require('./BaseService');
const Airtable = require('airtable');
const apiKey =  process.env.APIKEY;
const baseId =  process.env.BASEID;

const base = new Airtable({ apiKey }).base(baseId);
const tableName = 'clientAnalytics';
module.exports = class extends BaseService {
  constructor() {
    super();
  }

  async create(req) {
    try {
      const base = new Airtable({ apiKey }).base(baseId);

      const recordData = {
        ip_address: req.body.ip_address,
        session_id: req.body.session_id,
        url: req.body.url,
        timestamp: req.body.timestamp
      };

      const table = base(tableName)

      const records = await table.select({
        view: 'Grid view'
      }).all()

      const parseRecords = records.map(el => el.fields)
      const condition = (this.findLastItemWithIpAddress(parseRecords , recordData.ip_address))

    if (!parseRecords.length || (condition.timestamp !== recordData.timestamp)) {
      base(tableName).create(recordData, (err, record) => {
        if (err) throw new Error(err)
      });
    }
      return this.response({
        statusCode: 201,
        data: {
          ip_address: req.body.ip_address,
          session_id: req.body.session_id,
          url: req.body.url,
          timestamp: req.body.timestamp
        }
      });

    } catch(error) {
      return this.serverErrorResponse(error);
    }
  }

  async get() {
    try {
      const table = base(tableName)

      const records = await table.select({
        view: 'Grid view'
      }).all()

      const parseRecords = records.map(el => el.fields)

      return this.response({
        data: parseRecords,
      });
    } catch(error) {
      return this.serverErrorResponse(error);
    }
  }

   findLastItemWithIpAddress(array, targetIpAddress) {
    for (let i = array.length - 1; i >= 0; i--) {
      if (array[i].ip_address === targetIpAddress) {
        return array[i];
      }
    }
    return null; // Return null if no item with the specific IP address is found
  }
};
