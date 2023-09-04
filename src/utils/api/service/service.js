import httpRequest from "../../request/request";
const service = {
  findAll: () => httpRequest.get("/Services/findServicesAll"),

  update: (data) => httpRequest.post("/Services/changeServicesById", data),

  updateTuijian: (data) => httpRequest.post("/Services/changeServices", data),
};
export default service;
