import "./Limits.scss";

const Limits = () => {
  return (
    <div className="limits">
      <div className="top">
        <img src="/heartrate.png" alt="heartrate" />
        <span>Glycemic Limits</span>
      </div>
      <div className="bottom">
        <span className="min">Min: 80mg/dL</span>
        <span className="max">Max: 180mg/dL</span>
      </div>
    </div>
  );
};

export default Limits;
