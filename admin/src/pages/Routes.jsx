import { useState } from 'react';
import { routes as initialRoutes } from '@shared/mockData';
import Modal from '../components/Modal';

export default function RoutesPage() {
  const [routes, setRoutes] = useState(initialRoutes);
  const [form, setForm] = useState({ name: '', code: '', stops: '', distanceKm: '' });
  const [showForm, setShowForm] = useState(false);
  const [editingRoute, setEditingRoute] = useState(null);

  const addRoute = (e) => {
    e.preventDefault();
    const id = `R${routes.length + 1}`;
    setRoutes([
      ...routes,
      {
        id,
        name: form.name,
        code: form.code,
        stops: form.stops.split(',').map((s) => s.trim()),
        distanceKm: Number(form.distanceKm),
        status: 'Active',
      },
    ]);
    setForm({ name: '', code: '', stops: '', distanceKm: '' });
    setShowForm(false);
  };

  const saveRoute = (e) => {
    e.preventDefault();
    const updated = {
      ...editingRoute,
      stops: typeof editingRoute.stops === 'string' ? editingRoute.stops.split(',').map((s) => s.trim()) : editingRoute.stops,
      distanceKm: Number(editingRoute.distanceKm),
    };
    setRoutes((prev) => prev.map((route) => (route.id === updated.id ? updated : route)));
    setEditingRoute(null);
  };

  const deleteRoute = (route) => {
    if (!window.confirm(`Delete ${route.name}?`)) return;
    setRoutes((prev) => prev.filter((item) => item.id !== route.id));
    if (editingRoute?.id === route.id) setEditingRoute(null);
  };

  const openEdit = (route) => {
    setEditingRoute({
      ...route,
      stops: route.stops.join(', '),
      distanceKm: route.distanceKm,
    });
  };

  return (
    <div>
      <div className="page-header">
        <h2>Routes</h2>
        <p>Manage provincial bus routes and stops</p>
      </div>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3>Route List</h3>
          <button type="button" className="btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : '+ Add Route'}
          </button>
        </div>
        {showForm && (
          <form onSubmit={addRoute} style={{ marginBottom: '1.5rem', padding: '1rem', background: 'var(--gray-50)', borderRadius: '10px' }}>
            <div className="form-grid">
              <div className="form-group">
                <label>Route Name</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="Route 3 — East Line" />
              </div>
              <div className="form-group">
                <label>Route Code</label>
                <input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} required placeholder="PX-E1" />
              </div>
              <div className="form-group">
                <label>Distance (km)</label>
                <input type="number" value={form.distanceKm} onChange={(e) => setForm({ ...form, distanceKm: e.target.value })} required />
              </div>
            </div>
            <div className="form-group" style={{ marginTop: '1rem' }}>
              <label>Stops (comma-separated)</label>
              <input value={form.stops} onChange={(e) => setForm({ ...form, stops: e.target.value })} required placeholder="Terminal A, Stop 1, Terminal D" />
            </div>
            <button type="submit" className="btn-secondary" style={{ marginTop: '1rem' }}>
              Save Route
            </button>
          </form>
        )}
        <table className="table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Stops</th>
              <th>Distance</th>
              <th>Status</th>
              <th aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {routes.map((r) => (
              <tr key={r.id}>
                <td>{r.code}</td>
                <td>{r.name}</td>
                <td>{r.stops.join(' → ')}</td>
                <td>{r.distanceKm} km</td>
                <td>
                  <span className="badge">{r.status}</span>
                </td>
                <td className="table-actions">
                  <div className="table-action-group">
                    <button type="button" className="icon-btn" aria-label={`Edit ${r.name}`} onClick={() => openEdit(r)}>
                      <i className="fa-solid fa-pencil" aria-hidden="true" />
                    </button>
                    <button type="button" className="icon-btn icon-btn-danger" aria-label={`Delete ${r.name}`} onClick={() => deleteRoute(r)}>
                      <i className="fa-solid fa-trash-can" aria-hidden="true" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingRoute && (
        <Modal title="Edit Route" onClose={() => setEditingRoute(null)}>
          <form className="modal-form" onSubmit={saveRoute}>
            <div className="form-group">
              <label>Route Code</label>
              <input
                value={editingRoute.code}
                onChange={(e) => setEditingRoute({ ...editingRoute, code: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Route Name</label>
              <input
                value={editingRoute.name}
                onChange={(e) => setEditingRoute({ ...editingRoute, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Distance (km)</label>
              <input
                type="number"
                min="0"
                value={editingRoute.distanceKm}
                onChange={(e) => setEditingRoute({ ...editingRoute, distanceKm: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Stops (comma-separated)</label>
              <input
                value={editingRoute.stops}
                onChange={(e) => setEditingRoute({ ...editingRoute, stops: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                value={editingRoute.status}
                onChange={(e) => setEditingRoute({ ...editingRoute, status: e.target.value })}
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
            <div className="modal-actions">
              <button type="button" className="btn-ghost" onClick={() => setEditingRoute(null)}>
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
