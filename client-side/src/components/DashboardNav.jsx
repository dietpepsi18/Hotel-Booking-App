import { Link } from "react-router-dom";

export default function DashboardNav() {
  const active = window.location.pathname;

  return (
    <>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link
            to="/dashboard"
            className={`nav-link ${active === "/dashboard" ? "active" : ""}`}
          >
            Your Bookings
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to="/dashboard/seller"
            className={`nav-link 
                        ${active === "/dashboard/seller" ? "active" : ""}`}
          >
            Your Hotels
          </Link>
        </li>
      </ul>
    </>
  );
}
