const logoutButton = document.getElementById("logoutButton");

  logoutButton.addEventListener("click", function() {
    // Display a confirmation prompt
    const userConfirmation = confirm("Are you sure you want to log out?");

    // If the user confirms, log them out by clearing the session storage
    if (userConfirmation) {
      sessionStorage.clear();

      // Redirect the user to the "/login" route
      window.location.href = "/login"; 
    }
  });