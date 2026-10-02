class Member {
  constructor(id, name, email, plan) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.plan = plan;
  }
}

class GymManager {
  constructor() {
    this.members = this.loadMembers();
  }

  loadMembers() {
    const savedMembers = localStorage.getItem("gym-members");
    if (savedMembers) {
      return JSON.parse(savedMembers).map((member) =>
        new Member(member.id, member.name, member.email, member.plan)
      );
    }
    return [
      new Member(101, "Khushal", "khushal@gmail.com", "Premium"),
      new Member(102, "Priya", "priya@gmail.com", "Standard")
    ];
  }

  addMember(name, email, plan) {
    const nextId = this.members.length
      ? Math.max(...this.members.map((member) => member.id)) + 1
      : 101;
    this.members.push(new Member(nextId, name, email, plan));
    this.save();
  }

  removeMember(id) {
    this.members = this.members.filter((member) => member.id !== id);
    this.save();
  }

  save() {
    localStorage.setItem("gym-members", JSON.stringify(this.members));
  }
}

const manager = new GymManager();
const rows = document.querySelector("#memberRows");
const form = document.querySelector("#memberForm");
const emptyState = document.querySelector("#emptyState");

function renderMembers() {
  rows.innerHTML = manager.members.map((member) => `
    <tr>
      <td>${member.id}</td>
      <td>${member.name}</td>
      <td>${member.email}</td>
      <td>${member.plan}</td>
      <td><button class="delete-button" data-id="${member.id}">Remove</button></td>
    </tr>
  `).join("");
  emptyState.hidden = manager.members.length > 0;
  document.querySelector("#memberCount").textContent = `${manager.members.length} member${manager.members.length === 1 ? "" : "s"}`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  manager.addMember(data.get("name"), data.get("email"), data.get("plan"));
  form.reset();
  renderMembers();
});

rows.addEventListener("click", (event) => {
  const button = event.target.closest("[data-id]");
  if (button && confirm("Remove this member?")) {
    manager.removeMember(Number(button.dataset.id));
    renderMembers();
  }
});

renderMembers();
