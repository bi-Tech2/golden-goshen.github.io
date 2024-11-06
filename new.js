// // IDMAJOR starts Here

/*
------------------ /api/blog
------------------ /api/mail

/get-posts
/get-single-post/:contentId
/create-posts
/update
/delete/:contentId
/send-email
/get-email



title
excerpt
content
image
category
author
reading-time
views
comments
----------------------------/
*/

Blog
document.addEventListener("DOMContentLoaded", () => {
  let formPut = document.getElementById("blog-post-form");

  let formData = {};

  if (formPut) {
    formPut.addEventListener("submit", async (e) => {
      e.preventDefault();

      await Promise.all(
        Array.from(formPut.querySelectorAll("input, select, textarea")).map(
          (element) => {
            let name = element.name;
            let value = element.value;

            if (name && element.type !== "file") {
              formData[name] = value;
            } else if (
              name &&
              element.type === "file" &&
              element.files.length > 0
            ) {
              let file = element.files[0];
              return new Promise((resolve) => {
                let reader = new FileReader();
                reader.onload = function (e) {
                  formData[name] = e.target.result;
                  resolve();
                };
                reader.readAsDataURL(file);
              });
            }
          }
        )
      );

      console.log("Form data ready to send:", formData);

      try {
        const response = await axios.post(
          "https://ggecl.onrender.com/api/blog/create-posts",
          formData
        );

        if (response.status !== 200 && response.status !== 201) {
          alert("Something went wrong, try again");
        } else {
          console.log("Response received:", response.data);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong, try again");
      }
    });
  }
});

// Contect form

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");

  let contactFormData = {};

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      contactForm
        .querySelectorAll("input, select, textarea")
        .forEach((element) => {
          const name = element.name;
          const value = element.value;

          if (name) {
            contactFormData[name] = value;
          }
        });

      console.log(contactFormData);

      try {
        const response = await axios.post(
          "https://ggecl.onrender.com/api/mail/contact-us",
          {
            name: contactFormData.name,
            email: contactFormData.email,
            message: contactFormData.message,
          }
        );

        alert(response.data);
        console.log(response);
      } catch (error) {
        console.log(error);
        alert("Something went wrong, try again");
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form-live");

  let contactFormData = {};

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      contactForm
        .querySelectorAll("input, select, textarea")
        .forEach((element) => {
          const name = element.name;
          const value = element.value;

          if (name) {
            contactFormData[name] = value;
          }
        });

      console.log(contactFormData);

      try {
        const response = await axios.post(
          "https://ggecl.onrender.com/api/mail/send-email",
          {
            name: contactFormData.name,
            email: contactFormData.email,
            subject: contactFormData.subject,
            message: contactFormData.message,
          }
        );

        alert("Message sent");
        console.log(response);
      } catch (error) {
        console.log(error);
        alert("Something went wrong, try again");
      }
    });
  }
});

async function fetchBlog() {
  try {
    const response = await axios.get(
      "https://ggecl.onrender.com/api/blog/get-posts"
    );
    console.log(response);

    response.data.forEach((datas) => {
      console.log(datas._id);

      let parent = document.querySelector(".blog-card-parent");

      let blogCard = document.createElement("div");
      blogCard.className = "blog-card";

      let blogCardImage = document.createElement("div");
      blogCardImage.className = "blog-card-image";
      let img = document.createElement("img");
      img.src = `./assets/images/r1.jpg`;
      img.alt = "Blog Thumbnail";
      blogCardImage.appendChild(img);
      blogCard.appendChild(blogCardImage);

      let blogCardContent = document.createElement("div");
      blogCardContent.className = "blog-card-content";

      let title = document.createElement("h2");
      title.className = "blog-title";
      title.textContent = `${datas.title}`;
      blogCardContent.appendChild(title);

      let excerpt = document.createElement("p");
      excerpt.className = "blog-excerpt";
      excerpt.textContent = `${datas.excerpt}`;
      blogCardContent.appendChild(excerpt);

      let blogMeta = document.createElement("div");
      blogMeta.className = "blog-meta";

      let author = document.createElement("span");
      author.className = "author";
      author.innerHTML = `<i class="icon-user"></i> ${datas.author}`;
      blogMeta.appendChild(author);

      let date = document.createElement("span");
      date.className = "date";
      date.innerHTML = `<i class="icon-calendar"></i> ${new Date().toLocaleDateString()}`;
      blogMeta.appendChild(date);

      blogCardContent.appendChild(blogMeta);

      let blogEngagement = document.createElement("div");
      blogEngagement.className = "blog-engagement";

      let readingTime = document.createElement("span");
      readingTime.className = "reading-time";
      readingTime.innerHTML = `<i class="icon-clock"></i> ${datas.readingTime} mins read`;
      blogEngagement.appendChild(readingTime);

      let commentsCount = document.createElement("span");
      commentsCount.className = "comments-count";
      commentsCount.innerHTML = `<i class="icon-comment"></i> ${datas.comments} comments`;
      blogEngagement.appendChild(commentsCount);

      let viewsCount = document.createElement("span");
      viewsCount.className = "views-count";
      viewsCount.innerHTML = `<i class="icon-eye"></i> ${datas.views}k views`;
      blogEngagement.appendChild(viewsCount);

      blogCardContent.appendChild(blogEngagement);

      let readMoreBtn = document.createElement("a");
      readMoreBtn.className = "read-more-btn";
      readMoreBtn.onclick = () => openModal(datas._id);
      readMoreBtn.innerHTML = `Read More <i class="icon-arrow-right"></i>`;
      blogCardContent.appendChild(readMoreBtn);

      blogCard.appendChild(blogCardContent);

      let categories = document.createElement("div");
      categories.className = "categories";

      let categoryList = ["lifestyle", "School", "Health"];
      categoryList.forEach((category) => {
        let cat = document.createElement("div");
        cat.className = "cat";
        cat.textContent = category;
        categories.appendChild(cat);
      });

      blogCard.appendChild(categories);

      parent.appendChild(blogCard);
    });
  } catch (error) {
    console.log(error);
  }
}

fetchBlog();

// Comments sec

async function fetchFeedback() {
  try {
    const response = await axios.get(
      "https://ggecl.onrender.com/api/mail/get-email"
    );
    console.log(response);

    let tbody = document.querySelector("tbody");

    tbody.innerHTML = "";

    response.data.forEach((datas) => {
      let row = document.createElement("tr");

      let userNameCell = document.createElement("td");
      userNameCell.className = "userName";
      userNameCell.id = "username";
      userNameCell.textContent = datas.name;

      let feedbackCell = document.createElement("td");
      feedbackCell.className = "Email";
      feedbackCell.id = "Email";
      feedbackCell.textContent = datas.message;

      let subjectCell = document.createElement("td");
      subjectCell.className = "Subject";
      subjectCell.id = "Subject";
      subjectCell.textContent = datas.subject;

      let dateCell = document.createElement("td");
      dateCell.className = "Date";
      dateCell.id = "Date";
      dateCell.textContent = new Date(datas.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      row.appendChild(userNameCell);
      row.appendChild(feedbackCell);
      row.appendChild(subjectCell);
      row.appendChild(dateCell);

      tbody.appendChild(row);
    });
  } catch (error) {
    console.log(error);
  }
}

fetchFeedback();
