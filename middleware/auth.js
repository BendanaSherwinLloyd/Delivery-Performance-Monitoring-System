import jwt from 'jsonwebtoken';
import pool from '../models/db.js';

const JWT_SECRET = process.env.JWT_SECRET

export async function checkSystemUser(req, res, next) {
  try {
    const authHeader = req.headers.authorization || '';

if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: "Unauthorized. Token missing or invalid format." });
}

const token = authHeader.slice(7);

    const decoded = jwt.verify(token, JWT_SECRET);
    const [rows] = await pool.query('SELECT rider_id FROM riders WHERE rider_id = ?', [decoded.rider_id]);

    if (!rows.length) {
      return res.status(401).json({ message: 'Unauthorized rider account.' });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token signature validation verification error.' });
  }
}