import express from 'express';
import * as PerformanceController from '../controllers/PerformanceController.js';

const performanceRoutes = express.Router();

performanceRoutes.post('/deliveries/:id/confirm', PerformanceController.processDeliveryConfirmation);
performanceRoutes.get('/analytics/rider/:riderId', PerformanceController.getRiderAverage);
performanceRoutes.get('/shipments/status', PerformanceController.getShipmentsStatusReport);
performanceRoutes.get('/delivery', PerformanceController.getDeliveryStatus); //to filter add "?status=on-time" or "?status=delayed"

export default performanceRoutes;