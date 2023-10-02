import React, { useState } from 'react';
import pizzaOptions from './pizzaOptions.json';

const PizzaOptions = ({ addToBasket }) => {
    const [pizzaVisibility, setPizzaVisibility] = useState({});
    const [selectedSizes, setSelectedSizes] = useState({});
    const [selectedBases, setSelectedBases] = useState({});
    const [selectedHalf1, setSelectedHalf1] = useState({});
    const [selectedHalf2, setSelectedHalf2] = useState({});
    const [pizzaOptionsState, setPizzaOptions] = useState(pizzaOptions);

    const handleSizeChange = (pizzaId, event) => {
        setSelectedSizes(prevSizes => ({ ...prevSizes, [pizzaId]: event.target.value }));
    };

    const handleBaseChange = (pizzaId, event) => {
        setSelectedBases(prevBases => ({ ...prevBases, [pizzaId]: event.target.value }));
    };

    const handleHalf1Change = (pizzaId, event) => {
        setSelectedHalf1(prevHalf => ({ ...prevHalf, [pizzaId]: event.target.value }));
    };

    const handleHalf2Change = (pizzaId, event) => {
        setSelectedHalf2(prevHalf => ({ ...prevHalf, [pizzaId]: event.target.value }));
    };

    const handleAddToBasket = (pizza) => {
        const selectedSize = selectedSizes[pizza.id];
        const selectedBase = selectedBases[pizza.id];
        const selectedHalf1Option = selectedHalf1[pizza.id];
        const selectedHalf2Option = selectedHalf2[pizza.id];

        if (selectedSize && selectedBase) {
            const selectedPizza = {
                ...pizza,
                size: selectedSize,
                base: selectedBase,
                half1: selectedHalf1Option,
                half2: selectedHalf2Option,
                price: pizza.prices[pizza.sizes.indexOf(selectedSize)]
            };
            addToBasket(selectedPizza);
            setSelectedSizes(prevSizes => ({ ...prevSizes, [pizza.id]: '' }));
            setSelectedBases(prevBases => ({ ...prevBases, [pizza.id]: '' }));
            setSelectedHalf1(prevHalf => ({ ...prevHalf, [pizza.id]: '' }));
            setSelectedHalf2(prevHalf => ({ ...prevHalf, [pizza.id]: '' }));
        }
    };

    const getPizzaPrice = (pizza) => {
        const selectedSize = selectedSizes[pizza.id];
        const selectedBase = selectedBases[pizza.id];
        const selectedHalf1Option = selectedHalf1[pizza.id];
        const selectedHalf2Option = selectedHalf2[pizza.id];

        if (selectedSize && selectedBase) {
            const price = pizza.prices[pizza.sizes.indexOf(selectedSize)];
            return price ? `£${price.toFixed(2)}` : 'Price not available';
        }
        return 'N/A';
    };

    const togglePizzaVisibility = (pizzaId) => {
        setPizzaVisibility(prevVisibility => ({
            ...prevVisibility,
            [pizzaId]: !prevVisibility[pizzaId]
        }));
    };

    return (
        <div className="PizzaOptionsContainer">
            <h2 onClick={() => togglePizzaVisibility('all')} style={{cursor: 'pointer'}}>
                {pizzaVisibility['all'] ? 'Hide Pizza Options' : 'Show Pizza Options'}
            </h2>
            {pizzaVisibility['all'] && (
                <ul>
                    {pizzaOptionsState.map((pizza) => (
                        <li key={pizza.id}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img src={require(`./images/${pizza.image}`)} alt={pizza.name} width="50" height="50" />
                                <h3 onClick={() => togglePizzaVisibility(pizza.id)} style={{cursor: 'pointer'}}>
                                    {pizza.name} - {getPizzaPrice(pizza)}
                                </h3>
                            </div>
                            {pizzaVisibility[pizza.id] && (
                                <div>
                                    {pizza.name === '50/50' ? (
                                        <div>
                                            <select
                                                value={selectedSizes[pizza.id] || ''}
                                                onChange={(event) => handleSizeChange(pizza.id, event)}
                                            >
                                                <option value="">Select Size</option>
                                                {pizza.sizes.map((size, index) => (
                                                    <option key={index} value={size}>{size}</option>
                                                ))}
                                            </select>
                                            <select
                                                value={selectedBases[pizza.id] || ''}
                                                onChange={(event) => handleBaseChange(pizza.id, event)}
                                            >
                                                <option value="">Select Base</option>
                                                {pizza.bases.map((base, index) => (
                                                    <option key={index} value={base}>{base}</option>
                                                ))}
                                            </select>
                                            <h4>Select Halves:</h4>
                                            <select
                                                value={selectedHalf1[pizza.id] || ''}
                                                onChange={(event) => handleHalf1Change(pizza.id, event)}
                                            >
                                                <option value="">Select Half 1</option>
                                                {pizzaOptionsState.map((half) => (
                                                    half.id !== pizza.id && (
                                                        <option key={half.id} value={half.name}>{half.name}</option>
                                                    )
                                                ))}
                                            </select>
                                            <select
                                                value={selectedHalf2[pizza.id] || ''}
                                                onChange={(event) => handleHalf2Change(pizza.id, event)}
                                            >
                                                <option value="">Select Half 2</option>
                                                {pizzaOptionsState.map((half) => (
                                                    half.id !== pizza.id && (
                                                        <option key={half.id} value={half.name}>{half.name}</option>
                                                    )
                                                ))}
                                            </select>
                                        </div>
                                    ) : (
                                        <div>
                                            <select
                                                value={selectedSizes[pizza.id] || ''}
                                                onChange={(event) => handleSizeChange(pizza.id, event)}
                                            >
                                                <option value="">Select Size</option>
                                                {pizza.sizes.map((size, index) => (
                                                    <option key={index} value={size}>{size}</option>
                                                ))}
                                            </select>
                                            <select
                                                value={selectedBases[pizza.id] || ''}
                                                onChange={(event) => handleBaseChange(pizza.id, event)}
                                            >
                                                <option value="">Select Base</option>
                                                {pizza.bases.map((base, index) => (
                                                    <option key={index} value={base}>{base}</option>
                                                ))}
                                            </select>
                                        </div>
                                    )}
                                    <button onClick={() => handleAddToBasket(pizza)}>Add to Basket</button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PizzaOptions;
