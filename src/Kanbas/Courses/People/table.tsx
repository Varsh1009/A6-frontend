import { FaUserCircle } from "react-icons/fa";
import * as db from "../../Database";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import axios from "axios";
import * as usersClient from "../../Accounts/client";
import * as enrollmentsClient from "../../Dashboard/client";
import { useEffect, useState } from "react";
import PeopleDetails from "./Details";
import { Link } from "react-router-dom";

export default function PeopleTable({ users = [] }: { users?: any[] }) {
  console.log("Users:", users);

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const { cid } = useParams();

  const [enrollments, setEnrollments] = useState([]);

  const [dataFetched, setDataFetched] = useState(false);

  const fetchEnrollments = async (cid: any) => {
    // const enrollments = await enrollmentsClient.getAllEnrollments();
    const enrollments = await enrollmentsClient.getUsersForCourse(cid);
    setEnrollments(enrollments);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // await Promise.all([fetchUsers(), fetchEnrollments()]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setDataFetched(true);
      }
    };

    fetchData();
  }, []);

  const [usernameToAdd, setUsernameToAdd] = useState("");

  const handleAddUser = async () => {
    const enrollment = {
      username: usernameToAdd,
      courseId: cid,
    };

    // console.log("Enrollment:", enrollment);

    try {
      await enrollmentsClient.enrollUserWithUsername(enrollment);
      // console.log("User enrolled successfully");
      await fetchEnrollments(cid);
      // await fetchUsers();
    } catch (error) {
      // console.error("Error enrolling user:", error);
    }
  };

  const handleUnenrollUser = async (userId: any, cid: any) => {
    try {
      const enrollment = {
        user: userId,
        course: cid,
      };
      await usersClient.unenrollFromCourse(userId, cid);
      // console.log("User unenrolled successfully");
      await fetchEnrollments(cid);
      // await fetchUsers();
    } catch (error) {
      // console.error("Error unenrolling user:", error);
    }
  };

  return (
    <div id="wd-people-table">
      <PeopleDetails />

      {/* add button for faculty */}
      {currentUser.role === "FACULTY" && (
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5> </h5>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Username you wish to add"
            onChange={(e) => setUsernameToAdd(e.target.value)}
          />
          <button
            className="btn btn-danger"
            onClick={() => {
              // Handle "Add" button click logic here
              // console.log("Add button clicked");
              handleAddUser();
            }}
          >
            Add
          </button>
        </div>
      )}

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {dataFetched &&
            users
              // .filter((usr: any) =>
              //   enrollments.some(
              //     (enrollment: any) =>
              //       enrollment.user === usr._id && enrollment.course === cid
              //   )
              // )
              .map((user: any) => (
                <tr key={user._id}>
                  <td className="wd-full-name text-nowrap">
                    <Link
                      to={`/Kanbas/Account/Users/${user._id}`}
                      className="text-decoration-none"
                    >
                      <FaUserCircle className="me-2 fs-1 text-secondary" />
                      <span className="wd-first-name">
                        {user.firstName}
                      </span>{" "}
                      <span className="wd-last-name">{user.lastName}</span>
                    </Link>
                  </td>
                  <td className="wd-login-id">{user.username}</td>
                  <td className="wd-section">{user.section}</td>
                  <td className="wd-role">{user.role}</td>
                  <td className="wd-last-activity">{user.lastActivity}</td>
                  <td className="wd-total-activity">{user.totalActivity}</td>
                  {/* a delete button, visible only to faculty */}
                  {currentUser.role === "FACULTY" && (
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          handleUnenrollUser(user._id, cid);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}
