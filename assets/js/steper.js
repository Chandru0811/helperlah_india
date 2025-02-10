$(document).ready(function () {
  const form = $(".form-wizard");
  const steps = $(".step");
  const stepContainer = $(".steps-container");
  const stepIndicators = $(".progress-container li");
  const progress = $(".progress");
  const prevButton = $(".prev-btn");
  const nextButton = $(".next-btn");
  const submitButton = $(".submit-btn");

  let currentStep = 0;
  $.validator.addMethod(
    "atLeastOneChecked",
    function (value, element) {
      return $("input[name='hours[]']:checked").length > 0;
    },
    "!Please select at least one option."
  );
  // Initialize jQuery validation
  form.validate({
    errorClass: "error",
    // errorElement: "small",
    rules: {
      "hours": {
        required: true,
      },
      "property": {
        required: true,
      },
      paymentType: {
        required: true,
      },
      // email: {
      //   required: true,
      //   email: true,
      // },
      // phone: {
      //   required: true,
      //   digits: true,
      //   minlength: 10,
      //   maxlength: 15,
      // },
      // username: "required",
      // password: {
      //   required: true,
      //   minlength: 6,
      // },
      // "confirm-password": {
      //   required: true,
      //   equalTo: "#password",
      // },
      // bio: "required",
    },
    messages: {
      hours: "*Please select the Hours.",
      property: "!Please select the Property Type.",
      paymentType: "!please select the Payment Type",
      // email: {
      //   required: "Please enter your email.",
      //   email: "Please enter a valid email address.",
      // },
      // phone: {
      //   required: "Please enter your phone number.",
      //   digits: "Please enter only digits.",
      //   minlength: "Phone number must be at least 10 digits.",
      //   maxlength: "Phone number can't exceed 15 digits.",
      // },
      // username: "Please choose a username.",
      // password: {
      //   required: "Please provide a password.",
      //   minlength: "Password must be at least 6 characters long.",
      // },
      // "confirm-password": {
      //   required: "Please confirm your password.",
      //   equalTo: "Passwords do not match.",
      // },
      // bio: "Please provide your bio.",
    },
    highlight: function (element) {
      // console.log("highlight element",element)
      if (element.type === "checkbox") {
        $(element).closest(".form-group").addClass("is-invalid");
      } else {
        $(element).addClass("is-invalid");
      }
    },
    unhighlight: function (element) {
      if (element.type === "checkbox") {
        $(element).closest(".form-group").removeClass("is-invalid");
      } else {
        $(element).removeClass("is-invalid");
      }
    },
    errorPlacement: function (error, element) {
      console.log("errorPlacement", error);
      if (element.attr("type") === "checkbox") {
        error.appendTo(element.closest(".form-group").parent());
      } else if (element.attr("type") === "radio") {
        error.appendTo(element.closest(".form-group").parent());
        console.log("radio formGroup:", error);
      } else {
        console.log("errorPlacement error", error);
        error.insertAfter(element);
      }
    },

    invalidHandler: function (event, validator) {
      console.log("invalidHandler");
      console.log("validator", validator.errorList);
      if (validator.errorList.length) {
        const firstError = $(element[0]);
        $("html, body").animate(
          {
            scrollTop: firstError.offset().top - 100,
          },
          500
        );
        firstError.focus();
      }
    },
  });

  const updateProgress = () => {
    const width = currentStep / (steps.length - 1);
    progress.css("transform", `scaleX(${width})`);
     if(currentStep === 1){
    const currentStepHeight = $(steps[currentStep]).outerHeight();
    console.log("height", currentStepHeight);
    stepContainer.css("height", `${currentStepHeight}px`);
     }
    steps.each((index, step) => {
      $(step).css("transform", `translateX(${currentStep * -100}%)`);
      $(step).toggleClass("current", index === currentStep);
    });

    stepIndicators.each((index, indicator) => {
      $(indicator).toggleClass("current", index === currentStep);
      $(indicator).toggleClass("done", index < currentStep);
    });

    prevButton.toggle(currentStep > 3);
    nextButton.toggle(currentStep < steps.length - 1);
    submitButton.toggle(currentStep === steps.length - 1);
  };

  const isValidStep = () => {
    const fields = $(steps[currentStep]).find("input, textarea");
    return fields.valid();
  };

  nextButton.on("click", (e) => {
    e.preventDefault();
    if (isValidStep() && currentStep < steps.length - 1) {
      currentStep++;
      updateProgress();
    }
  });

  prevButton.on("click", (e) => {
    e.preventDefault();
    if (currentStep > 0) {
      currentStep--;
      updateProgress();
    }
  });

  form.on("submit", (e) => {
    e.preventDefault();
    console.log(form.valid());
    if (form.valid()) {
      const formData = form.serializeArray();
      console.log("Form Data:", formData);

      submitButton.prop("disabled", true).text("Submitting...");

      setTimeout(() => {
        //   $(".completed").show();
        console.log("Form submitted successfully!");
      }, 3000);
    }
  });

  updateProgress();
});
