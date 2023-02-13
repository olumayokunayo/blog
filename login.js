let username = document.getElementById("username");
let password = document.getElementById("password");
let logInBtn = document.getElementById("logBtn");
let logBtnVisibility = document.querySelector(".logInBtn");
let gotten = JSON.parse(localStorage.getItem("user"));
console.log(gotten);

logBtnVisibility.addEventListener("click", function () {
  if (password.type == "password") {
    password.type = "text";
    logBtnVisibility.innerHTML = `<span class="material-symbols-outlined">
        visibility
        </span>`;
  } else {
    password.type = "password";
    logBtnVisibility.innerHTML = `<span class="material-symbols-outlined">
        visibility_off
    </span>`;
  }
});

logInBtn.addEventListener("click", function () {
  let found = gotten.find(
    (element) =>
      element.username == username.value && element.password == password.value
  );
  console.log(found);
  if (found) {
    alert("Loggin In");
    window.location.href = "blog.html";
  } else {
    alert("User not found");
  }
});
