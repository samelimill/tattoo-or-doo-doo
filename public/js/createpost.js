
  document.addEventListener("DOMContentLoaded", function () {
    // Target the form by its ID
    const form = document.getElementById("myForm");

    form.addEventListener("submit", function (e) {
      e.preventDefault(); // Prevent the default form submission behavior

      // Create a FormData object to collect the form data
      const formData = new FormData(form);

      // Use the fetch API to send a POST request to the /tattoos route
      fetch("/api/users/tattoo", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("New Tattoo Post Created:", data);
          // You can add further actions here, like redirecting the user or displaying a success message.
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle errors here, like displaying an error message to the user.
        });
    });
  });