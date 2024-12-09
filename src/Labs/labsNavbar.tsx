import { useLocation } from "react-router";

export default function TOC() {
  const { pathname } = useLocation();

  const activeStyle = {
    backgroundColor: "#e6aea0",
    color: "white",
  };

  const inactiveStyle = {
    backgroundColor: "transparent",
    color: "black",
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-10">
      <ul className="nav">
        <li className="nav-item mx-3">
          <a
            id="wd-a1"
            href="#/Labs/Lab1"
            className="nav-link text-center"
            style={pathname.includes("Lab1") ? activeStyle : inactiveStyle}
          >
            <h3>Lab 1</h3>
          </a>
        </li>
        <li className="nav-item mx-3">
          <a
            id="wd-a2"
            href="#/Labs/Lab2"
            className="nav-link text-center"
            style={pathname.includes("Lab2") ? activeStyle : inactiveStyle}
          >
            <h3>Lab 2</h3>
          </a>
        </li>
        <li className="nav-item mx-3">
          <a
            id="wd-a3"
            href="#/Labs/Lab3"
            className="nav-link text-center"
            style={pathname.includes("Lab3") ? activeStyle : inactiveStyle}
          >
            <h3>Lab 3</h3>
          </a>
        </li>
        <li className="nav-item mx-3">
          <a
            id="wd-a4"
            href="#/Labs/Lab4"
            className="nav-link text-center"
            style={pathname.includes("Lab4") ? activeStyle : inactiveStyle}
          >
            <h3>Lab 4</h3>
          </a>
        </li>
        <li className="nav-item mx-3">
          <a
            id="wd-a5"
            href="#/Labs/Lab5"
            className="nav-link text-center"
            style={pathname.includes("Lab5") ? activeStyle : inactiveStyle}
          >
            <h3>Lab 5</h3>
          </a>
        </li>
      </ul>
    </div>
  );
}
