const form = document.getElementById("memberForm");
const table = document.getElementById("memberRows");
const emptyState = document.getElementById("emptyState");
const memberCount = document.getElementById("memberCount");

let members = JSON.parse(localStorage.getItem("gym-members")) || [
  { id: 101, name: "Khushal", email: "khushal@gmail.com", plan: "Premium" },
  { id: 102, name: "Priya", email: "priya@gmail.com", plan: "Standard" },
  { id: 103, name: "Priyanka", email: "priyanka@gmail.com", plan: "Regular" },
  { id: 104, name: "Priyal", email: "priyal@gmail.com", plan: "Premium" }
];

let memberId = members.length
  ? Math.max(...members.map((member) => member.id)) + 1
  : 101;

function saveMembers() {
  localStorage.setItem("gym-members", JSON.stringify(members));
}

function displayMembers() {
  table.innerHTML = "";

  members.forEach(function (member) {
    const row = document.createElement("tr");

    const idCell = document.createElement("td");
    idCell.textContent = member.id;

    const nameCell = document.createElement("td");
    nameCell.textContent = member.name;

    const emailCell = document.createElement("td");
    emailCell.textContent = member.email;

    const planCell = document.createElement("td");
    planCell.textContent = member.plan;

    const actionCell = document.createElement("td");
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.className = "delete-button";
    removeButton.addEventListener("click", function () {
      members = members.filter(function (currentMember) {
        return currentMember.id !== member.id;
      });
      saveMembers();
      displayMembers();
    });

    actionCell.appendChild(removeButton);
    row.append(idCell, nameCell, emailCell, planCell, actionCell);
    table.appendChild(row);
  });

  emptyState.hidden = members.length > 0;
  memberCount.textContent = members.length + " member" + (members.length === 1 ? "" : "s");
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const plan = document.getElementById("plan").value;

  if (!name || !email || !plan) {
    form.reportValidity();
    return;
  }

  if (!email.includes("@")) {
    document.getElementById("email").setCustomValidity("Please enter a valid email address.");
    form.reportValidity();
    document.getElementById("email").setCustomValidity("");
    return;
  }

  members.push({ id: memberId, name: name, email: email, plan: plan });
  memberId++;
  saveMembers();
  displayMembers();
  form.reset();
});

displayMembers();
