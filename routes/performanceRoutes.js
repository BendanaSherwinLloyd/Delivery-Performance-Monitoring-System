import express from 'express';
import * as PerformanceController from '../controllers/performanceController.js';

const performanceRoutes = express.Router();

performanceRoutes.get('/analytics/rider/:riderId', PerformanceController.getRiderAverage);
performanceRoutes.get('/shipments/status', PerformanceController.getShipmentsStatusReport);

export default performanceRoutes;