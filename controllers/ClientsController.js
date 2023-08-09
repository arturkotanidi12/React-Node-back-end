const ClientsService = require("../services/ClientsService");

class ClientsController {
  constructor() {
    this.clientsdService = new ClientsService();
  }

  async createAnalytics(req, res) {
    const data = await this.clientsdService.create(req);
    res.status(data.statusCode).json(data);
  }

  async getAnalytics(req, res) {
    const data = await this.clientsdService.get(req);
    res.status(data.statusCode).json(data);
  }
}

module.exports = ClientsController;
