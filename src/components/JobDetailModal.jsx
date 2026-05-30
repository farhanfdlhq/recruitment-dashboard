import { X } from 'lucide-react';
import './JobModal.css';

export default function JobDetailModal({ job, onClose }) {
  if (!job) return null;

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
          <h2 className="modal-title" id="modal-title">Job Details</h2>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="job-detail-content" style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '8px' }}>
          <div>
            <div className="form-label" style={{ marginBottom: '4px' }}>Job Title</div>
            <div style={{ fontSize: '18px', fontWeight: '600', color: 'var(--color-ink)' }}>{job.title}</div>
          </div>
          
          <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
            <div>
              <div className="form-label" style={{ marginBottom: '6px' }}>Department</div>
              <span className="dept-tag">{job.department}</span>
            </div>
            <div>
              <div className="form-label" style={{ marginBottom: '6px' }}>Status</div>
              <span className={`badge badge-${job.status}`}>
                {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
              </span>
            </div>
            <div>
              <div className="form-label" style={{ marginBottom: '6px' }}>Posted Date</div>
              <div style={{ fontSize: '14px', color: 'var(--color-ink-muted)', paddingTop: '2px' }}>{job.posted}</div>
            </div>
          </div>

          <div>
            <div className="form-label" style={{ marginBottom: '6px' }}>Description</div>
            <div style={{ fontSize: '14px', color: 'var(--color-ink-muted)', lineHeight: '1.6', background: 'var(--color-canvas)', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-hairline)' }}>
              {job.description || 'No description provided for this job.'}
            </div>
          </div>
        </div>

        <div className="modal-footer" style={{ marginTop: '24px' }}>
          <button
            type="button"
            className="btn-primary"
            onClick={onClose}
            style={{ width: '100%' }}
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}
