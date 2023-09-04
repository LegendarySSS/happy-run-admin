import httpRequest from "../../request/request";
const banner = {
  findRotograph: () => httpRequest.post("/Img/findRotograph"),

  update: (data) => httpRequest.post("/Img/changeImgById", data),

  updateData: (data) => httpRequest.post("/Img/changeData", data),

  add: (data) => httpRequest.post("/Img/addImg", data),
  delete: (data) => httpRequest.post("/Img/deleteImgById", data),
};
export default banner;
