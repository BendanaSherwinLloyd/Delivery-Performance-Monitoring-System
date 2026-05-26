import * as PerformanceModel from "../models/performanceModel.js";
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
      
export const getShipmentsStatusReport = async (req, res) => {
    const { filter } = req.query;

    try {
        const records = await PerformanceModel.getAllPerformanceRecords();
        const categorized = records.map(record => {
            const actual = record.actual_duration_minutes || record.actualDuration || 0;
            const expected = record.expected_duration_minutes || record.expectedDuration || 45;
            
            const isDelayed = actual > expected;
            return {
                ...record,
                status: isDelayed ? "delayed" : "on-time"
            };
        });

        let finalOutput = categorized;
        if (filter === 'on-time' || filter === 'delayed') {
            finalOutput = categorized.filter(item => item.status === filter);
        }

        res.status(200).json({ success: true, message: finalOutput });

    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
