export interface Filter {
    Precio: Precio
    Habitaciones?: Habitaciones
  }
  
  export interface Precio {
    gte: number
    lte: number
  }
  
  export interface Habitaciones {
    equals: number
  }
  