
import httpRequest from "../../request/request"
const admin={
  login:(data)=>httpRequest.post("/Admin/adminLogin",data)
} 
export default admin