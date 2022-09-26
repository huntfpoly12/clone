import getCart from "./getCart";
import getOrder from "./getOrder";
import getParters from "./parters";
import adminCompanyManageScreen from "./AdminCompanyManageScreen";
const queries = {
  getCart: getCart,
  getOrders:getOrder,
  getParters:getParters,
  adminCompanyManageScreen:adminCompanyManageScreen,
};

export default queries;
