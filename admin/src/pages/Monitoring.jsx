import { dashboardStats, sampleTickets, buses, routes } from '@shared/mockData';

export default function Monitoring() {
  return (
    <div>
      <div className="page-header">
        <h2>Monitoring</h2>
        <p>Track trips, tickets, and daily performance</p>
      </div>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="label">Active Trips</div>
          <div className="value">{dashboardStats.todayTrips}</div>
        </div>
        <div className="stat-card">
          <div className="label">Tickets Today</div>
          <div className="value">{dashboardStats.ticketsSold}</div>
        </div>
        <div className="stat-card">
          <div className="label">Revenue Today</div>
          <div className="value">₱{dashboardStats.totalRevenue.toLocaleString()}</div>
        </div>
      </div>
      <div className="card">
        <h3>Active Buses</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Bus ID</th>
              <th>Plate</th>
              <th>Route</th>
              <th>Capacity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {buses.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.plate}</td>
                <td>{routes.find((r) => r.id === b.routeId)?.name}</td>
                <td>{b.capacity}</td>
                <td>
                  <span className="badge">On Trip</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card">
        <h3>Recent Ticket Activity</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Ticket</th>
              <th>Passenger Route</th>
              <th>Fare</th>
              <th>Conductor</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {sampleTickets.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>
                  {t.from} → {t.to}
                </td>
                <td>₱{t.fare}</td>
                <td>{t.conductor}</td>
                <td>{t.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
