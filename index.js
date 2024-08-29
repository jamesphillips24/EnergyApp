const apikey = "BhSATJdE6rhjzw5wH3RtWRi50byK44vcnlKrP5iz";
const select = document.getElementById("select");

async function getEnergyData() {
    deleteP();

    try{
        const response = await fetch(`https://api.eia.gov/v2/co2-emissions/co2-emissions-aggregates/data/?api_key=${apikey}&frequency=annual&data[0]=value&facets[stateId][]=${select.value}&facets[sectorId][]=TT&start=2021&offset=0&length=5000&sort[0][column]=fuelId&sort[0][direction]=asc`)
        if(!response.ok){
            throw new Error("Invalid search");
        }
        
        const data = await response.json();
        data.response.data.forEach(addP);
    }
    catch(error){
        console.error(error);
    }
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