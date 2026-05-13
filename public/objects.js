const addBtn = document.querySelector(".add-btn");
const popup = document.getElementById("formPopup");
const closeBtn = document.getElementById("closeBtn");
const form = document.getElementById("objectForm");

const category = addBtn.dataset.category;

// deschidere popup
addBtn.onclick = () => popup.style.display = "flex";

// inchidere popup
closeBtn.onclick = () => popup.style.display = "none";

const galaxies =
    (addBtn.dataset.galaxies || "")
    .split(",");

const galaxySelect =
    document.getElementById("galaxie");

galaxies.forEach(g => {

    const option =
        document.createElement("option");

    option.value = g;

    if(g === "milky")
        option.textContent =
            "Calea Lactee";

    if(g === "m31")
        option.textContent =
            "Messier 31";

    if(g === "m33")
        option.textContent =
            "Messier 33";

    galaxySelect.appendChild(option);
});

// creare element in pagina
function render(obj) {

    const section =
        document.getElementById(obj.galaxie);

    if(!section) return;

    const article =
        document.createElement("article");

    article.className = "object";

    article.innerHTML = `

        <a>
            <img
            src="${obj.imagine}"
            alt="${obj.nume}">
        </a>

        <div class="info">

            <h3>${obj.nume}</h3>

            <p>
                ${obj.descriere}
            </p>

        </div>
    `;

    section.appendChild(article);
}
// incarcare din server
async function load() {

    const res = await fetch(`/obiecte/${category}`);

    const data = await res.json();

    data.forEach(render);
}

// salvare obiect nou
form.onsubmit = async (e) => {

    e.preventDefault();

    const obj = {
        nume: document.getElementById("nume").value,
        descriere: document.getElementById("descriere").value,
        imagine: document.getElementById("imagine").value,
        galaxie: document.getElementById("galaxie").value,
        categorie: category
    };

    await fetch("/obiecte", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj)
    });

    render(obj);

    popup.style.display = "none";
    form.reset();
};

load();