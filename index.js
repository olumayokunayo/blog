//  CHECK CURRENT USER

function checkUser() {
  let currentUser = localStorage.getItem("user");
  console.log(currentUser);
  //
  if (!currentUser) {
    window.location.href = "login.html";
  }
}
checkUser();

//   LOG OUT BUTTON ** ISSUE
let logOutBtn = document.getElementById("logOut");
logOutBtn.addEventListener("click", function () {
  localStorage.removeItem("user");
  alert("Logging Out");
  window.location.href = "login.html";
});

//   WELCOME MESSAGE
function showGreet() {
  let date = new Date();
  let hours = date.getHours();
  let gotten = JSON.parse(localStorage.getItem("user"));
  let screen = document.getElementById("showGreeting");
  gotten.forEach((element) => {
    if (hours < 12) {
      screen.innerHTML = `Good Morning, ${element.username}`;
    } else if (hours > 12 && hours < 18) {
      screen.innerHTML = `Good Afternoon, ${element.username}`;
    } else if (hours > 18) {
      screen.innerHTML = `Good Evening, ${element.username}`;
    }
  });
}
showGreet();

//   POST BLOG
let showInputs = document.getElementById("showInput");
let showBlog = document.getElementById("showBlogs");
let postBtn = document.getElementById("post");
let author = document.getElementById("author");
let title = document.getElementById("title");
let content = document.getElementById("textarea");
let inputBlock = document.querySelector(".inputControls");
let blogArr = JSON.parse(localStorage.getItem("myPosts"));
// console.log(blogArr);

//  DATE FUNCTION FOR POSTS
let today = new Date();
today = today.toString().split(" ");
date = today[0] + " " + today[1] + " " + today[2] + " " + today[3];
time = today[4];
Time = date + "" + " " + time;
console.log(Time);

//   console.log(blogArr);
postBtn.addEventListener("click", function () {
  author.value = "";
  title.value = "";
  content.value = "";
  inputBlock.style.display = "block";
});

let postBlogBtn = document.getElementById("postBlog");

// POST BLOGS

postBlogBtn.addEventListener("click", function () {
  showBlog.innerHTML = "";
  let post = {
    Author: author.value,
    Title: title.value,
    Content: content.value,
    Time: `${Time}`,
    id: null,
    isLiked: false,
  };
  if (blogArr == null) {
    blogArr = [];
    blogArr.push(post);
    post.id = blogArr.length + 1;
    localStorage.setItem("myPosts", JSON.stringify(blogArr));
  } else {
    blogArr.push(post);
    post.id = blogArr.length + 1;
    localStorage.setItem("myPosts", JSON.stringify(blogArr));
  }
  inputBlock.style.display = "none";

  showingBlog();
});

//  SHOW BLOGS

let showBlogs = document.getElementById("showBlogs");

function showingBlog() {
  let blogs = JSON.parse(localStorage.getItem("myPosts"));
  // console.log(blogArr);
  // console.log(blogs);
  showBlogs.innerHTML = "";
  for (let i = 0; i < blogs.length; i++) {
    blog = blogs[i];
    showBlogs.innerHTML += `
          <div class="blog">
            <div class="inputController">
              <p>Author:${blog.Author}</p>
              <p>Title:${blog.Title}</p>
              <p>${blog.Content}</p>
              <p>${blog.Time}</p>
            </div>
          </div>`;
    if (blog.isLiked == false) {
      showBlogs.innerHTML += `
              <div class="editController">
              <div class= "btns">
                  <button class="del" onclick="deleteBtn(${i})">
                    <span class="material-symbols-outlined"> remove </span>
                  </button>
                  <button class= "lik" onclick="likeBtn(this,'${blog.id}')">
                    <span class="material-symbols-outlined"> favorite </span>
                  </button>
                  </div>
              </div>
            `;
    } else {
      showBlogs.innerHTML += `
            <div class="editController">
            <div class= "btns">
                <button class="del" onclick="deleteBtn(${i})">
                  <span class="material-symbols-outlined"> remove </span>
                </button>
                <button class='lik color' onclick="likeBtn(this,'${blog.id}')">
                  <span class="material-symbols-outlined"> favorite </span>
                </button>
                </div>
              </div>
            `;
    }
  }
}

showingBlog();

// DELETE

