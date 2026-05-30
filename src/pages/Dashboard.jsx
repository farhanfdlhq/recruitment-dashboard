import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Users,
  FileText,
  Inbox,
  Mic,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import Layout from '../components/Layout';
import StatCard from '../components/StatCard';
import { JOBS as INITIAL_JOBS } from '../data/jobs';
import { CANDIDATES as INITIAL_CANDIDATES } from '../data/candidates';
import './Dashboard.css';

const PIPELINE_STAGES = [
  { key: 'applied', label: 'Applied', icon: Inbox, color: '#0066cc' },
  { key: 'interview', label: 'Interview', icon: Mic, color: '#c06f00' },
  { key: 'hired', label: 'Hired', icon: CheckCircle, color: '#1a7f3c' },
];

export default function Dashboard() {
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [candidates, setCandidates] = useState(INITIAL_CANDIDATES);

  useEffect(() => {
    const savedJobs = localStorage.getItem('rh_jobs');
    if (savedJobs) setJobs(JSON.parse(savedJobs));
    
    const savedCandidates = localStorage.getItem('rh_candidates');
    if (savedCandidates) setCandidates(JSON.parse(savedCandidates));
  }, []);

  const RECENT_JOBS = jobs.slice(0, 5);

  const STAGE_COUNTS = candidates.reduce((acc, c) => {
    acc[c.stage] = (acc[c.stage] || 0) + 1;
    return acc;
  }, {});

  return (
    <Layout>
      <div className="dashboard">
        <div className="page-header">
          <div>
            <h1 className="page-title">Dashboard</h1>
            <p className="page-subtitle">Welcome back! Here is what is happening.</p>
          </div>
          <div className="page-date">
            {new Date().toLocaleDateString('id-ID', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="stat-grid">
          <StatCard icon={Briefcase} label="Total Jobs" value={jobs.length} />
          <StatCard
            icon={Users}
            label="Total Candidates"
            value={candidates.length}
            accentClass="stat-card--green"
          />
          <StatCard
            icon={FileText}
            label="Total Applications"
            value={candidates.length}
            accentClass="stat-card--amber"
          />
        </div>

        {/* Bottom row */}
        <div className="dashboard-row">
          <section className="card dashboard-recent">
            <div className="section-header">
              <h2 className="section-title">Recent Jobs</h2>
              <Link to="/jobs" className="section-link">
                View all <ArrowRight size={13} />
              </Link>
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Department</th>
                    <th>Status</th>
                    <th>Posted</th>
                  </tr>
                </thead>
                <tbody>
                  {RECENT_JOBS.map((job) => (
                    <tr key={job.id}>
                      <td className="td-bold">{job.title}</td>
                      <td className="td-muted">{job.department}</td>
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
          </section>

          <section className="card dashboard-pipeline">
            <div className="section-header">
              <h2 className="section-title">Pipeline</h2>
              <Link to="/pipeline" className="section-link">
                View all <ArrowRight size={13} />
              </Link>
            </div>
            <div className="pipeline-summary">
              {PIPELINE_STAGES.map(({ key, label, icon: Icon, color }) => (
                <div
                  key={key}
                  className="pipeline-summary-item"
                  style={{ '--stage-color': color }}
                >
                  <div className="pipeline-summary-icon">
                    <Icon size={18} />
                  </div>
                  <div className="pipeline-summary-count">
                    {STAGE_COUNTS[key] || 0}
                  </div>
                  <div className="pipeline-summary-label">{label}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
