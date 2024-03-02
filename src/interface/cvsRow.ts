export default interface CsvRow {
    Latitud: number;
    Longitud: number;
    ID: string;
    Titulo: string;
    Anunciante: string;
    Descripcion: string;
    Reformado: boolean;
    Telefonos: string;
    Tipo: string;
    Precio: number;
    PrecioPorMetro: number;
    Direccion: string;
    Provincia: string;
    Ciudad: string;
    MetrosCuadrados: number;
    Habitaciones: number;
    Banos: number;
    Parking: boolean;
    SegundaMano: boolean;
    ArmariosEmpotrados: boolean;
    ConstruidoEn: number;
    Amueblado: boolean;
    CalefaccionIndividual: boolean;
    CertificacionEnergetica: string;
    Planta: number;
    Exterior: boolean;
    Interior: boolean;
    Ascensor: boolean;
    Fecha: Date |null;
    Calle: string;
    Barrio: string;
    Distrito: string;
    Terraza: boolean;
    Trastero: boolean;
    CocinaEquipada: boolean;
    CocinaEquipada2: boolean;
    AireAcondicionado: boolean;
    Piscina: boolean;
    Jardin: boolean;
    MetrosCuadradosUtiles: number;
    AptoParaPersonasConMovilidadReducida: boolean;
    Plantas: number;
    SeAdmitenMascotas: boolean;
    Balcon: boolean;
  }

  export interface CsvRowExtend  extends CsvRow {
    Distance: number
  }