function telcoNavbar() {
  var x = document.getElementById("telcoLinks");
  if (x.style.display === "block") 
    x.style.display = "none";
  else
    x.style.display = "block";
}

function localNavbar() {
  var x = document.getElementById("localLinks");
  if (x.style.display === "block")
    x.style.display = "none";
  else
    x.style.display = "block";
}

$(document).ready(function() {
  // Check if the navbar is collapsed or not
  var isNavbarCollapsed = $(".navbar-collapse").hasClass("show");
  
  // Save the state to local storage
  localStorage.setItem("navbarCollapsed", isNavbarCollapsed);
});

// Restore navbar state from local storage
$(window).on("load", function() {
  // Retrieve the navbar state from local storage
  var isNavbarCollapsed = localStorage.getItem("navbarCollapsed");

  // If the navbar was collapsed before, collapse it again
  if (isNavbarCollapsed === "true") {
    $(".navbar-collapse").collapse("show");
  }
});