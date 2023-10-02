import React, { useState } from 'react';
import sidesOptions from './sidesOptions.json';

const SidesOptions = ({ addToBasket }) => {
    const [sideVisibility, setSideVisibility] = useState({});
    const [selectedSizes, setSelectedSizes] = useState({});

    const handleSizeChange = (sideId, event) => {
        setSelectedSizes(prevSizes => ({ ...prevSizes, [sideId]: event.target.value }));
    };

    const handleAddToBasket = (side) => {
        const selectedSize = selectedSizes[side.id];

        if (selectedSize) {
            const selectedSide = {
                ...side,
                size: selectedSize,
                price: side.prices[side.sizes.indexOf(selectedSize)]
            };
            addToBasket(selectedSide);
            setSelectedSizes(prevSizes => ({ ...prevSizes, [side.id]: '' }));
        }
    };

    const getSidePrice = (side) => {
        const selectedSize = selectedSizes[side.id];

        if (selectedSize) {
            const price = side.prices[side.sizes.indexOf(selectedSize)];
            return price ? `£${price.toFixed(2)}` : 'Price not available';
        }
        return 'N/A';
    };

    const toggleSideVisibility = (sideId) => {
        setSideVisibility(prevVisibility => ({
            ...prevVisibility,
            [sideId]: !prevVisibility[sideId]
        }));
    };

    return (
        <div className="SidesOptionsContainer">
            <h2 onClick={() => toggleSideVisibility('all')} style={{cursor: 'pointer'}}>
                {sideVisibility['all'] ? 'Hide Sides Options' : 'Show Sides Options'}
            </h2>
            {sideVisibility['all'] && (
                <ul>
                    {sidesOptions.map((side) => (
                        <li key={side.id}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img src={require(`./images/${side.image}`)} alt={side.name} width="50" height="50" />
                                <h3 onClick={() => toggleSideVisibility(side.id)} style={{cursor: 'pointer'}}>
                                    {side.name} - {getSidePrice(side)}
                                </h3>
                            </div>
                            {sideVisibility[side.id] && (
                                <div>
                                    <select
                                        value={selectedSizes[side.id] || ''}
                                        onChange={(event) => handleSizeChange(side.id, event)}
                                    >
                                        <option value="">Select Size</option>
                                        {side.sizes.map((size, index) => (
                                            <option key={index} value={size}>{size}</option>
                                        ))}
                                    </select>
                                    <button onClick={() => handleAddToBasket(side)}>Add to Basket</button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SidesOptions;
