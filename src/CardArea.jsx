import React, { useState, useEffect, useMemo } from "react";
import Papa from 'papaparse';
import csvFile from './PalData.csv';
import Card from './Card';
import PalDetail from "./PalDetail";


const CardArea = () => {
    // rendering
    const [palData, setPalData] = useState([]);

    // filtering
    const [filter, setFilter] = useState("");
    const [filterAttribute, setFilterAttribute] = useState("Name");

    // sorting
    const [sortCriteria, setSortCriteria] = useState('nameAsc');

    // pal detail
    const [selectedPal, setSelectedPal] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);


    // sorting methods
    const sortByNameAsc = (a, b) => a.Name.localeCompare(b.Name);
    const sortByNameDesc = (a, b) => b.Name.localeCompare(a.Name);
    //const sortByType = (a, b) => a.Element.localeCompare(b.Name);

    // pal detail helpers
    const openDetail = (pal) => {
        console.log(pal);
        setSelectedPal(pal);
        setIsDetailOpen(true);
    };

    const closeDetail = () => {
        setIsDetailOpen(false);
        setSelectedPal(null);
    };


    // parse data
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
        // sorting selection
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

        // filter data
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

    // specifically not rendering boss versions of pals
    const renderCard = (pal) => {
        if (pal.Name.slice(0,5) === 'Alpha') {
            return false;
        }
        return true;
    }

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
                {sortedAndFilteredPalData.map((pal, index) => {
                    if(renderCard(pal)){
                        return (
                            <div key={index} onClick={() => openDetail(pal)}>
                                <Card pal={pal} />
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
            <PalDetail isOpen={isDetailOpen} onClose={closeDetail} pal={selectedPal} />
        </div>
    );
};

export default CardArea;
