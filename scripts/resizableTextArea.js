const textArea = document.querySelector(".sticker-add-box");

textArea.style.height = `${textArea.scrollHeight}px`;

textArea.addEventListener("input", () => {
  textArea.style.height = "auto";
  textArea.style.height = `${textArea.scrollHeight}px`;
});
