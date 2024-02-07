import React, { useState, useEffect } from "react";
import Papa from 'papaparse';
import csvFile from './PalData.csv';
import Card from './Card';


const CardArea = () => {
    const [palData, setCards] = useState([]);
    const [filter, setFilter] = useState("");
    const [filterAttribute, setFilterAttribute] = useState("Name");

    useEffect(() => {
        Papa.parse(csvFile, {
            download: true,
            header: true,
            complete: function(results) {
                setCards(results.data);
            }
        });
    }, []);


    const filteredPalData = palData.filter(pal => {
        if (filterAttribute === "Type") {
            const type1Match = pal.ElementType1 ? pal.ElementType1.toString().toLowerCase().includes(filter.toLowerCase()) : false;
            const type2Match = pal.ElementType2 ? pal.ElementType2.toString().toLowerCase().includes(filter.toLowerCase()) : false;
            return type1Match || type2Match;
        }
        
        const attributeValue = pal[filterAttribute] ? pal[filterAttribute].toString() : '';
        return attributeValue.toLowerCase().includes(filter.toLowerCase());
    });


    return (
        <div className="container">
            <img src="/paldict_logo.png" className="logo"/>
            <select value={filterAttribute} onChange={(e) => setFilterAttribute(e.target.value)}>
                <option value="Name">Name</option>
                <option value="Type">Type</option>
            </select>
            <input 
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Filter pals..."
            />
            <div className="cardArea">
                {filteredPalData.map((pal, index) => (
                    <Card key={index} pal={pal} />
                ))}
            </div>
        </div>
    );
};

export default CardArea;
