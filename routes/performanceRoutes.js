import express from 'express';
import * as PerformanceController from '../controllers/PerformanceController.js';

const performanceRoutes = express.Router();

performanceRoutes.post('/deliveries/:id/confirm', PerformanceController.processDeliveryConfirmation);

export default performanceRoutes;