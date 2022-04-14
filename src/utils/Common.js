export const ConvertDate = (dateString) => {
  if(!dateString)return
  let date = new Date(dateString);
  let day = ("0" + date.getDate()).slice(-2);
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let fullDate = date.getFullYear()+"-"+(month)+"-"+(day);
  return fullDate;
}


 