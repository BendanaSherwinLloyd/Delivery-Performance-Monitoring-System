import * as PerformanceModel from "../models/performanceModel.js";
import pool from '../models/db.js';

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