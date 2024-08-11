export const getTime = () => {
  const hours = new Date().getHours();
  let message = "";
  if (hours >= 6 && hours <= 12) {
    message = "上午";
  } else if (hours <= 18) {
    message = "下午";
  } else {
    message = "晚上";
  }
  return message;
};
