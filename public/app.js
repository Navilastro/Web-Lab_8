async function testRoute(url) {
  const output = document.getElementById("output");
  try {
    const response = await fetch(url);
    const text = await response.text();
    let displayContent = `Status: ${response.status}\n\n`;
    try {
      const json = JSON.parse(text);
      displayContent += JSON.stringify(json, null, 2);
    } catch {
      displayContent += text;
    }
    output.textContent = displayContent;
  } catch (error) {
    output.textContent = `Error: ${error.message}`;
  }
}

async function testRoutePost(url) {
  const output = document.getElementById("output");
  try {
    const response = await fetch(url, { method: "POST" });
    const text = await response.text();
    let displayContent = `Status: ${response.status}\n\n`;
    try {
      const json = JSON.parse(text);
      displayContent += JSON.stringify(json, null, 2);
    } catch {
      displayContent += text;
    }
    output.textContent = displayContent;
  } catch (error) {
    output.textContent = `Error: ${error.message}`;
  }
}