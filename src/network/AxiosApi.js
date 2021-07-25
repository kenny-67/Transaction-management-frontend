import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api/",
});

instance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token ? token : "";
  config.headers.ContentType = "application/json";
  return config;
});

export const register = async (data) =>
  await instance.post("users/register", data);

// auth endpoints
export const login = async (email, password) =>
  await instance.post("users/login", { email, password });

export const forgotPassword = async (email) =>
  await instance.post("users/forgotpassword", { email });

export const confirmReset = async (id, password) =>
  await instance.post(`users/resetpass/${id}`, { password });

export const confirmRegister = async (id) =>
  await instance.post(`users/confirm/${id}`);

export const logOut = async (token) => {
  return await instance.post(`/users/logout`, { token });
};

// Admin endpoints

//product
export const createProduct = async (data) =>
  await instance.post(`/product/create`, data);
export const getAllProduct = async () => await instance.get(`/product`);
export const getProduct = async (id) => await instance.get(`/product/${id}`);

//store
export const getAllStore = async () => await instance.get(`/store`);
export const getStore = async (id) => await instance.get(`/store/${id}`);

//warehouse
export const getAllWarehouse = async () => await instance.get(`/warehouse`);
export const getWarehouse = async (id) =>
  await instance.get(`/warehouse/${id}`);

//Employee
export const getAllEmployees = async () => await instance.get(`/employee`);

export const getAllEmployee = async (url) => await instance.get(url);

//Orders
export const createOrder = async (
  orderList,
  total,
  redirectURL,
  amountPaidByCustomer,
  orderType,
  customerDetail
) => {
  console.log(orderList, total, redirectURL, amountPaidByCustomer);
  return await instance.post(`/order/create`, {
    orderDetails: orderList,
    total,
    redirectURL,
    amountPaid: amountPaidByCustomer,
    orderType,
    customerDetail,
  });
};

export const getOrders = async () => {
  return await instance.get(`/order`);
};

export const getOrder = async (id) => {
  return await instance.get(`/order:${id}`);
};

//reoprt
export const generateReport = async (data) => {
  console.log(data);
  return await instance.post(`/report/${data.reportType}`, {
    endDate: data.endDate,
    startDate: data.startDate,
  });
};

//dashboard
export const getAdminHeaderData = async () => {
  return await instance.get(`/dashboard/adminHeader`);
};

//debt
export const getAllDebtor = async () => await instance.get(`/debtor`);
