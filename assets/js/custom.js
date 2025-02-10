// ===For Number Input ====
const phoneInput = document.getElementById("phone-input");
if (phoneInput) {
  phoneInput.addEventListener("input", (event) => {
    event.target.value = event.target.value.replace(/[^0-9]/g, "");
  });
}
// ===Back to Top Button ===
const backToTopButton = document.getElementById("back-to-top");
if (backToTopButton) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      backToTopButton.style.display = "flex";
    } else {
      backToTopButton.style.display = "none";
    }
  });
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// ===For Date Input ===
const dateInput = document.getElementById("date-input");
if (dateInput) {
  dateInput.addEventListener("input", () => {
    if (dateInput.value) {
      dateInput.classList.add("has-value");
    } else {
      dateInput.classList.remove("has-value");
    }
  });
}

function navigateBack() {
  console.log("object")
  window.history.go(-1);
}