
let searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit", onSubmit);

let buttonsDiv = document.getElementById("buttonsDiv");
buttonsDiv.addEventListener("click", onClick);

let buttonsArray = localStorage.getItem("buttons");

if(buttonsArray != null)
{
    buttonsArray = buttonsArray.split(",");
}
else
{
    buttonsArray = [];
}

reloadButtons();

function onSubmit(event)
{
    let searchTerm = document.getElementById("gifText").value;
    buttonsArray.push(searchTerm);
    localStorage.setItem("buttons", buttonsArray);
    gifSearch(searchTerm);
    addButton(searchTerm);

    event.preventDefault();
}

function onClick(event)
{
    if(event.target.matches("button") == true)
    {
        gifSearch(event.target.textContent);
    }
}

async function gifSearch(name)
{
    let request = await fetch(`https://api.giphy.com/v1/gifs/search?q=${name}&key=BynLYG2YwQIWMT9a6l53N2ux2y276EJ7&limit=12`);
    let requestJson = await request.json();

    displayGifs(requestJson);
}

function displayGifs(jsonResult)
{
    let gifsDiv = document.getElementById("gifsDiv");
    gifsDiv.innerHTML = "";

    for(i = 0; i < 3;i++)
    {
        let row = document.createElement("div");
        row.className = "row";

        for(j = 0; j < 4; j++)
        {
            let image = document.createElement("img");
            image.src = jsonResult.data[i * 4 + j].images.original.url;
            image.alt = "Image not found";
            image.width = "200";
            image.className = "p-3";

            let imageDiv = document.createElement("div");
            imageDiv.className = "col";
            imageDiv.appendChild(image);

            row.appendChild(imageDiv);
        }

        gifsDiv.appendChild(row);
    }
}

function addButton(name)
{
    let newButton = document.createElement("button");
    newButton.type = "button";
    newButton.textContent = name;
    newButton.className = "btn btn-secondary";
    buttonsDiv.appendChild(newButton);
}

function reloadButtons()
{
    if(localStorage.getItem("buttons") != null)
    {
        let oldButtons = localStorage.getItem("buttons").split(",");

        for(i = 0; i < oldButtons.length; i++)
        {
            addButton(oldButtons[i]);
        }
    }
}

