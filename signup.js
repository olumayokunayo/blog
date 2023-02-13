// AUTO WRITE

let words =
  "Welcome to my Blog. This Blog was created using HTML, CSS AND JAVASRIPT.";
let heroScreen = document.querySelector(".hero-header");
let i = 0;
let j = words.length - 1;

function writeWord() {
  let interval = setInterval(() => {
    if (i < words.length) {
      heroScreen.innerHTML += words[i];
      i++;
    } else {
      clearInterval(interval);
      setTimeout(() => {
        deleteWord();
      }, 1000);
    }
  }, 200);
}

function deleteWord() {
  let interval = setInterval(() => {
    if (j >= 0) {
      heroScreen.innerHTML = heroScreen.innerHTML.slice(0, -1);
      j--;
    } else {
      clearInterval(interval);
    }
  }, 200);
}
writeWord();
let username = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("password2");
let signUpBtn = document.getElementById("signBtn");
let signVisibility = document.querySelector(".signUpBtn");
let userArr = JSON.parse(localStorage.getItem("user"));

console.log(userArr);
signVisibility.addEventListener("click", function () {
  if (password.type == "password" && confirmPassword.type == "password") {
    password.type = "text";
    confirmPassword.type = "text";
    signVisibility.innerHTML = `<span class="material-symbols-outlined">
                visibility
                </span>`;
  } else {
    password.type = "password";
    confirmPassword.type = "password";
    signVisibility.innerHTML = `<span class="material-symbols-outlined">
                visibility_off
            </span>`;
  }
});

signUpBtn.addEventListener("click", function () {
  let userInfo = {
    username: username.value,
    email: email.value,
    password: password.value,
  };

  if (userArr == null) {
    userArr = [];
    userArr.push(userInfo);
    localStorage.setItem("user", JSON.stringify(userArr));
  } else {
    userArr.push(userInfo);
    localStorage.setItem("user", JSON.stringify(userArr));
  }

  if (username.value == "" || email.value == "" || password.value == "") {
    alert("Enter your details");
  } else if (password.value !== confirmPassword.value) {
    alert("Password does not match");
  } else {
    alert("Sign up successful");
    window.location.href = "login.html";
  }
});
// LOG IN HERE

let logHereBtn = document.getElementById("logHere");

logHereBtn.addEventListener("click", function () {
  window.location.href = "login.html";
});

//  <script>
// const firebaseConfig = {
//   apiKey: "AIzaSyC9KZlCbZC88yxK68PTYqotYzfs_RxVuLs",
//   authDomain: "rad-blog-a3e9d.firebaseapp.com",
//   projectId: "rad-blog-a3e9d",
//   storageBucket: "rad-blog-a3e9d.appspot.com",
//   messagingSenderId: "790077899970",
//   appId: "1:790077899970:web:e9c926f19d65b000e6675b",
// };

//  // Initialize Firebase
// // const app = firebase.initializeApp(firebaseConfig);

// // var provider = new firebase.auth.GoogleAuthProvider();

// // function signGoogle() {
//   firebase
//     .auth()
//     .signInWithPopup(provider)
//     .then((result) => {
//       /** @type {firebase.auth.OAuthCredential} */
//       var credential = result.credential;

//       // This gives you a Google Access Token. You can use it to access the Google API.
//       var token = credential.accessToken;
//       // The signed-in user info.
//       var user = result.user;
//       alert("Sign in succesful");
//       // IdP data available in result.additionalUserInfo.profile.
//       // ...
//     })
//     .catch((error) => {
//       // Handle Errors here.
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       // The email of the user's account used.
//       var email = error.email;
//       // The firebase.auth.AuthCredential type that was used.
//       var credential = error.credential;
//       // ...
//     });
// }
