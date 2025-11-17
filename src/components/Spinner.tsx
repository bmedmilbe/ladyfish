const Spinner = () => {
  return (
    <div className="position-relative vh-100">
      <div className="position-absolute top-50 start-50 translate-middle">
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
