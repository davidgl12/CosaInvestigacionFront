import Home from "../page/Home";
import User from "../page/User";
import MyUser from "../page/MyUser";
import Users from "../page/Users";
import Error404 from "../page/Error404";

export default [
  {
    path: "/users",
    exact: true,
    page: Users,
  },
  {
    path: "/user",
    exact: true,
    page: MyUser,
  },
  {
    path: "/:id",
    exact: true,
    page: User,
  },
  {
    path: "/",
    exact: true,
    page: Home,
  },
  {
    path: "*",
    page: Error404,
  },
];
