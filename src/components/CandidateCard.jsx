import './CandidateCard.css';

export default function CandidateCard({ candidate, onDragStart }) {
  return (
    <div
      className="candidate-card"
      draggable
      onDragStart={(e) => onDragStart(e, candidate.id)}
      id={`candidate-${candidate.id}`}
    >
      <div className="candidate-card-top">
        <div className="candidate-avatar">{candidate.avatar}</div>
        <div className="candidate-info">
          <div className="candidate-name">{candidate.name}</div>
          <div className="candidate-position">{candidate.position}</div>
        </div>
      </div>
      <div className="candidate-card-bottom">
        <span className={`badge badge-${candidate.stage}`}>
          {candidate.stage.charAt(0).toUpperCase() + candidate.stage.slice(1)}
        </span>
        <span className="candidate-date">{candidate.date}</span>
      </div>
    </div>
  );
}
