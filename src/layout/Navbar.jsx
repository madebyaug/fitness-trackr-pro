import { useAuth } from "../auth/AuthContext";
import { Link, NavLink } from "react-router-dom";

/** Navbar with site navigation links */
export default function Navbar() {
  const { token, logout } = useAuth();
  return (
    <header>
      <p>Fitness Trackr</p>
      <nav>
        <NavLink to="/activities">Activities</NavLink>
        <NavLink to="/routines">Routines</NavLink>
        {token ? (
          <Link to="/activities" onClick={() => logout()}>
            logout
          </Link>
        ) : (
          <>
            <NavLink to="/auth/register">Register</NavLink>
            <NavLink to="/auth/login">Login</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
