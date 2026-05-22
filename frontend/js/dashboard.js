const BACKEND_URL = "http://localhost:3000";

// Redirect to home if not logged in
var userData = JSON.parse(localStorage.getItem("era_user"));
if (!userData) {
  window.location.href = "index.html";
}

var fullName = userData.first_name + " " + userData.last_name;

// Show name in navbar
var dashboardUser = document.getElementById("dashboard-user");
if (dashboardUser) {
  dashboardUser.textContent = "👤 " + fullName;
}

// Personalize welcome heading
var welcomeHeading = document.getElementById("welcome-heading");
if (welcomeHeading) {
  welcomeHeading.textContent = "Welcome back, " + userData.first_name + "!";
}

// Fetch enrollments and filter by logged-in user's name
fetch(BACKEND_URL + "/enrollments")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    var userClasses = data.filter(function (enrollment) {
      return (
        enrollment.first_name === userData.first_name &&
        enrollment.last_name === userData.last_name
      );
    });

    var contentDiv = document.getElementById("classes-content");

    if (userClasses.length === 0) {
      contentDiv.innerHTML =
        '<p class="no-classes">No classes found for your account. Please contact the school office.</p>';
      return;
    }

    var tableHTML =
      '<table class="classes-table">' +
      "<thead><tr><th>Class</th><th>Professor</th></tr></thead>" +
      "<tbody>";

    userClasses.forEach(function (cls) {
      tableHTML +=
        "<tr><td>" + cls.class_name + "</td><td>" + cls.teacher_name + "</td></tr>";
    });

    tableHTML += "</tbody></table>";
    contentDiv.innerHTML = tableHTML;
  })
  .catch(function (error) {
    document.getElementById("classes-content").innerHTML =
      '<p class="error-text">Could not load classes. Make sure the server is running.</p>';
    console.error("Error fetching enrollments:", error);
  });

function logout() {
  localStorage.removeItem("era_user");
  window.location.href = "index.html";
}