import * as PerformanceModel from "../models/performanceModel.js";
import pool from '../models/db.js';

export const getDeliveryStatus = async (req, res) => {
    const { status } = req.query;

    try {
        let records;

        if (status === 'delayed') {
            records = await PerformanceModel.getDelayedShipments();
            records = records.map(r => ({ ...r, status: 'delayed' }));
        } else if (status === 'on-time') {
            records = await PerformanceModel.getOnTimeShipments();
            records = records.map(r => ({ ...r, status: 'on-time' }));
        } else {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid or missing status filter. Use '?status=on-time' or '?status=delayed'" 
            });
        }

        res.status(200).json({ success: true, message: records });

    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};