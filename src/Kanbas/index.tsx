import { Routes, Route, Navigate } from "react-router-dom";
import Accounts from "./Accounts";
import Dashboard from "./Dashboard/index";
import Courses from "./Courses/index";
import AccountNavigation from "./Navigation";
import "./index.css";
import * as db from "./Database";
import { useEffect, useState } from "react";
import store from "./store";
import { Provider, useSelector } from "react-redux";
import ProtectedRoute from "./Accounts/ProtectedRoute";
import Session from "./Accounts/Session";
import * as courseClient from "./Courses/client";
import * as userClient from "./Accounts/client";
import { fetchAllCourses } from "./Courses/client";

const Kanbas = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [allCourses, setAllCourses] = useState<any[]>([]);

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const [enrolling, setEnrolling] = useState<boolean>(false);
  // const fetchCourses = async () => {
  //   try {
  //     console.log("Current User:", currentUser._id);
  //     const courses = await userClient.findCoursesForUser(currentUser._id);
  //     setCourses(courses);
  //     console.log("Courses:", courses);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const fetchCourses = async () => {
    try {
      const allCourses = await courseClient.fetchAllCourses();
      const enrolledCourses = await userClient.findCoursesForUser(
        currentUser._id
      );
      const courses = allCourses.map((course: any) => {
        if (enrolledCourses.find((c: any) => c._id === course._id)) {
          return { ...course, enrolled: true };
        } else {
          return course;
        }
      });
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllCourses = async () => {
    try {
      const fetchedCourses = await courseClient.fetchAllCourses();
      setAllCourses(fetchedCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchAllCourses();
  }, [currentUser]);

  const [course, setCourse] = useState<any>({
    _id: "1234",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "New Description",
  });

  const addNewCourse = async () => {
    // const newCourse = await userClient.createCourse(course);
    const newCourse = await courseClient.createCourse(course);
    setCourses([...courses, newCourse]);
    setAllCourses([...allCourses, newCourse]);
  };

  const deleteCourse = async (courseId: any) => {
    // const status = await courseClient.deleteCourse(courseId);
    const status = await courseClient.deleteCourse(courseId);
    setCourses(courses.filter((course) => course._id !== courseId));
    setAllCourses(allCourses.filter((course) => course._id !== courseId));
  };

  const updateCourse = async () => {
    await courseClient.updateCourse(course);
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
      })
    );
    setAllCourses(
      allCourses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
      })
    );
  };

  return (
    // <Provider store={store}>
    <div id="wd-kanbas" className="kanbas">
      <Session>
        <div>
          <table>
            <tbody>
              <AccountNavigation />
              <div className="wd-main-content-offset p-3">
                <Routes>
                  <Route
                    path="/"
                    // element={<Navigate to="Accounts/SignIn" replace />}
                    element={<Navigate to="Dashboard" replace />}
                  />
                  <Route path="Account/*" element={<Accounts />} />
                  <Route
                    path="Dashboard/*"
                    element={
                      <ProtectedRoute>
                        <Dashboard
                          courses={courses}
                          course={course}
                          setCourse={setCourse}
                          addNewCourse={addNewCourse}
                          deleteCourse={deleteCourse}
                          updateCourse={updateCourse}
                          fetchCourses={fetchCourses}
                          allCourses={allCourses}
                          fetchAllCourses={fetchAllCourses}
                          enrolling={enrolling}
                          setEnrolling={setEnrolling}
                        />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="Courses/:cid/*"
                    element={
                      <ProtectedRoute>
                        <Courses courses={courses} />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="Calendar" element={<h1>Calendar</h1>} />
                  <Route path="Inbox" element={<h1>Inbox</h1>} />
                </Routes>
              </div>
            </tbody>
          </table>
        </div>
      </Session>
    </div>
    // </Provider>
  );
};

export default Kanbas;
