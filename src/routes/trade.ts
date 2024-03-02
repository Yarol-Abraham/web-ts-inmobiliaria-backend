import { Request, Response } from "express";
import { saveDataCSV, filterDataPriceMinAndMax, filterDataLocation, calculateAveragePrice } from "../controller/tradeController";
import catchError from "../controller/errorController";
import AppError from "../utils/appError";
import multer from "multer";

const multerSotarge = multer.memoryStorage();

const multerFilter = (req: Request, file: any, cb: any)=>{
    if(file.mimetype.startsWith('text/csv')){
        cb(null, true);
    }else{
        cb(new AppError("Not an CSV! Please upload only CSV", 400), false);
    };
};

const upload = multer({
    storage: multerSotarge,
    fileFilter: multerFilter
});

export const updateCSV = upload.single('database');

export async function readTrade(req: Request, res: Response){
    try
    {
        if (!req.file) {
            return catchError( new AppError('A CSV file has not been provided.', 200), req, res);
        }

        const csvData = req.file.buffer.toString(); // Convertir el buffer del archivo a cadena


        let result = await saveDataCSV(csvData);
        return res.status(result.status).json(result);
    }
    catch(err){
        return catchError( new AppError("Internal server error", 500), req, res);
    }
}

export async function filterPriceMinAndMax(req: Request, res: Response) {
    try {
        const { priceMin, priceMax, numRooms } = req.query;
        if(!priceMin || !priceMax)
        {
            return catchError( new AppError("price range is not valid", 200), req, res);
        }
        let result = await filterDataPriceMinAndMax(Number(priceMin), Number(priceMax), numRooms ? Number(numRooms): 0);
        return res.status(result.status).json(result);
    } catch (error) {
        return catchError( new AppError("Internal server error", 500), req, res);
    }
}

export async function filterPriceAverage(req: Request, res: Response) 
{
    try {   
        const { Latitud, Longitud, km } = req.query;

        if (!Latitud || !Longitud || !km) {
            return catchError( new AppError("The parameters Latitude, Longitude and Distance are mandatory.", 500), req, res);
        }
        
        let result = await calculateAveragePrice(Number(Latitud), Number(Longitud), Number(km));
        return res.status(result.status).json(result);
    } catch(error) {
        return catchError( new AppError("Internal server error", 500), req, res);
    }
}

export async function filterLocation(req: Request, res: Response) {
    try {
        const { Latitud, Longitud, km } = req.query;
        if(!Latitud || !Longitud || !km)
        {
            return catchError( new AppError("missing fields to make the request", 200), req, res);
        }
        let result = await filterDataLocation(Number(Latitud),Number(Longitud), Number(km));
        return res.status(result.status).json(result);
    } catch (error) {
        return catchError( new AppError("Internal server error", 500), req, res);
    }
}
