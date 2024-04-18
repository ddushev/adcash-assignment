function simplifyPage() {
  // Remove all multimedia content and CSS styles
  document.querySelectorAll('img, video, iframe, svg, style, link[rel="stylesheet"]').forEach(element => {
    element.remove();
  });

  // Retrieve all elements from the page
  const allElements = Array.from(document.body.children);

  // Create a container for the simplified view
  const container = document.createElement('div');

  // Loop through each element to extract textual content and wrap in a div
  allElements.forEach(element => {
    // Skip script and no text elements
    if (element.tagName.toLowerCase() === 'script' || element.innerText.length === 0) {
      return;
    }
    // Skip iframe/img elements as strings
    if (element.innerText.includes('<iframe') || element.innerText.includes('<img')) {
      return;
    }
    // Create a div for the textual content
    const div = document.createElement('div');
    div.style.width = '100%';
    div.style.textAlign = 'center';
    div.innerText = element.innerText;

    // Append the banner after each div
    const banner = document.createElement('div');
    banner.style.width = '728px';
    banner.style.height = '90px';
    banner.style.backgroundImage = 'url(https://media.istockphoto.com/id/1447176711/photo/expanding-global-connection-lines-at-night-global-business-financial-network-flight-routes.jpg?s=1024x1024&w=is&k=20&c=LswXxClaxMnk0IwxMJQHgIVbQ9eCpuPBtsc8H1Kak1I=)';
    banner.style.backgroundSize = 'cover'
    banner.style.margin = '10px auto';

    // Append the div and banner to the container
    container.appendChild(div);
    container.appendChild(banner);

  });

  // Clear the body and append the container
  document.body.innerHTML = '';
  document.body.appendChild(container);
}

// Call the function to simplify the page
simplifyPage();
