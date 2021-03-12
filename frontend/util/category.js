import { $CombinedState } from "redux"


export const getCategories = ()=> {
  return $.ajax({
    method: "GET", 
    url: "/api/categories",
  })
}