// API Configuration
const API_URL = "https://skillswap-api-1upf.onrender.com/api";

document.addEventListener("DOMContentLoaded", function () {
  const updateBtn = document.getElementById("updateProfileBtn");
  const feedback = document.getElementById("formFeedback");
  const exploreBtn = document.getElementById("exploreSkillsBtn");
  const selectedSkillsContainer = document.getElementById("selectedSkills");
  const skillInput = document.getElementById("skillInput");
  const skillDropdown = document.getElementById("skillDropdown");

  // --- 1. Consolidated Update Function ---
  if (updateBtn) {
    updateBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Session expired. Please login again.");
        window.location.href = "Signin.html";
        return;
      }

      // Change button state to "Loading"
      const originalBtnText = updateBtn.textContent;
      updateBtn.textContent = "Updating...";
      updateBtn.disabled = true;

      // Collect Skills from the UI tags
      const skills = Array.from(selectedSkillsContainer.querySelectorAll('div'))
        .map(tag => tag.textContent.trim().replace(/\s+/g, ' '));

      // Collect all form data
      const data = {
        name: document.querySelector('input[placeholder="Enter your full name"]').value,
        email: document.querySelector('input[type="email"]').value,
        phone: document.querySelector('input[type="tel"]').value,
        gender: document.querySelector("select").value,
        bio: document.querySelector("textarea").value,
        // Adding the missing fields that caused the 500 error
        role: document.querySelector('select:nth-of-type(2)')?.value || "", 
        industry: document.querySelector('select:nth-of-type(3)')?.value || "",
        location: document.querySelector('input[placeholder="Senior, Lagos State"]')?.value || "",
        skills: skills
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

        if (res.ok) {
          // ✅ Success: Update UI
          if (feedback) {
            feedback.textContent = "Profile updated successfully!";
            feedback.className = "text-sm text-center mb-4 font-medium text-emerald-600 block";
          }
          if (exploreBtn) {
            exploreBtn.classList.remove("hidden");
          }
          updateBtn.textContent = "Profile Updated!";
          updateBtn.classList.replace("bg-indigo-600", "bg-indigo-400");
        } else {
          // ❌ Server Error (Handled)
          throw new Error(result.message || "Server error occurred");
        }
      } catch (err) {
        console.error("Update Error:", err);
        alert(err.message || "Error updating profile");
        
        // Reset button so user can try again
        updateBtn.textContent = originalBtnText;
        updateBtn.disabled = false;
        
        if (feedback) {
          feedback.textContent = "Failed to update profile. Please try again.";
          feedback.className = "text-sm text-center mb-4 font-medium text-red-600 block";
        }
      }
    });
  }

  // --- 2. Skills Dropdown Logic ---
  const availableSkills = ["ui/ux design", "product design", "backend development", "fullstack engineering", "frontend development"];
  const colors = ["bg-teal-100 text-teal-700", "bg-indigo-100 text-indigo-700", "bg-amber-100 text-amber-700"];

  if (skillInput) {
    skillInput.addEventListener("input", (e) => {
      const value = e.target.value.toLowerCase();
      skillDropdown.innerHTML = "";
      if (value.length > 0) {
        const filtered = availableSkills.filter(s => s.includes(value));
        if (filtered.length > 0) {
          skillDropdown.classList.remove("hidden");
          filtered.forEach(skill => {
            const div = document.createElement("div");
            div.className = "px-4 py-2 hover:bg-indigo-50 cursor-pointer text-sm capitalize";
            div.textContent = skill;
            div.onclick = () => {
              addSkill(skill);
              skillDropdown.classList.add("hidden");
            };
            skillDropdown.appendChild(div);
          });
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
    tag.innerHTML = `${skill} <button type="button" onclick="this.parentElement.remove()" class="hover:text-red-500"><i class="fas fa-times text-xs"></i></button>`;
    selectedSkillsContainer.appendChild(tag);
    skillInput.value = "";
  }

  // --- 3. Profile Picture Upload Preview ---
  const uploadBtn = document.getElementById("uploadBtn");
  const profilePictureInput = document.getElementById("profilePictureInput");
  const profilePreview = document.getElementById("profilePreview");

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
          document.getElementById("profileIcon").classList.add("hidden");
        };
        reader.readAsDataURL(file);
      }
    });
  }
});
