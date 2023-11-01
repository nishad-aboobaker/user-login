document.getElementById("btn-login").addEventListener("click",()=>{
    
    let username=document.getElementById("username").value
    let Password=document.getElementById("password").value


    fetch("http://localhost:3004/authentication/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        username,Password
    })
  })
    .then((res) => {
      if(res.status==201)
      {
        alert("Login Succesfull")
      }
      else
      {
        alert("Login Failed")
      }
    })
    .catch((error)=>{alert("server not connected")})


})