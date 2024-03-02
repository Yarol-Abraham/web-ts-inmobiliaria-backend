
import csvParser from 'csv-parser';
import CsvRow, { CsvRowExtend } from '../interface/cvsRow';
import prisma from '../database';
import { Filter } from '../interface/filter';

const sendResponse = (status: number, data: any, message: string)=> {
  return {
    status,
    message,    
    data
  }
};

const readCSV = async (csvData: string) => {
  let rows: CsvRow[] = [];

  return new Promise((resolve, reject) => {
      require('stream')
      .Readable.from(csvData)
      .pipe(csvParser())
      .on('data', (row: any) => {
        rows.push({
          ID: row.ID,
          Latitud: parseFloat(row.Latitud),
          Longitud: parseFloat(row.Longitud),
          Titulo: row.Titulo || "Sin Titulo",
          Anunciante: row.Anunciante || "Sin Anunciante",
          Descripcion: row.Descripcion ? row.Descripcion.replace(/^"|"$/g, '') : "",
          Reformado: row.Reformado === 'TRUE',
          Telefonos: row.Telefonos || "",
          Tipo: row.Tipo || "",
          Precio: parseInt(row.Precio, 10),
          PrecioPorMetro: parseFloat(row['Precio por metro']),
          Direccion: row.Direccion || "",
          Provincia: row.Provincia || "",
          Ciudad: row.Ciudad || "",
          MetrosCuadrados: parseInt(row['Metros cuadrados útiles'] || "0", 10),
          Habitaciones: parseInt(row.Habitaciones || "0", 10),
          Banos: parseInt(row['Baños'] || "0", 10),
          Parking: row.Parking === 'TRUE',
          SegundaMano: row['Segunda mano'] === 'TRUE',
          ArmariosEmpotrados: row['Armarios Empotrados'] === 'TRUE',
          ConstruidoEn: row['Construido en'] || "",
          Amueblado: row.Amueblado === 'TRUE',
          CalefaccionIndividual: row['Calefacción individual'] === 'TRUE' || false,
          CertificacionEnergetica: row['Certificación energética'] || "",
          Planta: row.Planta ? parseInt(row.Planta || "0", 10) : 0,
          Exterior: row.Exterior === 'TRUE',
          Interior: row.Interior === 'TRUE',
          Ascensor: row.Ascensor === 'TRUE',
          Fecha:  row.Fecha ? (new Date(row.Fecha) instanceof Date && !isNaN(new Date(row.Fecha).getTime()) ? new Date(row.Fecha) : null) : null,
          Calle: row.Calle || "",
          Barrio: row.Barrio || "",
          Distrito: row.Distrito || "",
          Terraza: row.Terraza === 'TRUE',
          Trastero: row.Trastero === 'TRUE',
          CocinaEquipada: row['Cocina Equipada'] === 'TRUE',
          CocinaEquipada2: row['Cocina equipada'] === 'TRUE',
          AireAcondicionado: row['Aire acondicionado'] === 'TRUE',
          Piscina: row.Piscina === 'TRUE',
          Jardin: row['Jardín'] === 'TRUE',
          MetrosCuadradosUtiles: parseInt(row.MetrosCuadradosUtiles || 0, 10),
          AptoParaPersonasConMovilidadReducida: row['Apto para personas con movilidad reducida'] === 'TRUE',
          Plantas: parseInt(row.Plantas || "0", 10),
          SeAdmitenMascotas: row['Se admiten mascotas'] === 'TRUE',
          Balcon: row['Balcón'] === 'TRUE',
        })
      })
      .on('end', () => {
        resolve(rows);
      })
      .on('error', (error: any) => {
        reject(error);
      });
  });
};

export const saveDataCSV  = async (csvData: string) =>
{
  try{
    let  data: any = await readCSV(csvData); 
    await prisma.propiedad.deleteMany({});
    await prisma.propiedad.createMany({ data });
    return sendResponse(200, data,  "Data saved successfully");
  }catch(err){
    return sendResponse(500, err, "Failed to save data" );
  }
}

export const filterDataPriceMinAndMax = async (priceMin: number, priceMax: number, numRooms: number)=> {
    try{
      const condition: Filter = {
        Precio: {
          gte: priceMin, 
          lte: priceMax, 
        }
      };
      if(numRooms > 0) condition.Habitaciones = {  equals: numRooms }
      
      const data = await prisma.propiedad.findMany({
        where: condition
      });
      return sendResponse(200, data, "Data successfully obtained");
    }catch(err)
    {
      return sendResponse(500, null, "Error in obtaining data");
    }
}


export const calculateAveragePrice = async (Latitud: number, Longitud: number, km: number) => {
  try
  {
      const dataRange: Array<CsvRowExtend> = await prisma.$queryRaw`
      SELECT *, ( 6371 * acos(cos(radians(${Latitud})) * cos(radians(Latitud)) * cos(radians(Longitud) - radians(${Longitud})) + sin(radians(${Latitud})) * sin(radians(Latitud)))) AS distance FROM propiedad HAVING distance < ${km} ORDER BY distance;`;
      
      const priceAverage = dataRange.reduce((sum, propiedad) => {
        return sum + (propiedad.Precio / propiedad.MetrosCuadrados);
      }, 0) / dataRange.length;

      return sendResponse(200, priceAverage, "Data successfully obtained");
  }catch(error){
    return sendResponse(500, error, "Error in obtaining data");
  }
}


export const filterDataLocation = async (Latitud: number, Longitud: number, km: number) => {
 
  try {
    const data: Array<CsvRowExtend> = await prisma.$queryRaw`
    SELECT *, ( 6371 * acos(cos(radians(${Latitud})) * cos(radians(Latitud)) * cos(radians(Longitud) - radians(${Longitud})) + sin(radians(${Latitud})) * sin(radians(Latitud)))) AS distance FROM propiedad HAVING distance < ${km} ORDER BY distance;`;
     return sendResponse(200, data, "Data successfully obtained");
  } catch (error) {
    return sendResponse(500, error, "Error in obtaining data");
  }
  
}