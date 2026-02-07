document.addEventListener("DOMContentLoaded", function () {
  // Helper function to handle internal notifications
  function showInternalNotification(message, type = "info") {
    // Create or find notification element
    let notifyDiv = document.getElementById("internal-notification");

    if (!notifyDiv) {
      notifyDiv = document.createElement("div");
      notifyDiv.id = "internal-notification";
      notifyDiv.className =
        "fixed top-6 right-6 z-50 px-6 py-3 rounded-lg shadow-xl font-medium transition-all duration-300 transform translate-y-[-20px] opacity-0";
      document.body.appendChild(notifyDiv);
    }

    // Set styles based on type
    const styles = {
      info: "bg-blue-100 text-blue-800 border border-blue-200",
      success: "bg-emerald-100 text-emerald-800 border border-emerald-200",
      error: "bg-red-100 text-red-800 border border-red-200",
    };

    notifyDiv.textContent = message;
    notifyDiv.className = `fixed top-6 right-6 z-50 px-6 py-3 rounded-lg shadow-xl font-medium transition-all duration-300 transform translate-y-0 opacity-100 ${styles[type]}`;

    // Hide after 3 seconds
    setTimeout(() => {
      notifyDiv.classList.replace("opacity-100", "opacity-0");
      notifyDiv.classList.replace("translate-y-0", "translate-y-[-20px]");
    }, 3000);
  }

  // Message button click handler
  const messageBtn = document.querySelector("button:first-of-type");
  if (messageBtn) {
    messageBtn.addEventListener("click", function () {
      showInternalNotification("Message feature coming soon!", "info");
    });
  }

  // Accept button handler
  const acceptBtn = document.querySelector(".bg-indigo-600.px-8");
  if (acceptBtn) {
    acceptBtn.addEventListener("click", function () {
      showInternalNotification("Profile accepted!", "success");

      // UI Update
      acceptBtn.textContent = "Accepted";
      acceptBtn.disabled = true;
      acceptBtn.classList.replace("bg-indigo-600", "bg-emerald-600");
    });
  }

  // Reject button handler
  const rejectBtn = document.querySelector(".bg-white.border");
  if (rejectBtn) {
    rejectBtn.addEventListener("click", function () {
      // Note: confirm() is removed as requested.
      // In a production app, you would trigger a custom modal here.
      showInternalNotification("Profile rejected!", "error");

      // UI Update
      rejectBtn.textContent = "Rejected";
      rejectBtn.disabled = true;
      rejectBtn.classList.add("opacity-50", "cursor-not-allowed");
    });
  }
});
