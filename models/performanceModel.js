import pool from './db.js';

export const createPerformanceRecord = async (shipmentId, riderId, dispatchTime, deliveryTime, actualDuration, expectedDuration) => {
    const [result] = await pool.query(
        "INSERT INTO tblperformance (shipment_id, rider_id, dispatch_time, delivery_time, actual_duration_minutes, expected_duration_minutes) VALUES (?, ?, ?, ?, ?, ?)",
        [shipmentId, riderId, dispatchTime, deliveryTime, actualDuration, expectedDuration]
    );
    return result.insertId;
};

export const getShipmentsByRider = async (riderId) => {
    const [rows] = await pool.query(
        "SELECT actual_duration_minutes FROM tblperformance WHERE rider_id = ?",
        [riderId]
    );
    return rows; 
};

export const getAllPerformanceRecords = async () => {
    const [rows] = await pool.query("SELECT * FROM tblperformance");
    return rows;
};

export const getDelayedShipments = async () => {
    const [rows] = await pool.query(
        "SELECT * FROM tblperformance WHERE actual_duration_minutes > expected_duration_minutes"
    );
    return rows;
};

export const getOnTimeShipments = async () => {
    const [rows] = await pool.query(
        "SELECT * FROM tblperformance WHERE actual_duration_minutes <= expected_duration_minutes"
    );
  
export const getAllPerformanceRecords = async () => {
    const [rows] = await pool.query("SELECT * FROM tblperformance");
    return rows;
};