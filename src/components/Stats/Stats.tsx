import "./Stats.scss";

const Stats = () => {
  return (
    <div className="stats">
      <div className="top">
        <img src="/blood.png" alt="blood" />
        <span>Stats</span>
      </div>
      <div className="bottom">
        <span>Recent Value: 100mg/dL</span>
        <span>Today's Mean Value: 120mg/dL</span>
        <span>Variability: 5mg/dL</span>
      </div>
      <div className="info">Blood glucose levels are stable</div>
    </div>
  );
};

export default Stats;
