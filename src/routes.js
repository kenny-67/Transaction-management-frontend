import Register from "./views/Authentication/Register";
import Login from "./views/Authentication/Login.js";
import ResetPassword from "./views/Authentication/ResetPassword";
import ConfirmPassword from "./views/Authentication/ConfirmPassword";
import ResetPasswordSuccess from "./views/Authentication/ResetPasswordSuccess";
import ConfirmEmail from "./views/Authentication/ConfirmEmail";
import Dashboard from "./views/Admin/Dashboard";
import Products from "./views/Admin/Product/Products";
import Stores from "./views/Admin/Stores/Stores";
import Warehouses from "./views/Admin/Warehouse/Warehouses";
import AddProduct from "./views/Admin/Product/AddProduct";

const routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Dashboard,
    layout: "/admin",
    api: false,
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
    api: true,
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
    api: true,
  },
  {
    path: "/confirm-email/:id",
    name: "Confirm Email",
    icon: "ni ni-check-bold text-green",
    component: ConfirmEmail,
    layout: "/auth",
    api: true,
  },
  {
    path: "/reset-password",
    name: "Reset Password",
    icon: "ni ni-folder-17 text-pink",
    component: ResetPassword,
    layout: "/auth",
    api: true,
  },
  {
    path: "/reset-success",
    name: "Password Reset Confirmed",
    icon: "ni ni-folder-17 text-pink",
    component: ResetPasswordSuccess,
    layout: "/auth",
    api: false,
  },
  {
    path: "/confirm-password/:id",
    name: "Confirm Password",
    icon: "ni ni-folder-17 text-pink",
    component: ConfirmPassword,
    layout: "/auth",
    api: true,
  },
  {
    path: "/products",
    name: "Products",
    icon: "fas fa-chart-line",
    component: Products,
    layout: "/admin",
    api: false,
  },
  {
    path: "/employees",
    name: "Employees",
    icon: "ni ni-single-02 text-yellow",
    component: Dashboard,
    layout: "/admin",
    api: false,
  },
  {
    path: "/stores",
    name: "stores",
    icon: "fas fa-store",
    component: Stores,
    layout: "/admin",
    api: false,
  },
  {
    path: "/warehouses",
    name: "warehouse",
    icon: "fas fa-house-user",
    component: Warehouses,
    layout: "/admin",
    api: false,
  },
  {
    path: "/add-product",
    name: "Add Product",
    icon: "ni ni-tv-2 text-primary",
    component: AddProduct,
    layout: "/admin",
    api: true,
  },
];
export default routes;
