const ClientsController = require("../controllers/ClientsController");
const { Router } = require("express");

const clientsController = new ClientsController();
const router = Router();

router.post(
  "/analytics",
  clientsController.createAnalytics.bind(clientsController)
);

router.get(
    "/analytics",
    clientsController.getAnalytics.bind(clientsController)
);
module.exports = router;
