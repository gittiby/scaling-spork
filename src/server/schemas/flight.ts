export const FlightType = `
  type Flight {
    destinationairport: String
    equipment: String
    flight: String
    name: String
    sourceairport: String
    utc: String
    schedule: Schedule 
  }
  `;

export const resolvers = {
  Query: {
  },
};
