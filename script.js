// ---------- Data ----------
const festivals = [
  { name: "Diwali", region: "North", state: "Pan-India", month: "Oct–Nov", color: "#f2a900",
    info: "The festival of lights marks the victory of light over darkness.", extra: "Homes glow with diyas, rangoli and sweets are shared with neighbours." },
  { name: "Holi", region: "North", state: "Uttar Pradesh", month: "March", color: "#c9275f",
    info: "The festival of colours welcomes spring and celebrates love.", extra: "Mathura and Vrindavan hold the most famous Lathmar and flower Holi events." },
  { name: "Durga Puja", region: "East", state: "West Bengal", month: "Sep–Oct", color: "#b3123f",
    info: "Five days honouring Goddess Durga with grand pandals and art.", extra: "Kolkata's pandals are themed installations visited by millions." },
  { name: "Pongal", region: "South", state: "Tamil Nadu", month: "January", color: "#0e7c86",
    info: "A four-day harvest festival thanking the Sun, earth and cattle.", extra: "Families cook fresh rice and milk until it boils over, a sign of plenty." },
  { name: "Onam", region: "South", state: "Kerala", month: "Aug–Sep", color: "#2f855a",
    info: "Welcomes the legendary King Mahabali with flower carpets and boat races.", extra: "The Onam Sadya is a feast of 20+ dishes served on a banana leaf." },
  { name: "Ganesh Chaturthi", region: "West", state: "Maharashtra", month: "Aug–Sep", color: "#e07b00",
    info: "Celebrates the birth of Lord Ganesha with clay idols and processions.", extra: "Mumbai's Lalbaugcha Raja draws devotees from across the country." },
  { name: "Navratri and Garba", region: "West", state: "Gujarat", month: "Sep–Oct", color: "#7b2cbf",
    info: "Nine nights of devotion, music and the circular Garba and Dandiya dances.", extra: "Colourful chaniya choli and mirror-work outfits are part of the tradition." },
  { name: "Bihu", region: "East", state: "Assam", month: "April", color: "#3a7d44",
    info: "The Assamese new year and spring festival with folk dance and song.", extra: "Young people perform the energetic Bihu dance in traditional muga silk." },
  { name: "Lohri", region: "North", state: "Punjab", month: "January", color: "#d1495b",
    info: "A winter bonfire festival marking the harvest of sugarcane.", extra: "People sing folk songs and offer popcorn and sesame sweets to the fire." }
];

const heritage = {
  art: [["Bharatanatyam", "Classical dance from Tamil Nadu known for precise footwork and expressions."], ["Kathak", "Storytelling dance from North India with fast spins and rhythm."], ["Madhubani", "Folk painting from Bihar using natural dyes and bold patterns."]],
  food: [["Regional thalis", "Each state serves a different mix of breads, rice, lentils and sweets."], ["Street food", "Chaat, vada pav and dosa show how food changes city by city."], ["Festive sweets", "Laddoo, modak and payasam are made for specific festivals."]],
  craft: [["Banarasi silk", "Hand-woven sarees with gold thread from Varanasi."], ["Blue pottery", "Glazed ceramics from Jaipur in cobalt blue."], ["Pashmina", "Fine wool shawls from Kashmir woven by hand."]],
  arch: [["Taj Mahal", "A white marble tomb in Agra built in the 17th century."], ["Hampi", "Ruins of the Vijayanagara empire in Karnataka."], ["Konark Sun Temple", "A 13th-century temple in Odisha shaped like a chariot."]]
};

const states = {
  "Rajasthan": "Known for Pushkar Camel Fair, Teej and folk music with the Kalbelia dance. Forts and desert festivals show royal heritage.",
  "Kerala": "Home to Onam, Thrissur Pooram and the Kathakali dance drama. Snake boat races fill the backwaters in monsoon.",
  "West Bengal": "Durga Puja is the biggest event, along with Poila Boishakh, the Bengali new year, and the Rath Yatra.",
  "Punjab": "Baisakhi, Lohri and Gurpurab are celebrated with Bhangra, community kitchens (langar) and fairs.",
  "Gujarat": "Navratri brings nine nights of Garba. Uttarayan fills the sky with kites every January.",
  "Tamil Nadu": "Pongal, Karthigai Deepam and temple festivals with Bharatanatyam and Carnatic music.",
  "Assam": "Bihu is celebrated three times a year. Majuli's Raas festival is a living Vaishnav tradition.",
  "Maharashtra": "Ganesh Chaturthi, Gudi Padwa and the Pandharpur Wari pilgrimage define the year."
};

