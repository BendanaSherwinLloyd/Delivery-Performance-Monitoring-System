import pool from './db.js';

export const createPerformanceRecord = async (shipmentId, riderId, dispatchTime, deliveryTime, actualDuration, expectedDuration) => {
    const [result] = await pool.query(
        "INSERT INTO tblperformance (shipment_id, rider_id, dispatch_time, delivery_time, actual_duration_minutes, expected_duration_minutes) VALUES (?, ?, ?, ?, ?, ?)",
        [shipmentId, riderId, dispatchTime, deliveryTime, actualDuration, expectedDuration]
    );
    return result.insertId;
};