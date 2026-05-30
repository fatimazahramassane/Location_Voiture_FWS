export const mockCarsDatabase = [
  {
    id: 1,
    brand: 'Toyota',
    model: 'Cruiser',
    year: 2016,
    registrationPlate: '1234-A-26',
    mileage: 35451.0,
    dailyRate: 450.0,
    color: 'black',
    status: 'AVAILABLE',
    fuelType: 'GASOLINE',
    transmission: 'AUTOMATIC',
    numberOfDoors: 4,
    numberOfSeats: 5,
    hasAirConditioning: true,
    hasGPS: true,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500&auto=format&fit=crop&q=60',
    agencyId: 1
  },
  {
    id: 2,
    brand: 'Ford',
    model: 'Elite',
    year: 2018,
    registrationPlate: '5678-B-26',
    mileage: 20181.0,
    dailyRate: 380.0,
    color: 'silver',
    status: 'AVAILABLE',
    fuelType: 'GASOLINE',
    transmission: 'MANUAL',
    numberOfDoors: 4,
    numberOfSeats: 5,
    hasAirConditioning: true,
    hasGPS: false,
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=500&auto=format&fit=crop&q=60',
    agencyId: 2
  },
  {
    id: 3,
    brand: 'Volkswagen',
    model: 'Golf 8',
    year: 2024,
    registrationPlate: '9101-C-26',
    mileage: 39590.0,
    dailyRate: 500.0,
    color: 'blue',
    status: 'AVAILABLE',
    fuelType: 'Gasoline',
    transmission: 'AUTOMATIC',
    numberOfDoors: 4,
    numberOfSeats: 7,
    hasAirConditioning: true,
    hasGPS: true,
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=500&auto=format&fit=crop&q=60',
    agencyId: 1,
  },
  {
    id: 4,
    brand: 'Chevrolet',
    model: 'Malibu',
    year: 2019,
    registrationPlate: '1121-D-26',
    mileage: 19200.0,
    dailyRate: 400.0,
    color: 'blue',
    status: 'RENTED',
    fuelType: 'HYBRID',
    transmission: 'AUTOMATIC',
    numberOfDoors: 4,
    numberOfSeats: 5,
    hasAirConditioning: true,
    hasGPS: true,
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 5,
    brand: 'Nissan',
    model: 'Rogue',
    year: 2017,
    registrationPlate: '3141-E-26',
    mileage: 42000.0,
    dailyRate: 480.0,
    color: 'red',
    status: 'AVAILABLE',
    fuelType: 'GASOLINE',
    transmission: 'AUTOMATIC',
    numberOfDoors: 4,
    numberOfSeats: 5,
    hasAirConditioning: true,
    hasGPS: false,
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=500&auto=format&fit=crop&q=60'
  }
];



export const mockRentalsDatabase = [
  {
    id: 101,
    startDate: '2026-06-01',
    endDate: '2026-06-05',
    actualReturnDate: null,
    status: 'PENDING',
    totalCost: 1800.0,
    car: {
      brand: 'Toyota',
      model: 'Cruiser',
      registrationPlate: '1234-A-26'
    }
  },
  {
    id: 102,
    startDate: '2026-05-10',
    endDate: '2026-05-15',
    actualReturnDate: '2026-05-15',
    status: 'COMPLETED',
    totalCost: 2600.0,
    car: {
      brand: 'Dodge',
      model: 'Caravan',
      registrationPlate: '9101-C-26'
    }
    
  }
];


export let mockAgenciesDatabase = [
  {
    id: 1,
    name: "Agence Atlas Casablanca",
    address: "Boulevard Mohammed V, N° 45",
    city: "Casablanca",
    state: "Grand Casablanca",
    phone: "+212 522 123 456",
    email: "contact.casa@atlascar.ma"
  },
  {
    id: 2,
    name: "Agence Atlas Marrakech",
    address: "Avenue Mohammed VI, Géliz",
    city: "Marrakech",
    state: "Marrakech-Safi",
    phone: "+212 524 987 654",
    email: "contact.kech@atlascar.ma"
  }
];