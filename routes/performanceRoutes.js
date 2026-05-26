import express from 'express';
import * as PerformanceController from '../controllers/performanceController.js';

const performanceRoutes = express.Router();

performanceRoutes.get('/shipments/status', PerformanceController.getShipmentsStatusReport);
performanceRoutes.get('/delivery', PerformanceController.getDeliveryStatus); //to filter add "?status=on-time" or "?status=delayed"

export default performanceRoutes;