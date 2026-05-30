import { useState, useEffect } from 'react';
import { Inbox, Mic, CheckCircle } from 'lucide-react';
import Layout from '../components/Layout';
import CandidateCard from '../components/CandidateCard';
import { CANDIDATES as INITIAL_CANDIDATES } from '../data/candidates';
import './Pipeline.css';

const STAGES = [
  { id: 'applied', label: 'Applied', icon: Inbox, color: '#0066cc' },
  { id: 'interview', label: 'Interview', icon: Mic, color: '#c06f00' },
  { id: 'hired', label: 'Hired', icon: CheckCircle, color: '#1a7f3c' },
];

export default function Pipeline() {
  const [candidates, setCandidates] = useState(() => {
    const saved = localStorage.getItem('rh_candidates');
    return saved ? JSON.parse(saved) : INITIAL_CANDIDATES;
  });

  const [dragOverStage, setDragOverStage] = useState(null);

  useEffect(() => {
    localStorage.setItem('rh_candidates', JSON.stringify(candidates));
  }, [candidates]);

  const getByStage = (stage) => candidates.filter((c) => c.stage === stage);

  const handleDragStart = (e, candidateId) => {
    e.dataTransfer.setData('candidateId', String(candidateId));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, stage) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverStage(stage);
  };

  const handleDragLeave = () => {
    setDragOverStage(null);
  };

  const handleDrop = (e, targetStage) => {
    e.preventDefault();
    setDragOverStage(null);

    const candidateId = Number(e.dataTransfer.getData('candidateId'));
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === candidateId ? { ...c, stage: targetStage } : c,
      ),
    );
  };

  return (
    <Layout>
      <div className="pipeline-page">
        <div className="page-header">
          <div>
            <h1 className="page-title">Candidate Pipeline</h1>
            <p className="page-subtitle">
              Drag and drop candidates between stages
            </p>
          </div>
          <div className="pipeline-total">
            {candidates.length} candidates total
          </div>
        </div>

        <div className="kanban-board">
          {STAGES.map(({ id, label, icon: Icon, color }) => {
            const items = getByStage(id);
            return (
              <div
                key={id}
                id={`stage-${id}`}
                className={`kanban-col${dragOverStage === id ? ' kanban-col--over' : ''}`}
                onDragOver={(e) => handleDragOver(e, id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, id)}
              >
                <div
                  className="kanban-col-header"
                  style={{ '--col-color': color }}
                >
                  <div className="kanban-col-title">
                    <Icon size={16} />
                    <span>{label}</span>
                  </div>
                  <span className="kanban-col-count">{items.length}</span>
                </div>

                <div className="kanban-cards">
                  {items.length === 0 ? (
                    <div className="kanban-empty">Drop candidates here</div>
                  ) : (
                    items.map((c) => (
                      <CandidateCard
                        key={c.id}
                        candidate={c}
                        onDragStart={handleDragStart}
                      />
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
