import { useState } from 'react';
import { fareMatrix as initialFareMatrix, routes } from '@shared/mockData';
import Modal from '../components/Modal';

const emptyFareForm = { routeId: routes[0]?.id ?? '', from: '', to: '', fare: '' };

export default function Fares() {
  const [fares, setFares] = useState(initialFareMatrix);
  const [form, setForm] = useState(emptyFareForm);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingFare, setEditingFare] = useState(null);

  const routeName = (id) => routes.find((r) => r.id === id)?.name ?? id;

  const addFare = (e) => {
    e.preventDefault();
    setFares([...fares, { ...form, fare: Number(form.fare) }]);
    setForm(emptyFareForm);
    setShowForm(false);
  };

  const openEdit = (index) => {
    setEditingIndex(index);
    setEditingFare({ ...fares[index] });
  };

  const closeEdit = () => {
    setEditingIndex(null);
    setEditingFare(null);
  };

  const saveFare = (e) => {
    e.preventDefault();
    setFares((prev) => prev.map((fare, index) => (index === editingIndex ? editingFare : fare)));
    closeEdit();
  };

  const deleteFare = (index) => {
    const fare = fares[index];
    if (!window.confirm(`Delete fare from ${fare.from} to ${fare.to}?`)) return;
    setFares((prev) => prev.filter((_, i) => i !== index));
    if (editingIndex === index) closeEdit();
  };

  return (
    <div>
      <div className="page-header">
        <h2>Fares</h2>
        <p>Dynamic fare matrix per route and stop pair</p>
      </div>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3>Fare Matrix</h3>
          <button type="button" className="btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : '+ Add Fare'}
          </button>
        </div>
        {showForm && (
          <form
            onSubmit={addFare}
            className="form-grid"
            style={{ marginBottom: '1.5rem', padding: '1rem', background: 'var(--gray-50)', borderRadius: '10px' }}
          >
            <div className="form-group">
              <label>Route</label>
              <select value={form.routeId} onChange={(e) => setForm({ ...form, routeId: e.target.value })} required>
                {routes.map((route) => (
                  <option key={route.id} value={route.id}>
                    {route.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>From</label>
              <input value={form.from} onChange={(e) => setForm({ ...form, from: e.target.value })} required placeholder="e.g. Terminal A" />
            </div>
            <div className="form-group">
              <label>To</label>
              <input value={form.to} onChange={(e) => setForm({ ...form, to: e.target.value })} required placeholder="e.g. Town Center" />
            </div>
            <div className="form-group">
              <label>Fare (₱)</label>
              <input
                type="number"
                min="0"
                value={form.fare}
                onChange={(e) => setForm({ ...form, fare: e.target.value })}
                required
                placeholder="25"
              />
            </div>
            <div className="form-group" style={{ display: 'flex', alignItems: 'flex-end' }}>
              <button type="submit" className="btn-secondary">
                Save Fare
              </button>
            </div>
          </form>
        )}
        <table className="table">
          <thead>
            <tr>
              <th>Route</th>
              <th>From</th>
              <th>To</th>
              <th>Fare (₱)</th>
              <th aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {fares.map((f, i) => (
              <tr key={`${f.routeId}-${f.from}-${f.to}-${i}`}>
                <td>{routeName(f.routeId)}</td>
                <td>{f.from}</td>
                <td>{f.to}</td>
                <td>₱{f.fare}</td>
                <td className="table-actions">
                  <div className="table-action-group">
                    <button type="button" className="icon-btn" aria-label={`Edit fare ${f.from} to ${f.to}`} onClick={() => openEdit(i)}>
                      <i className="fa-solid fa-pencil" aria-hidden="true" />
                    </button>
                    <button type="button" className="icon-btn icon-btn-danger" aria-label={`Delete fare ${f.from} to ${f.to}`} onClick={() => deleteFare(i)}>
                      <i className="fa-solid fa-trash-can" aria-hidden="true" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingFare && (
        <Modal title="Edit Fare" onClose={closeEdit}>
          <form className="modal-form" onSubmit={saveFare}>
            <div className="form-group">
              <label>Route</label>
              <select value={editingFare.routeId} onChange={(e) => setEditingFare({ ...editingFare, routeId: e.target.value })}>
                {routes.map((route) => (
                  <option key={route.id} value={route.id}>
                    {route.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>From</label>
              <input value={editingFare.from} onChange={(e) => setEditingFare({ ...editingFare, from: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>To</label>
              <input value={editingFare.to} onChange={(e) => setEditingFare({ ...editingFare, to: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Fare (₱)</label>
              <input
                type="number"
                min="0"
                value={editingFare.fare}
                onChange={(e) => setEditingFare({ ...editingFare, fare: Number(e.target.value) })}
                required
              />
            </div>
            <div className="modal-actions">
              <button type="button" className="btn-ghost" onClick={closeEdit}>
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
