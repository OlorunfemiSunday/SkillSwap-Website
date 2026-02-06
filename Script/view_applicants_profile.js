//api
const API_URL = "https://skillswap-api-1upf.onrender.com/api";

const updateBtn = document.getElementById("updateProfileBtn");

updateBtn.addEventListener("click", async () => {
  const token = localStorage.getItem("token");

  const data = {
    name: document.querySelector('input[placeholder="Enter your full name"]')
      .value,
    email: document.querySelector('input[type="email"]').value,
    phone: document.querySelector('input[type="tel"]').value,
    gender: document.querySelector("select").value,
    bio: document.querySelector("textarea").value,
  };

  try {
    const res = await fetch(`${API_URL}/users/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    alert(result.message);
  } catch (err) {
    console.error(err);
    alert("Error updating profile");
  }
});

// User Profile Interactive Functionality
document.addEventListener("DOMContentLoaded", function () {
  // --- Navigation & UI ---
  const mobileSearchToggle = document.getElementById("mobileSearchToggle");
  const mobileSearchBar = document.getElementById("mobileSearchBar");

  if (mobileSearchToggle && mobileSearchBar) {
    mobileSearchToggle.addEventListener("click", function (e) {
      e.preventDefault();
      mobileSearchBar.classList.toggle("hidden");
      mobileSearchBar.classList.add("mobile-menu-enter");
    });
  }

  // --- Profile Picture Upload ---
  const uploadBtn = document.getElementById("uploadBtn");
  const profilePictureInput = document.getElementById("profilePictureInput");
  const profilePreview = document.getElementById("profilePreview");
  const profileIcon = document.getElementById("profileIcon");

  if (uploadBtn && profilePictureInput) {
    uploadBtn.addEventListener("click", (e) => {
      e.preventDefault();
      profilePictureInput.click();
    });

    profilePictureInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          profilePreview.src = event.target.result;
          profilePreview.classList.remove("hidden");
          profileIcon.classList.add("hidden");
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // --- Skills Dropdown & Tags ---
  const availableSkills = [
    "ui/ux design",
    "product design",
    "backend development",
    "fullstack engineering",
    "frontend development",
  ];

  const colors = [
    "bg-teal-100 text-teal-700 border-teal-200",
    "bg-indigo-100 text-indigo-700 border-indigo-200",
    "bg-amber-100 text-amber-700 border-amber-200",
    "bg-rose-100 text-rose-700 border-rose-200",
    "bg-emerald-100 text-emerald-700 border-emerald-200",
  ];

  const skillInput = document.getElementById("skillInput");
  const skillDropdown = document.getElementById("skillDropdown");
  const selectedSkillsContainer = document.getElementById("selectedSkills");

  if (skillInput) {
    skillInput.addEventListener("input", (e) => {
      const value = e.target.value.toLowerCase();
      skillDropdown.innerHTML = "";

      if (value.length > 0) {
        const filtered = availableSkills.filter((s) =>
          s.toLowerCase().includes(value),
        );
        if (filtered.length > 0) {
          skillDropdown.classList.remove("hidden");
          filtered.forEach((skill) => {
            const div = document.createElement("div");
            div.className =
              "px-4 py-2 hover:bg-indigo-50 cursor-pointer text-sm capitalize";
            div.textContent = skill;
            div.onclick = () => addSkill(skill);
            skillDropdown.appendChild(div);
          });
        } else {
          skillDropdown.classList.add("hidden");
        }
      } else {
        skillDropdown.classList.add("hidden");
      }
    });
  }

  function addSkill(skill) {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const tag = document.createElement("div");
    tag.className = `flex items-center gap-2 px-3 py-1 border rounded-full text-sm font-medium capitalize ${randomColor}`;
    tag.innerHTML = `
      ${skill}
      <button type="button" onclick="this.parentElement.remove()" class="hover:text-red-500">
        <i class="fas fa-times text-xs"></i>
      </button>
    `;
    selectedSkillsContainer.appendChild(tag);
    skillInput.value = "";
    skillDropdown.classList.add("hidden");
  }

  // --- Dynamic Education & Professional Fields ---
  const addEducationBtn = document.getElementById("addEducation");
  if (addEducationBtn) {
    addEducationBtn.onclick = () => {
      const container = document.getElementById("educationContainer");
      const div = document.createElement("div");
      div.className = "pt-4 border-t border-gray-100 space-y-2 relative";
      div.innerHTML = `
        <button type="button" onclick="this.parentElement.remove()" class="absolute right-0 top-4 text-gray-400 hover:text-red-500"><i class="fas fa-trash"></i></button>
        <input type="text" required placeholder="Institution Name & Year" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
        <textarea required placeholder="Description of your studies..." class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" rows="2"></textarea>
      `;
      container.appendChild(div);
    };
  }

  const addProfessionalBtn = document.getElementById("addProfessional");
  if (addProfessionalBtn) {
    addProfessionalBtn.onclick = () => {
      const container = document.getElementById("professionalContainer");
      const div = document.createElement("div");
      div.className = "pt-4 border-t border-gray-100 space-y-2 relative";
      div.innerHTML = `
        <button type="button" onclick="this.parentElement.remove()" class="absolute right-0 top-4 text-gray-400 hover:text-red-500"><i class="fas fa-trash"></i></button>
        <input type="text" required placeholder="Job Title & Company" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
        <textarea required placeholder="Key responsibilities and achievements..." class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" rows="2"></textarea>
      `;
      container.appendChild(div);
    };
  }

  // --- Form Validation & Submission ---
  const updateProfileBtn = document.getElementById("updateProfileBtn");
  const feedback = document.getElementById("formFeedback");
  const exploreBtn = document.getElementById("exploreSkillsBtn");
  let formChanged = false;

  if (updateProfileBtn) {
    updateProfileBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const inputs = document.querySelectorAll(
        "input[required], select[required], textarea[required]",
      );
      let allFilled = true;

      inputs.forEach((input) => {
        if (!input.value.trim()) {
          allFilled = false;
          input.classList.add("border-red-500");
        } else {
          input.classList.remove("border-red-500");
        }
      });

      if (allFilled) {
        // Success Feedback
        if (feedback) {
          feedback.textContent = "Profile updated successfully!";
          feedback.className =
            "text-sm text-center mb-4 font-medium text-emerald-600 block";
        }

        // Show Explore Button
        if (exploreBtn) {
          exploreBtn.classList.remove("hidden");
          exploreBtn.scrollIntoView({ behavior: "smooth", block: "center" });
        }

        this.textContent = "Profile Updated!";
        this.classList.replace("bg-indigo-600", "bg-indigo-400");
        this.disabled = true;
        formChanged = false;
      } else {
        // Error Feedback
        if (feedback) {
          feedback.textContent =
            "Please fill in all mandatory fields marked in red.";
          feedback.className =
            "text-sm text-center mb-4 font-medium text-red-600 block";
        }
      }
    });
  }

  // --- Utilities ---
  document.addEventListener("click", (e) => {
    if (
      skillInput &&
      !skillInput.contains(e.target) &&
      !skillDropdown.contains(e.target)
    ) {
      skillDropdown.classList.add("hidden");
    }
  });

  const formInputs = document.querySelectorAll("input, textarea, select");
  formInputs.forEach((input) => {
    input.addEventListener("change", () => {
      formChanged = true;
    });
  });

  window.addEventListener("beforeunload", (e) => {
    if (formChanged) {
      e.preventDefault();
      e.returnValue = "";
    }
  });

  // Bio Character Counter
  const bioTextarea = document.querySelector("textarea[required]");
  if (bioTextarea) {
    const maxLength = 500;
    const counterDiv = document.createElement("div");
    counterDiv.className = "text-sm text-gray-500 text-right mt-1";
    counterDiv.textContent = `0/${maxLength}`;
    bioTextarea.parentNode.insertBefore(counterDiv, bioTextarea.nextSibling);

    bioTextarea.addEventListener("input", function () {
      const currentLength = this.value.length;
      counterDiv.textContent = `${currentLength}/${maxLength}`;
      counterDiv.classList.toggle("text-red-500", currentLength > maxLength);
    });
  }
});
