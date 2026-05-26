import * as PerformanceModel from "../models/PerformanceModel.js";
import pool from '../models/db.js';

export const getRiderAverage = async (req, res) => {
    const { riderId } = req.params;

    try {
        const shipments = await PerformanceModel.getShipmentsByRider(riderId);
        
        if (shipments.length === 0) {
            return res.status(200).json({ success: true, message: [{ result: "No deliveries found for this rider." }] });
        }
        const totalMinutes = shipments.reduce((sum, record) => sum + (record.actualDuration || 0), 0);
        const averageTime = parseFloat((totalMinutes / shipments.length).toFixed(2));

        res.status(200).json({
            success: true,
            message: [{
                riderId,
                totalDeliveriesProcessed: shipments.length,
                averageDeliveryTimeMinutes: averageTime
            }]
        });

    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
