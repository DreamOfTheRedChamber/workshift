import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="../Button/index">Button</Link>
        </li>
        <li>
          <Link to="../Input/index">About</Link>
        </li>
      </ul>
    </nav>
  );
}
