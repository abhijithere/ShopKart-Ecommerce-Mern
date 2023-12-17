import express from "express"
import dotenv from "dotenv"
import router from './routes/productRoute.js'
import { errorMiddleware } from "./middleware/error.js";
import userroute from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoute.js";
import paymentRouter from './routes/paymentRoute.js'
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import cors from "cors";





if (process.env.NODE_ENV !== "PRODUCTION") {
dotenv.config({
    path:"backend/config/config.env"
})
}


const app =express();
app.use(cookieParser())
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
app.use(cors({
  origin:[process.env.FRONTEND_URL],
  methods:["GET","POST","PUT","DELETE"],
  credentials:true,
}))


app.use('/api/v1',router)
app.use('/api/v1',userroute)
app.use('/api/v1',orderRouter)
app.use('/api/v1',paymentRouter)

app.get("/",(req,res)=>{
  res.send("nice working server") 
})


app.use(errorMiddleware)


export default app;

