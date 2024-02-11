import React, { useState, useEffect, useMemo } from "react";
import Papa from 'papaparse';
import csvFile from './PalData.csv';
import Card from './Card';


const CardArea = () => {
    const [palData, setPalData] = useState([]);
    const [filter, setFilter] = useState("");
    const [filterAttribute, setFilterAttribute] = useState("Name");
    const [sortCriteria, setSortCriteria] = useState('nameAsc');

    const sortByNameAsc = (a, b) => a.Name.localeCompare(b.Name);
    const sortByNameDesc = (a, b) => b.Name.localeCompare(a.Name);
    //const sortByType = (a, b) => a.Element.localeCompare(b.Name);


    useEffect(() => {
        Papa.parse(csvFile, {
            download: true,
            header: true,
            complete: function(results) {
                setPalData(results.data);
            }
        });
    }, []);


    const sortedAndFilteredPalData = useMemo(() => {
        let sortedData = [...palData];
        switch (sortCriteria) {
            case 'nameAsc':
                sortedData.sort(sortByNameAsc);
                break;
            case 'nameDesc':
                sortedData.sort(sortByNameDesc);
                break;
            default:
                break;
        }

        return sortedData.filter(pal => {
            if (filterAttribute === "Type") {
                const type1Match = pal.ElementType1 ? pal.ElementType1.toString().slice(17).toLowerCase().includes(filter.toLowerCase()) : false;
                const type2Match = pal.ElementType2 ? pal.ElementType2.toString().slice(17).toLowerCase().includes(filter.toLowerCase()) : false;
                return type1Match || type2Match;
            }
            
            const attributeValue = pal[filterAttribute] ? pal[filterAttribute].toString() : '';
            return attributeValue.toLowerCase().includes(filter.toLowerCase());
        });

    }, [palData, filterAttribute, filter, sortCriteria]);


    return (
        <div className="container">
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
            <select value={sortCriteria} onChange={(e) => setSortCriteria(e.target.value)}>
                <option value="nameAsc">Name a-z</option>
                <option value="nameDesc">Name z-a</option>
            </select>
            <div className="cardArea">
                {sortedAndFilteredPalData.map((pal, index) => (
                    <Card key={index} pal={pal} />
                ))}
            </div>
        </div>
    );
};

export default CardArea;
