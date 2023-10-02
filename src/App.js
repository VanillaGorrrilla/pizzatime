import React, { useState } from 'react';
import PizzaOptions from './PizzaOptions';
import SidesOptions from './SidesOptions';
import BeverageOptions from './BeverageOptions';
import Basket from './Basket';
import './App.css';

const App = () => {
    const [basketItems, setBasketItems] = useState([]);

    const addToBasket = (item) => {
        setBasketItems([...basketItems, item]);
    };

    const removeFromBasket = (index) => {
        const updatedBasket = basketItems.filter((_, i) => i !== index);
        setBasketItems(updatedBasket);
    };

    return (
        <div className="App">
            <div className="LogoAndTitle">
                <div className="Logo">
                    <img src={require('./images/logo.png')} alt="Pizza Time Logo" />
                </div>
                <h1>Pizza Time</h1>
            </div>
            <div className="ContentWrapper">
                <div className="OptionsContainer">
                    <PizzaOptions addToBasket={addToBasket} />
                    <SidesOptions addToBasket={addToBasket} />
                    <BeverageOptions addToBasket={addToBasket} />
                </div>
                <Basket basketItems={basketItems} removeFromBasket={removeFromBasket} />
            </div>
        </div>
    );
};

export default App;