// ---------- Helpers ----------
const $ = (id) => document.getElementById(id);

// ---------- Mobile menu ----------
$("menuBtn").addEventListener("click", () => {
  const open = $("nav").classList.toggle("open");
  $("menuBtn").setAttribute("aria-expanded", open);
});
$("nav").addEventListener("click", () => $("nav").classList.remove("open"));

// ---------- Festival cards, filter and search ----------
let activeRegion = "All";

function renderFestivals() {
  const q = $("search").value.trim().toLowerCase();
  const list = festivals.filter(f =>
    (activeRegion === "All" || f.region === activeRegion) &&
    (f.name + " " + f.state).toLowerCase().includes(q));

  $("festivalGrid").innerHTML = list.map((f, i) => `
    <article class="card">
      <div class="card-top" style="background:${f.color}">${f.name}</div>
      <div class="card-body">
        <span class="meta">${f.state} · ${f.month}</span>
        <p>${f.info}</p>
        <p class="extra" hidden>${f.extra}</p>
        <button class="more" aria-expanded="false">Read more</button>
      </div>
    </article>`).join("");
  $("emptyMsg").hidden = list.length > 0;
}

$("festivalGrid").addEventListener("click", (e) => {
  if (!e.target.classList.contains("more")) return;
  const extra = e.target.parentElement.querySelector(".extra");
  extra.hidden = !extra.hidden;
  e.target.textContent = extra.hidden ? "Read more" : "Show less";
  e.target.setAttribute("aria-expanded", !extra.hidden);
});

$("filters").addEventListener("click", (e) => {
  if (!e.target.dataset.region) return;
  document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
  e.target.classList.add("active");
  activeRegion = e.target.dataset.region;
  renderFestivals();
});
$("search").addEventListener("input", renderFestivals);

// ---------- Heritage tabs ----------
function showTab(key) {
  $("tabPanel").innerHTML = heritage[key].map(([t, d]) => `<div><h3>${t}</h3><p>${d}</p></div>`).join("");
  document.querySelectorAll(".tab").forEach(b => b.classList.toggle("active", b.dataset.tab === key));
}
$("tabs").addEventListener("click", (e) => { if (e.target.dataset.tab) showTab(e.target.dataset.tab); });

// ---------- Regional celebrations ----------
Object.keys(states).forEach(s => $("regionSelect").add(new Option(s, s)));
$("regionSelect").addEventListener("change", (e) => {
  const s = e.target.value;
  $("regionCard").innerHTML = s ? `<h3>${s}</h3><p>${states[s]}</p>` : "Pick a state to see how it celebrates.";
});

// ---------- Form ----------
festivals.forEach(f => $("festival").add(new Option(f.name, f.name)));
$("festival").insertBefore(new Option("Select a festival", ""), $("festival").firstChild);
$("festival").value = "";

$("story").addEventListener("input", () => { $("count").textContent = $("story").value.length + " / 300"; });

function setError(id, msg) {
  $(id + "Err").textContent = msg;
  const field = $(id);
  if (field) field.classList.toggle("invalid", !!msg);
  return !msg;
}

$("storyForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = $("name").value.trim();
  const email = $("email").value.trim();
  const story = $("story").value.trim();

  const results = [
    setError("name", name.length < 3 ? "Enter your full name (at least 3 letters)." : ""),
    setError("email", /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ? "" : "Enter a valid email like name@example.com."),
    setError("festival", $("festival").value ? "" : "Choose a festival."),
    setError("story", story.length < 20 ? "Write at least 20 characters about your experience." : ""),
    setError("agree", $("agree").checked ? "" : "Tick the box to continue.")
  ];
  if (results.includes(false)) return;

  const how = document.querySelector('input[name="how"]:checked').value;
  $("success").hidden = false;
  $("success").textContent = `Thank you, ${name}! Your ${$("festival").value} story (${how.toLowerCase()}) has been received.`;
  e.target.reset();
  $("count").textContent = "0 / 300";
  $("success").scrollIntoView({ behavior: "smooth", block: "center" });
});

// ---------- Init ----------
renderFestivals();
showTab("art");