function deleteBtn(i) {
  blogArr.splice(i, 1);
  console.log(i);
  localStorage.setItem("myPosts", JSON.stringify(blogArr));
  showingBlog();
}

// LIKE BUTTON
function likeBtn(i, el) {
  console.log(i, el);
  let savedLikes = blogArr.find((like) => like.id == el);
  console.log(savedLikes.isLiked);
  if (i.classList.contains("color")) {
    i.classList.remove("color");
    savedLikes.isLiked = false;
    console.log(savedLikes.isLiked);
    localStorage.setItem("myPosts", JSON.stringify(blogArr));
  } else {
    i.classList.add("color");
    savedLikes.isLiked = true;
    console.log(savedLikes.isLiked);
    localStorage.setItem("myPosts", JSON.stringify(blogArr));
  }
}

// LIKED BLOGS

let likedBlogBtn = document.getElementById("liked");
let likedSection = document.getElementById("likedSection");
let latest = document.querySelector(".latest");

likedBlogBtn.addEventListener("click", function () {
  showBlog.style.display = "none";
  latest.innerText = "Liked Blogs";
  inputBlock.style.display = "none";
  gallery.style.display = "none";

  let fetchedBlogs = JSON.parse(localStorage.getItem("myPosts"));
  console.log(fetchedBlogs);

  let likedBlogs = fetchedBlogs.filter((el) => el.isLiked == true);
  console.log(likedBlogs);
  likedSection.innerHTML = "";
  for (let i = 0; i < likedBlogs.length; i++) {
    likedBlog = likedBlogs[i];
    likedSection.innerHTML += ` <div class="likedBlogs">
              <h4>Author:${likedBlog.Author}</h4>
              <h4>Title:${likedBlog.Title}</h4>
              <p>${likedBlog.Content}</p>
            </div>`;
  }
});
// ALL BLOGS
let gallery = document.querySelector(".gallery");
let allBlogsBtn = document.getElementById("allBlogs");
let allBlogsSection = document.querySelector(".allBlogsSection");
// let wholeBlog = document.getElementById("allBlogs");
allBlogsBtn.addEventListener("click", function () {
  let allBlogs = JSON.parse(localStorage.getItem("myPosts"));
  console.log(allBlogs);
  for (let i = 0; i < allBlogs.length; i++) {
    blogs = allBlogs[i];
    allBlogsSection.innerHTML += `
          <div class="blog">
            <div class="inputController">
              <h4>Author:${blogs.Author}</h4>
              <h4>Title:${blogs.Title}</h4>
              <p>Content:${blogs.Content}</p>
              <div>${blog.Time}</div>
            </div>
          </div>`;
  }
  showBlog.style.display = "none";
  likedSection.style.display = "none";
  gallery.style.display = "none";
  latest.innerText = "ALL BLOGS";
});

// DARK MODE

let darkBtn = document.getElementById("darkBtn");
let aside = document.getElementById("aside");
let iblog = document.querySelectorAll(".likedBlogs");
let sBlog = document.querySelector(".showBlogs");
let body = document.getElementById("body");
let eachBlog = document.querySelectorAll(".blog");
let icon = document.getElementById("icon");
let sideRight = document.querySelector(".side-right");

darkBtn.addEventListener("click", function () {
  darkBtn.innerHTML = `<ion-icon name="sunny-outline"></ion-icon>`;
  body.classList.toggle("dark");
  aside.classList.toggle("light");
});

// GALLERY

let imagesArr = [
  "./images/img1",
  "./images/img2.png",
  "./images/img3.png",
  "./images/img5.png",
  "./images/img6.jpg",
];
let imagesIndex = 0;
let mainImage = document.getElementById("mainImage");
let btnLeft = document.getElementById("btnLeft");
let btnRight = document.getElementById("btnRight");

btnLeft.addEventListener("click", function () {
  imagesIndex--;
  console.log(imagesIndex);
  mainImage.setAttribute("src", imagesArr[imagesIndex]);
  if (imagesIndex == 0) {
    imagesIndex = 4;
  }
});
btnRight.addEventListener("click", function () {
  imagesIndex++;
  console.log(imagesIndex);
  mainImage.setAttribute("src", imagesArr[imagesIndex]);
  if (imagesIndex == 4) {
    imagesIndex = 0;
  }
});
