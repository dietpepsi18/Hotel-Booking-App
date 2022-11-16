export default function LoginForm(props) {
  //take out the parameters from props
  const { handleSubmit, email, password, setEmail, setPassword } = props;

  return (
    <form className="mt-3" onSubmit={handleSubmit}>
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

      {/*  if there is no email or password entered, diasble the button   */}
      <button className="btn btn-primary" disabled={!email || !password}>
        Submit
      </button>
    </form>
  );
}
