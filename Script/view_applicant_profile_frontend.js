document.addEventListener("DOMContentLoaded", function () {
  function showInternalNotification(message, type = "info") {
    let notifyDiv = document.getElementById("internal-notification");

    if (!notifyDiv) {
      notifyDiv = document.createElement("div");
      notifyDiv.id = "internal-notification";
      notifyDiv.className =
        "fixed top-6 right-6 z-50 px-6 py-3 rounded-lg shadow-xl font-medium transition-all duration-300 transform translate-y-[-20px] opacity-0";
      document.body.appendChild(notifyDiv);
    }

    const styles = {
      info: "bg-blue-100 text-blue-800 border border-blue-200",
      success: "bg-emerald-100 text-emerald-800 border border-emerald-200",
      error: "bg-red-100 text-red-800 border border-red-200",
    };

    notifyDiv.textContent = message;
    notifyDiv.className = `fixed top-6 right-6 z-50 px-6 py-3 rounded-lg shadow-xl font-medium transition-all duration-300 transform translate-y-0 opacity-100 ${styles[type]}`;

    setTimeout(() => {
      notifyDiv.classList.replace("opacity-100", "opacity-0");
      notifyDiv.classList.replace("translate-y-0", "translate-y-[-20px]");
    }, 3000);
  }

  // Use IDs for better reliability
  const messageBtn = document.getElementById("messageBtn");
  const acceptBtn = document.getElementById("acceptBtn");
  const rejectBtn = document.getElementById("rejectBtn");

  if (messageBtn) {
    messageBtn.addEventListener("click", () => {
      showInternalNotification("Message feature coming soon!", "info");
    });
  }

  if (acceptBtn) {
    acceptBtn.addEventListener("click", () => {
      showInternalNotification("Profile accepted!", "success");
      acceptBtn.textContent = "Accepted";
      acceptBtn.disabled = true;
      acceptBtn.className =
        "bg-emerald-600 text-white px-8 py-2 rounded-lg opacity-80 cursor-not-allowed";
    });
  }

  if (rejectBtn) {
    rejectBtn.addEventListener("click", () => {
      showInternalNotification("Profile rejected!", "error");
      rejectBtn.textContent = "Rejected";
      rejectBtn.disabled = true;
      rejectBtn.className =
        "bg-gray-100 text-gray-400 border px-8 py-2 rounded-lg cursor-not-allowed";
    });
  }
});
