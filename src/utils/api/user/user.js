import httpRequest from "../../request/request";
const user = {
  findUserByPage: (page) =>
    httpRequest.getByurl(
      `/User/findUserByPage/${page.current}/${page.pageSize}`
    ),

  updateUser: (data) => httpRequest.post("/User/changeUerById", data),

  findGetRewardUserByPage: (page) =>
    httpRequest.getByurl(
      `/User/findGetRewardUserByPage/${page.current}/${page.pageSize}`
    ),

  findStaffList: (page) =>
    httpRequest.getByurl(
      `/User/findStaffList/${page.current}/${page.pageSize}`
    ),

    addUserBalance: (userId,number) =>
    httpRequest.getByurl(
      `/User/addUserBalance/${userId}/${number}`
    ),
};
export default user;
