import { X } from 'lucide-react';
import './JobModal.css';

const DEPARTMENTS = [
  'Engineering',
  'Design',
  'Product',
  'Data',
  'Infrastructure',
  'Quality',
  'Marketing',
  'HR',
  'Finance',
];

export default function JobModal({ onClose, onSave }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);

    onSave({
      id: Date.now(),
      title: fd.get('title'),
      department: fd.get('department'),
      status: fd.get('status'),
      description: fd.get('description'),
      posted: new Date().toISOString().split('T')[0],
    });

    onClose();
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title" id="modal-title">Add New Job</h2>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close modal"
            id="btn-modal-close"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="job-title">Job Title</label>
            <input
              id="job-title"
              name="title"
              type="text"
              className="input-field"
              placeholder="e.g. Senior Frontend Developer"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="job-department">Department</label>
            <select
              id="job-department"
              name="department"
              className="select-field"
              required
            >
              <option value="">Select department</option>
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="job-status">Status</label>
            <select
              id="job-status"
              name="status"
              className="select-field"
              required
            >
              <option value="open">Open</option>
              <option value="closed">Closed</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="job-description">Description</label>
            <textarea
              id="job-description"
              name="description"
              className="input-field textarea-field"
              placeholder="Brief job description..."
            />
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
              id="btn-cancel-job"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary" id="btn-save-job">
              Save Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
