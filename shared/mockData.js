export const company = {
  name: 'Provincial Express',
  tagline: 'Safe rides across the province',
};

export const employees = [
  { id: 'EMP-001', name: 'Juan Dela Cruz', role: 'Conductor', route: 'Route 1', status: 'Active' },
  { id: 'EMP-002', name: 'Maria Santos', role: 'Conductor', route: 'Route 2', status: 'Active' },
  { id: 'EMP-003', name: 'Pedro Reyes', role: 'Driver', route: 'Route 1', status: 'Active' },
  { id: 'EMP-004', name: 'Ana Lopez', role: 'Driver', route: 'Route 2', status: 'Active' },
];

export const routes = [
  {
    id: 'R1',
    name: 'Route 1 — North Line',
    code: 'PX-N1',
    stops: ['Terminal A', 'Town Center', 'Market Hub', 'Terminal B'],
    distanceKm: 48,
    status: 'Active',
  },
  {
    id: 'R2',
    name: 'Route 2 — South Line',
    code: 'PX-S1',
    stops: ['Terminal A', 'Riverside', 'Highway Junction', 'Terminal C'],
    distanceKm: 62,
    status: 'Active',
  },
];

export const fareMatrix = [
  { routeId: 'R1', from: 'Terminal A', to: 'Town Center', fare: 25 },
  { routeId: 'R1', from: 'Terminal A', to: 'Market Hub', fare: 40 },
  { routeId: 'R1', from: 'Terminal A', to: 'Terminal B', fare: 50 },
  { routeId: 'R1', from: 'Town Center', to: 'Market Hub', fare: 25 },
  { routeId: 'R1', from: 'Town Center', to: 'Terminal B', fare: 35 },
  { routeId: 'R1', from: 'Market Hub', to: 'Terminal B', fare: 25 },
  { routeId: 'R2', from: 'Terminal A', to: 'Riverside', fare: 30 },
  { routeId: 'R2', from: 'Terminal A', to: 'Highway Junction', fare: 45 },
  { routeId: 'R2', from: 'Terminal A', to: 'Terminal C', fare: 60 },
  { routeId: 'R2', from: 'Riverside', to: 'Highway Junction', fare: 25 },
  { routeId: 'R2', from: 'Riverside', to: 'Terminal C', fare: 40 },
  { routeId: 'R2', from: 'Highway Junction', to: 'Terminal C', fare: 25 },
];

export const buses = [
  { id: 'BUS-101', plate: 'ABC 1234', routeId: 'R1', capacity: 45 },
  { id: 'BUS-102', plate: 'DEF 5678', routeId: 'R2', capacity: 45 },
];

export const sampleTickets = [
  { id: 'TKT-1001', routeId: 'R1', from: 'Terminal A', to: 'Town Center', fare: 25, time: '06:15 AM', conductor: 'Juan Dela Cruz' },
  { id: 'TKT-1002', routeId: 'R1', from: 'Town Center', to: 'Terminal B', fare: 35, time: '06:42 AM', conductor: 'Juan Dela Cruz' },
  { id: 'TKT-1003', routeId: 'R2', from: 'Terminal A', to: 'Riverside', fare: 30, time: '07:05 AM', conductor: 'Maria Santos' },
];

export const dashboardStats = {
  todayTrips: 12,
  ticketsSold: 284,
  totalRevenue: 12450,
  activeBuses: 8,
  activeConductors: 6,
};

export function getFare(routeId, from, to) {
  const direct = fareMatrix.find((f) => f.routeId === routeId && f.from === from && f.to === to);
  if (direct) return direct.fare;
  const reverse = fareMatrix.find((f) => f.routeId === routeId && f.from === to && f.to === from);
  return reverse ? reverse.fare : null;
}

export function getRouteStops(routeId) {
  return routes.find((r) => r.id === routeId)?.stops ?? [];
}
