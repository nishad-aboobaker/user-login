const key = localStorage.key(0);
const value = JSON.parse(localStorage.getItem(key));
fetch("http://localhost:3004/authentication/home", {
  headers: { Authorization: `Bearer ${value}` },
})
  .then((res) => res.json())
  .then((data) => {
    const { msg } = data;
    document.getElementById("show").innerHTML = msg;
  })
  .catch((error) => {
    console.log(error);
  });
