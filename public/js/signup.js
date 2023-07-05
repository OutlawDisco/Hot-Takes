const signupFormHandler = async (event) => {
  event.preventDefault();
  console.log("success");

  const username = document.querySelector("#username").value.trim();
  const email = document.querySelector("#signUpInputEmail").value.trim();
  const password = document.querySelector("#signUpInputPassword").value.trim();

  if (username && email && password) {
    const response = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to sign up.");
    }
  }
};


const signUpForm = document.querySelector("#signUpForm")


if (signUpForm) {
  signUpForm.addEventListener("submit", signupFormHandler);

  
}




// document
//   .querySelector(".signup-form")
//   .addEventListener("submit", signupFormHandler);
