export default function RegisterForm(props) {
  //take out the parameters from props
  const {
    handleSubmit,
    name,
    email,
    password,
    setName,
    setEmail,
    setPassword,
  } = props;

  return (
    <form className="mt-3" onSubmit={handleSubmit}>
      <div className="form-group mb-3">
        <label className="form-label">Your name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <div className="form-group mb-3">
        <label className="form-label">Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div className="form-group mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      <button
        className="btn btn-primary"
        disabled={!email || !password || !name}
      >
        Submit
      </button>
    </form>
  );
}
