import express from "express";
import 'dotenv/config.js';
import authRoutes from "./routes/authRoute.js";                                                                                

const app = express();

//*miiddleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

try {
    app.listen(process.env.PORT || 3000, () => {     
        console.log(`Listening to port ${process.env.PORT || 3000}...`);
    });
} catch (e) {
    console.log(e);
}

export default performanceRoutes;

