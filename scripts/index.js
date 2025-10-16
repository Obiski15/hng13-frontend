function updateTimestamp() {
  const timestampElement = document.getElementById("timestamp");
  if (timestampElement) {
    timestampElement.textContent = Date.now();
  }
}

updateTimestamp();

// Update timestamp every second
setInterval(updateTimestamp, 1000);
