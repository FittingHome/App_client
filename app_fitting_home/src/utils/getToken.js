export default function getToken() {
  const token = localStorage.getItem("token");
  const userToken = JSON.parse(token);
  return userToken;
}
