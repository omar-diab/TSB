const icons = [
  { class: "fa-solid fa-phone" },
  { class: "fa-solid fa-envelope" },
  { class: "fa-brands fa-facebook-messenger" },
  { class: "fa-brands fa-twitter" },
  { class: "fa-brands fa-instagram" },
];

const iconsContainer = document.getElementById("contact-icons");

icons.forEach((iconClass) => {
  const icon = document.createElement("i");
  icon.className = `${iconClass.class} hover:text-[var(--primary-color)] cursor-pointer`;
  iconsContainer.appendChild(icon);
});

const fields = [
  {
    id: "name",
    label: "Name",
    type: "text",
    placeholder: "Your Name",
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "you@example.com",
  },
  {
    id: "message",
    label: "Message",
    type: "textarea",
    placeholder: "Your Message",
    rows: 5,
  },
];

const formContainer = document.getElementById("contact-form");

fields.forEach((field) => {
  const container = document.createElement("div");
  container.className = "mb-4";

  const label = document.createElement("label");
  label.className =
    "block font-bold text-lg mb-2 text-[var(--heading-color)] dark:text-[var(--heading-color)]";
  label.textContent = field.label;

  let input;
  if (field.type === "textarea") {
    input = document.createElement("textarea");
    input.rows = field.rows;
  } else {
    input = document.createElement("input");
    input.type = field.type;
  }

  input.placeholder = field.placeholder;
  input.required = true;
  input.className =
    "w-full p-4 rounded-lg focus:outline-none resize-none dark:bg-[var(--background-2-light-color)] text-[var(--p-color)] dark:text-[var(--p-color)]";

  container.appendChild(label);
  container.appendChild(input);
  formContainer.appendChild(container);
});

const btn = document.createElement("button");
btn.type = "submit";
btn.textContent = "Send Message";
btn.className = "btn";
formContainer.appendChild(btn);
