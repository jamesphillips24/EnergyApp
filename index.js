const apikey = "BhSATJdE6rhjzw5wH3RtWRi50byK44vcnlKrP5iz";
const select = document.getElementById("select");
let data = null;

getData().then(info => {
    data = info;
});

async function getData(){

    try{
        const response = await fetch(`https://api.eia.gov/v2/co2-emissions/co2-emissions-aggregates/data/?api_key=${apikey}&frequency=annual&data[0]=value&facets[sectorId][]=TT&start=2021&offset=0&length=5000&sort[0][column]=stateId&sort[0][direction]=asc`);
        
        if(!response.ok)
            throw new Error("Not valid API fetch");

        const data = await response.json();
        return data.response.data;
    }
    catch(error){
        console.error(error);
    }
}

async function getEnergyData(id) {
    deleteP();
    data.forEach(entry => {
        if(entry.stateId == id)
            addP(entry);
    });
}

function addP(item){
    const p = document.createElement("p");
    p.className = "listitem"
    p.textContent = `The total carbon emissions in ${item["state-name"]} due to ${item["fuel-name"]}: ${item.value} ${item["value-units"]}`;
    document.body.append(p);
}

function deleteP(){
    const temp = document.getElementsByClassName("listitem");
    while(temp[0]){
        temp[0].parentNode.removeChild(temp[0]);
    }
}

const svgImage = document.getElementById("Layer_1");
const states = svgImage.querySelectorAll(".state");
const labels = svgImage.getElementById("labels").querySelectorAll("g");

labels.forEach(label => {
    paths = label.querySelectorAll("path");

    paths.forEach(p => {
        p.style="stroke-width: 0.970631; fill:black; pointer-events:none"
    })
})

states.forEach(state => {
    state.style="stroke-width:0.97063118000000004;fill:#c4d3f4"

    state.addEventListener('mouseover', () => {
        state.style="stroke-width:0.97063118000000004;fill:#acc1ef";
    });
    state.addEventListener('mouseout', () => {
        state.style="stroke-width:0.97063118000000004;fill:#c4d3f4";
    });
    state.addEventListener('click', () => {
        getEnergyData(state.id.toUpperCase());
    });
});

