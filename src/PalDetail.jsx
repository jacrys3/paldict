import React from 'react';

const PalDetail = ({ isOpen, onClose, pal }) => {
    if (!isOpen) return null;
    console.log(pal);

    return (
        <div className="detailOverlay" onClick={onClose}>
            <div className="detailContent" onClick={e => e.stopPropagation()}>
                <h2>{pal.Name}</h2>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default PalDetail;