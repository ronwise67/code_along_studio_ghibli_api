import { useState, useEffect } from 'react'
import "./ApiForm.css" 

const ApiForm = (props) => {
    const [choice, setChoice] = useState("")
    const [data, setData] = useState([])

    const API_URL = "https://ghibliapi.herokuapp.com/"
    useEffect(()=>{
        if (choice){
            let endpoint = choice === "species" ? "species" : "locations"
            fetch(API_URL + endpoint)
                .then(res => res.json())
                .then(json => setData(json))
        }
    }, [choice])


    const [options, setOptions] = useState([])
    useEffect(()=>{
        let arrayData
        if (choice === "terrain"){
            let filteredData = data.filter(l => l.terrain != "TODO")
            let terrainNames = filteredData.map(l => l.terrain)
            let uniqTerrains = new Set(terrainNames)
            arrayData = Array.from(uniqTerrains)

        } else {
            arrayData = data.map(s => s.name)
        }
        setOptions(arrayData)
    }, [data])

    return (
        <form>
            <label htmlFor="query">Pick an Api Query:</label>
            <select onChange={(e) => { setChoice(e.target.value) }} name="query" id="query">
                <option value="" selected disabled hidden></option>
                <option value="species">Species</option>
                <option value="terrain">Terrain</option>
            </select>
            <br />
            {choice == "terrain"
                ? <div>
                    <label htmlFor="terrain">Terrain:</label>
                    <select name="terrain" id="terrain">
                        <option value="" selected disabled hidden></option>
                        {options?.map((o) => {
                            return (
                                <option value={o}>{o}</option>
                            )
                        })}
                    </select>
                </div>
                : <div>
                    <label htmlFor="species">Species:</label>
                    <select name="species" id="species">
                        <option value="" selected disabled hidden></option>
                        {options?.map((o) => {
                            return (
                                <option onChange={o}>{o}</option>
                            )
                        })}
                    </select>
                </div>
            }
        </form>
    );
}

export default ApiForm;