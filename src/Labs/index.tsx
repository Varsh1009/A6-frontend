import "./labs.css";
import HeadingsAndParagraphs from "./Lab 1/headingsandpara";
import Lists from "./Lab 1/lists";
import Forms from "./Lab 1/forms";
import Navbar from "./Lab 1/navbar";
import Table from "./Lab 1/tables";
import Images from "./Lab 1/images";
import { HashRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import LabsNavbar from "./labsNavbar";
import Lab1 from "./Lab 1";
import Lab2 from "./Lab 2";
import Lab3 from "./Lab 3";
import { BsArrowUpRightSquare } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import Lab4 from "./Lab 4";
import store from "./store";
import { Provider } from "react-redux";
import Lab5 from "./Lab 5";

const LabWork = () => {
  return (
    <Provider store={store}>
      <div className="lab-work">
        <div className="landing-page">
          <div className="row">
            <div className="col" />
            <div className="col-6">
              <div className="headings-card">
                <h1>WEB DEVELOPMENT</h1>
                <h2>Shrivarshini Narayanan</h2>

                <h2>sec -03</h2>
              </div>
            </div>
            <div className="col" />
          </div>
          <div className="button-container">
            <a href="https://github.com/varsh1009">
              <button className="button">
                {" "}
                GitHub Repository<FaGithub />
              </button>
            </a>

       
            <Link to="/kanbas">
              <button className="button">
                Go to Kanbas <BsArrowUpRightSquare />
              </button>
            </Link>
          </div>
        </div>


        <br />

        <LabsNavbar />

        <Routes>
          <Route
            path="/"
            // element={<h3>Use the above navbar to view different components.</h3>}
            element={<Navigate to="Lab1" replace={true} />}
          />
          <Route path="Lab1/*" element={<Lab1 />} />
          <Route path="Lab2/*" element={<Lab2 />} />
          <Route path="Lab3/*" element={<Lab3 />} />
          <Route path="Lab4/*" element={<Lab4 />} />
          <Route path="Lab5/*" element={<Lab5 />} />
        </Routes>

      </div>
    </Provider>
  );
};

export default LabWork;
