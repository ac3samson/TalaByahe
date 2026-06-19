import { useState } from 'react';
import { dashboardStats, sampleTickets } from '@shared/mockData';

export default function Reports() {
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    setGenerated(true);
  };

  return (
    <div>
      <div className="page-header">
        <h2>Reports</h2>
        <p>Generate daily earnings and trip performance reports</p>
      </div>
      <div className="card">
        <h3>Generate Report</h3>
        <div className="form-grid" style={{ marginBottom: '1rem' }}>
          <div className="form-group">
            <label>Report Type</label>
            <select defaultValue="daily">
              <option value="daily">Daily Earnings Summary</option>
              <option value="trip">Per-Trip Performance</option>
              <option value="conductor">Conductor Collection Report</option>
            </select>
          </div>
          <div className="form-group">
            <label>Date</label>
            <input type="date" defaultValue="2026-06-17" />
          </div>
        </div>
        <button type="button" className="btn-primary" onClick={handleGenerate}>
          Generate Report
        </button>
        {generated && (
          <p className="report-success">
            <i className="fa-solid fa-circle-check" aria-hidden="true" />
            Report generated successfully
          </p>
        )}
      </div>
      {generated && (
        <div className="card">
          <h3>Daily Earnings Summary — June 17, 2026</h3>
          <div className="stats-grid" style={{ marginTop: '1rem' }}>
            <div className="stat-card">
              <div className="label">Total Trips</div>
              <div className="value">{dashboardStats.todayTrips}</div>
            </div>
            <div className="stat-card">
              <div className="label">Tickets Sold</div>
              <div className="value">{dashboardStats.ticketsSold}</div>
            </div>
            <div className="stat-card">
              <div className="label">Gross Revenue</div>
              <div className="value">₱{dashboardStats.totalRevenue.toLocaleString()}</div>
            </div>
          </div>
          <table className="table" style={{ marginTop: '1.5rem' }}>
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Route Segment</th>
                <th>Fare</th>
                <th>Conductor</th>
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
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" className="btn-secondary" style={{ marginTop: '1rem' }}>
            Download as .xlsx
          </button>
        </div>
      )}
    </div>
  );
}
