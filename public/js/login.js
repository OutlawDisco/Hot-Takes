const loginFormHandler = async (event) => {
  event.preventDefault();
  console.log("success");

  const email = document.querySelector("#loginInputEmail").value.trim();
  const password = document.querySelector("#loginInputPassword").value.trim();

  if (email && password) {
    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to log in.");
    }
  }
};


const loginForm = document.querySelector("#loginForm")


if (loginForm) {
  loginForm.addEventListener("submit", loginFormHandler);

  
}

