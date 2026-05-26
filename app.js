import express from "express";
import performanceRoutes from "./routes/performanceRoutes.js";                                                                     

const app = express();

//*miiddleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

try {
    app.listen(process.env.PORT || 8000, () => {     
        console.log(`Listening to port ${process.env.PORT || 8000}...`);
    });
} catch (e) {
    console.log(e);
}

app.use('/performance', performanceRoutes);

export default performanceRoutes;

