import * as PerformanceModel from "../models/performanceModel.js";
import pool from '../models/db.js';

export const processDeliveryConfirmation = async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await pool.query(
            "SELECT rider_id, status, assigned_date FROM deliveries WHERE delivery_id = ?", 
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: "Delivery record not found in database." });
        }

        const deliveryDetails = rows[0];
        const dispatchTime = new Date(deliveryDetails.assigned_date);
        const deliveryTime = new Date();
        
        const actualDurationMinutes = Math.round((deliveryTime - dispatchTime) / (1000 * 60));
        const expectedDurationMinutes = 45; 

        await PerformanceModel.createPerformanceRecord(
            id,
            deliveryDetails.rider_id, 
            deliveryDetails.assigned_date,
            deliveryTime,
            actualDurationMinutes,
            expectedDurationMinutes
        );

        res.status(200).json({
            success: true,
            message: "Performance metric calculated and saved successfully.",
            metrics: {
                deliveryId: id,
                riderId: deliveryDetails.rider_id,
                actualDurationMinutes,
                status: actualDurationMinutes > expectedDurationMinutes ? "delayed" : "on-time"
            }
        });

    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};