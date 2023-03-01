import React, {useState} from 'react'
import { fetchGeoData } from './API';
import { ResultTable } from './display';

export function Search(props){
    const [searchInput, setSearchInput] = useState("");
    const [geoData, setGeoData] = useState({});
    const [showData, setShowData] = useState(false);
    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
        fetchGeoData(searchInput)
            .then((data) => setGeoData(data.results))
    };
    const handleBlur = (e) => {
        setShowData(false);
    }
    const handleClick = (e) => {
        setShowData(true);
    }

    const handleMouseDown = (item) => {
        props.addCity(item);
        setSearchInput("");
        setGeoData({});
    }

    return(
        <div onBlur={handleBlur} className="search">
            <input type="text" placeholder="Search here" onClick={handleClick} onChange={handleChange} value={searchInput}/>
            {tableItems(geoData, showData, handleMouseDown)}
        </div>
    )
}

function tableItems(geoData, showData, handleMouseDown){
    if(!showData || !geoData || JSON.stringify(geoData) === '{}') return;

    return(
        <ResultTable>
            <tbody>
                {geoData.map((item) => {
                    const name = item.admin1 ? `${item.name}, ${item.admin1}, ${item.country_code}`: `${item.name}, ${item.country_code}`
                    return(
                        <tr onMouseDown={() => handleMouseDown(item)}>
                            <th>{name}</th>
                        </tr>
                    );
                })}
            </tbody>
        </ResultTable>
    )
}