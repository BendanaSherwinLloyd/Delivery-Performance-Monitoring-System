import pool from './db.js';

export const getAllPerformanceRecords = async () => {
    const [rows] = await pool.query("SELECT * FROM tblperformance");
    return rows;
};