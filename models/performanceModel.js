import pool from './db.js';

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
    return rows;
};