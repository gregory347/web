function toggleContent(sectionId) {
  var sections = document.querySelectorAll(".content-section");
  sections.forEach(function (section) {
    section.classList.remove("active");
    section.style.opacity = "0";
  });

  var section = document.getElementById(sectionId);
  if (section) {
    section.classList.add("active");
    section.scrollIntoView({ behavior: "smooth" });

    setTimeout(function () {
      section.style.opacity = "1";
    }, 10);
  }

  closemenu();
}

function openmenu() {
  document.getElementById("sidemenu").style.left = "0";
}

function closemenu() {
  document.getElementById("sidemenu").style.left = "-200px";
}

function toggleMenu() {
  const sidemenu = document.getElementById("sidemenu");
  sidemenu.classList.toggle("open");

  if (sidemenu.style.left === "0px") {
    closemenu();
  } else {
    openmenu();
  }
}

document.addEventListener("click", function (event) {
  const sidemenu = document.getElementById("sidemenu");
  const toggleButton = document.querySelector(".nav-toggle");

  if (
    !sidemenu.contains(event.target) &&
    !toggleButton.contains(event.target)
  ) {
    closemenu();
  }
});

window.addEventListener("resize", function () {
  if (window.innerWidth > 768) {
    closemenu();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".toggle-btn");
  const contents = document.querySelectorAll(".toggle-content");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const target = this.getAttribute("data-target");

      contents.forEach((content) => content.classList.remove("active"));

      document.getElementById(target).classList.add("active");
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const submitButton = document.querySelector("#contact-form button");

  document
    .getElementById("contact-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const scriptURL =
        "https://script.google.com/macros/s/AKfycbxOg2vN2eylNPaWR_30Cs4Kmh1olUiCUXj7QlayB5zRq29Wrcz9Amsu35lLYFwWo_GXPg/exec";
      const form = document.forms["submit-to-google-sheet"];

      submitButton.disabled = true;

      fetch(scriptURL, {
        method: "POST",
        body: new FormData(form),
        mode: "no-cors",
      })
        .then(() => {
          document.getElementById("status").innerHTML =
            "message sent successfully😊";
          form.reset();
        })
        .catch((error) => {
          document.getElementById("status").innerHTML =
            "error sending message.";
          console.error("Error!", error.message);
        })
        .finally(() => {
          submitButton.disabled = false;
        });
    });
});
