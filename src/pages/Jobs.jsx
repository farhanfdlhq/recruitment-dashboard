import { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import Layout from '../components/Layout';
import JobModal from '../components/JobModal';
import JobDetailModal from '../components/JobDetailModal';
import { JOBS as INITIAL_JOBS } from '../data/jobs';
import './Jobs.css';

const STATUS_FILTERS = ['all', 'open', 'closed', 'draft'];

export default function Jobs() {
  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem('rh_jobs');
    return saved ? JSON.parse(saved) : INITIAL_JOBS;
  });
  
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    localStorage.setItem('rh_jobs', JSON.stringify(jobs));
  }, [jobs]);

  const filtered = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.department.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const countByStatus = (status) =>
    status === 'all' ? jobs.length : jobs.filter((j) => j.status === status).length;

  const handleAddJob = (job) => {
    setJobs((prev) => [job, ...prev]);
  };

  return (
    <Layout>
      <div className="jobs-page">
        <div className="page-header">
          <div>
            <h1 className="page-title">Job Management</h1>
            <p className="page-subtitle">
              {jobs.length} positions total &middot;{' '}
              {countByStatus('open')} open
            </p>
          </div>
          <button
            className="btn-primary"
            onClick={() => setShowModal(true)}
            id="btn-add-job"
          >
            <Plus size={16} />
            Add New Job
          </button>
        </div>

        {/* Filters */}
        <div className="jobs-filters card">
          <div className="search-wrap">
            <span className="search-icon" aria-hidden="true">
              <Search size={16} />
            </span>
            <input
              id="job-search"
              type="search"
              className="input-field"
              placeholder="Search by title or department..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="jobs-filter-group">
            {STATUS_FILTERS.map((s) => (
              <button
                key={s}
                id={`filter-${s}`}
                className={`filter-chip${statusFilter === s ? ' filter-chip--active' : ''}`}
                onClick={() => setStatusFilter(s)}
              >
                {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
                <span className="filter-chip-count">{countByStatus(s)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="card jobs-table-card">
          {filtered.length === 0 ? (
            <div className="empty-state">
              <Search size={40} className="empty-state-icon" />
              <p>No jobs found matching your filters.</p>
            </div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Job Title</th>
                    <th>Department</th>
                    <th>Status</th>
                    <th>Posted Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((job) => (
                    <tr 
                      key={job.id} 
                      id={`job-row-${job.id}`}
                      onClick={() => setSelectedJob(job)}
                      style={{ cursor: 'pointer' }}
                    >
                      <td>
                        <div className="job-title-cell">
                          <span className="job-title">{job.title}</span>
                          <span className="job-desc">{job.description?.substring(0, 50) || 'No description'}{job.description?.length > 50 ? '...' : ''}</span>
                        </div>
                      </td>
                      <td>
                        <span className="dept-tag">{job.department}</span>
                      </td>
                      <td>
                        <span className={`badge badge-${job.status}`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="td-muted">{job.posted}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <JobModal
          onClose={() => setShowModal(false)}
          onSave={handleAddJob}
        />
      )}

      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </Layout>
  );
}
