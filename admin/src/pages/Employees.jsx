import { useState } from 'react';
import { employees as initialEmployees } from '@shared/mockData';
import Modal from '../components/Modal';

export default function Employees() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [form, setForm] = useState({ name: '', role: 'Conductor', route: 'Route 1' });
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const addEmployee = (e) => {
    e.preventDefault();
    const id = `EMP-${String(employees.length + 1).padStart(3, '0')}`;
    setEmployees([...employees, { ...form, id, status: 'Active' }]);
    setForm({ name: '', role: 'Conductor', route: 'Route 1' });
    setShowForm(false);
  };

  const saveEmployee = (e) => {
    e.preventDefault();
    setEmployees((prev) => prev.map((emp) => (emp.id === editingEmployee.id ? editingEmployee : emp)));
    setEditingEmployee(null);
  };

  const deleteEmployee = (emp) => {
    if (!window.confirm(`Delete ${emp.name}?`)) return;
    setEmployees((prev) => prev.filter((item) => item.id !== emp.id));
    if (editingEmployee?.id === emp.id) setEditingEmployee(null);
  };

  return (
    <div>
      <div className="page-header">
        <h2>Employees</h2>
        <p>Onboard conductors</p>
      </div>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3>Employee List</h3>
          <button type="button" className="btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : '+ Add Employee'}
          </button>
        </div>
        {showForm && (
          <form onSubmit={addEmployee} className="form-grid" style={{ marginBottom: '1.5rem', padding: '1rem', background: 'var(--gray-50)', borderRadius: '10px' }}>
            <div className="form-group">
              <label>Full Name</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="e.g. Jose Garcia" />
            </div>
            <div className="form-group">
              <label>Role</label>
              <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                <option>Conductor</option>
                <option>Driver</option>
              </select>
            </div>
            <div className="form-group">
              <label>Assigned Route</label>
              <select value={form.route} onChange={(e) => setForm({ ...form, route: e.target.value })}>
                <option>Route 1</option>
                <option>Route 2</option>
                <option>—</option>
              </select>
            </div>
            <div className="form-group" style={{ display: 'flex', alignItems: 'flex-end' }}>
              <button type="submit" className="btn-secondary">
                Save Employee
              </button>
            </div>
          </form>
        )}
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Route</th>
              <th>Status</th>
              <th aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.role}</td>
                <td>{emp.route}</td>
                <td>
                  <span className="badge">{emp.status}</span>
                </td>
                <td className="table-actions">
                  <div className="table-action-group">
                    <button type="button" className="icon-btn" aria-label={`Edit ${emp.name}`} onClick={() => setEditingEmployee({ ...emp })}>
                      <i className="fa-solid fa-pencil" aria-hidden="true" />
                    </button>
                    <button type="button" className="icon-btn icon-btn-danger" aria-label={`Delete ${emp.name}`} onClick={() => deleteEmployee(emp)}>
                      <i className="fa-solid fa-trash-can" aria-hidden="true" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingEmployee && (
        <Modal title="Edit Employee" onClose={() => setEditingEmployee(null)}>
          <form className="modal-form" onSubmit={saveEmployee}>
            <div className="form-group">
              <label>Employee ID</label>
              <input value={editingEmployee.id} disabled />
            </div>
            <div className="form-group">
              <label>Full Name</label>
              <input
                value={editingEmployee.name}
                onChange={(e) => setEditingEmployee({ ...editingEmployee, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Role</label>
              <select
                value={editingEmployee.role}
                onChange={(e) => setEditingEmployee({ ...editingEmployee, role: e.target.value })}
              >
                <option>Conductor</option>
                <option>Driver</option>
              </select>
            </div>
            <div className="form-group">
              <label>Assigned Route</label>
              <select
                value={editingEmployee.route}
                onChange={(e) => setEditingEmployee({ ...editingEmployee, route: e.target.value })}
              >
                <option>Route 1</option>
                <option>Route 2</option>
                <option>—</option>
              </select>
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                value={editingEmployee.status}
                onChange={(e) => setEditingEmployee({ ...editingEmployee, status: e.target.value })}
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
            <div className="modal-actions">
              <button type="button" className="btn-ghost" onClick={() => setEditingEmployee(null)}>
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
