const hamburger_btn = document.querySelector(".hamburger-btn");
const main_links = document.querySelector(".main-links");
hamburger_btn.addEventListener("click", () =>
  main_links.classList.toggle("active")
);

const form = document.querySelector(".url-shortner form");
const url_container = document.querySelector(".url-shortner .links");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = form.querySelector("input");
  fetch(`https://api.shrtco.de/v2/shorten?url=${input.value}`)
    .then((res) => res.json())
    .then((data) => {
      if (input.value == "" || data.error_code) {
        console.log("not good");
        form.classList.add("invalid");
        return;
      }
      form.classList.remove("invalid");
      renderLink(data.result);
      input.value = "";
    });

  function renderLink(data) {
    const article = document.createElement("article");
    article.classList.add("link-data");
    article.innerHTML = `
    <p class="original-link">
    ${data.original_link}
    </p>
    <div>
      <p class="shorten-link">
      ${data.short_link}
      </p>
      <button class="primary-btn copy-btn">Copy</button>
    </div>
    `;
    url_container.appendChild(article);
  }
});

url_container.addEventListener("click", (e) => {
  const clickedEl = e.target;
  if (!clickedEl.classList.contains("copy-btn")) return;
  clickedEl.innerText = "Copied!";
  setTimeout(() => (clickedEl.innerText = "Copy"), 3000);
  const link = clickedEl.previousElementSibling.innerText;
  navigator.clipboard.writeText(link);
});
