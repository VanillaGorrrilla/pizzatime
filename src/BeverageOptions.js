import React, { useState } from 'react';
import beverageOptions from './beverageOptions.json';

const BeverageOptions = ({ addToBasket }) => {
    const [beverageVisibility, setBeverageVisibility] = useState({});
    const [selectedSizes, setSelectedSizes] = useState({});

    const handleSizeChange = (beverageId, event) => {
        setSelectedSizes(prevSizes => ({ ...prevSizes, [beverageId]: event.target.value }));
    };

    const handleAddToBasket = (beverage) => {
        const selectedSize = selectedSizes[beverage.id];

        if (selectedSize) {
            const selectedBeverage = {
                ...beverage,
                size: selectedSize,
                price: beverage.prices[beverage.sizes.indexOf(selectedSize)]
            };
            addToBasket(selectedBeverage);
            setSelectedSizes(prevSizes => ({ ...prevSizes, [beverage.id]: '' }));
        }
    };

    const getBeveragePrice = (beverage) => {
        const selectedSize = selectedSizes[beverage.id];

        if (selectedSize) {
            const price = beverage.prices[beverage.sizes.indexOf(selectedSize)];
            return price ? `£${price.toFixed(2)}` : 'Price not available';
        }
        return 'N/A';
    };

    const toggleBeverageVisibility = (beverageId) => {
        setBeverageVisibility(prevVisibility => ({
            ...prevVisibility,
            [beverageId]: !prevVisibility[beverageId]
        }));
    };

    return (
        <div className="BeverageOptionsContainer">
            <h2 onClick={() => toggleBeverageVisibility('all')} style={{cursor: 'pointer'}}>
                {beverageVisibility['all'] ? 'Hide Beverage Options' : 'Show Beverage Options'}
            </h2>
            {beverageVisibility['all'] && (
                <ul>
                    {beverageOptions.map((beverage) => (
                        <li key={beverage.id}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img src={require(`./images/${beverage.image}`)} alt={beverage.name} width="50" height="50" />
                                <h3 onClick={() => toggleBeverageVisibility(beverage.id)} style={{cursor: 'pointer'}}>
                                    {beverage.name} - {getBeveragePrice(beverage)}
                                </h3>
                            </div>
                            {beverageVisibility[beverage.id] && (
                                <div>
                                    <select
                                        value={selectedSizes[beverage.id] || ''}
                                        onChange={(event) => handleSizeChange(beverage.id, event)}
                                    >
                                        <option value="">Select Size</option>
                                        {beverage.sizes.map((size, index) => (
                                            <option key={index} value={size}>{size}</option>
                                        ))}
                                    </select>
                                    <button onClick={() => handleAddToBasket(beverage)}>Add to Basket</button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BeverageOptions;
