import { useEffect, useRef, useState } from 'react';
import './StatCard.css';

function useCountUp(target, duration = 1000) {
  const [count, setCount] = useState(0);
  const rafId = useRef(null);

  useEffect(() => {
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        rafId.current = requestAnimationFrame(tick);
      }
    }

    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, [target, duration]);

  return count;
}

export default function StatCard({ icon: Icon, label, value, accentClass }) {
  const animated = useCountUp(value);

  return (
    <div className={`stat-card ${accentClass ?? ''}`}>
      <div className="stat-card-icon">
        <Icon size={22} />
      </div>
      <div className="stat-card-body">
        <div className="stat-card-value">{animated.toLocaleString()}</div>
        <div className="stat-card-label">{label}</div>
      </div>
    </div>
  );
}
