import { dashboardStats, sampleTickets, company } from '@shared/mockData';

export default function Dashboard() {
  const stats = [
    { label: "Today's Trips", value: dashboardStats.todayTrips },
    { label: 'Tickets Sold', value: dashboardStats.ticketsSold },
    { label: 'Revenue (₱)', value: dashboardStats.totalRevenue.toLocaleString() },
    { label: 'Active Buses', value: dashboardStats.activeBuses },
  ];

  return (
    <div>
      <div className="page-header">
        <h2>Dashboard</h2>
        <p>{company.name} — operations overview</p>
      </div>
      <div className="stats-grid">
        {stats.map((s) => (
          <div key={s.label} className="stat-card">
            <div className="label">{s.label}</div>
            <div className="value">{s.value}</div>
          </div>
        ))}
      </div>
      <div className="card">
        <h3>Recent Tickets</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Route</th>
              <th>From → To</th>
              <th>Fare</th>
              <th>Time</th>
              <th>Conductor</th>
            </tr>
          </thead>
          <tbody>
            {sampleTickets.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.routeId}</td>
                <td>
                  {t.from} → {t.to}
                </td>
                <td>₱{t.fare}</td>
                <td>{t.time}</td>
                <td>{t.conductor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
