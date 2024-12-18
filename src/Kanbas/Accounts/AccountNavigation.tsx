import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["SignIn", "SignUp"];
  // const active = (path: string) =>
  //   pathname.includes(path) ? "active" : "";

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      {links.includes("SignIn") && (
        <Link to="SignIn" className="list-group-item active border border-0">
          SignIn
        </Link>
      )}
      {links.includes("SignUp") && (
        <Link
          to="SignUp"
          className="list-group-item text-danger border border-0"
        >
          SignUp
        </Link>
      )}
      {links.includes("Profile") && (
        <Link
          to="Profile"
          className="list-group-item text-danger border border-0"
        >
          Profile
        </Link>
      )}
      {currentUser && currentUser.role === "ADMIN" && (
        <Link
          to={`/Kanbas/Account/Users`}
          className={`list-group-item  text-danger border border-0`}
        >
          Users
        </Link>
      )}
    </div>
  );
}

// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// export default function AccountNavigation() {
//   const { currentUser } = useSelector((state: any) => state.accountReducer);
//   const links = currentUser ? ["Profile"] : ["SignIn", "Signp"];
//   return (
//     <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
//       <Link to="SignIn" className="list-group-item active border border-0">
//         SignIn
//       </Link>
//       <Link to="SignUp" className="list-group-item text-danger border border-0">
//         SignUp
//       </Link>
//       <Link
//         to="Profile"
//         className="list-group-item text-danger border border-0"
//       >
//         Profile
//       </Link>
//     </div>
//   );
// }
