import { useState, useEffect } from 'react'
import "./ApiForm.css" 

const ApiForm = () => {
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
        let arrayData;
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

    const titleCase = (s) => {
        let first = s[0].toUpperCase()
        let remaining = s.slice(1)
        return first + remaining
    }

    const [typeSelector, setTypeSelector] = useState("") 
    const [displayData, setDisplayData] = useState([])
    useEffect(() => {

        let results;
        if (choice == "species"){
            results = data.filter(s => s.name == typeSelector)

        } else {
            results = data.filter(l => l.terrain == typeSelector)
        }
        // Handle Species Data  
        console.log(results)
        setDisplayData(results)
        // Handle Terrain Data

    }, [typeSelector])

    return (
        <>
        <form>
            <label htmlFor="query">Pick an Api Query:</label>
            <select onChange={(e) => { setChoice(e.target.value) }} name="query" id="query">
                <option value="" selected disabled hidden></option>
                <option value="species">Species</option>
                <option value="terrain">Terrain</option>
            </select>
            <br />
            {choice && 
                <div>
                    <label htmlFor={choice}>{titleCase(choice)}:</label>
                    <select onChange={(e) => setTypeSelector(e.target.value)} name={choice} id={choice}>
                        <option value="" selected disabled hidden></option>
                        {options?.map((o) => {
                            return (
                                <option key={o} value={o}>{o}</option>
                            )
                        })}
                    </select>
                </div>
            }
        </form>
        <ul>
            {displayData?.map((elm) => {
                return (
                    <li>{elm.name}</li>
                )
            })}
        </ul>
        </>
    );
}

export default ApiForm;