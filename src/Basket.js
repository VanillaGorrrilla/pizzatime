import React, { useState } from 'react';
import './Basket.css';

const Basket = ({ basketItems, removeFromBasket }) => {
    const [basketVisibility, setBasketVisibility] = useState(false);

    const toggleBasketVisibility = () => {
        setBasketVisibility(prevVisibility => !prevVisibility);
    };

    const calculateTotalPrice = () => {
        return basketItems.reduce((total, item) => total + item.price, 0).toFixed(2);
    };

    return (
        <div className="BasketContainer">
            <div className="BasketHeader">
                <div className="BasketLogo">
                    <img src={require('./images/basketlogo.png')} alt="Basket Logo" />
                </div>
                <h2 onClick={toggleBasketVisibility} style={{ cursor: 'pointer' }}>
                    Shopping Basket ({basketItems.length} items) - Total: £{calculateTotalPrice()}
                </h2>
            </div>
            {basketVisibility && (
                <div className="BasketItems">
                    <ul>
                        {basketItems.map((item, index) => (
                            <li key={index}>
                                {item.name} - Size: {item.size}, Base: {item.base} - £{item.price}
                                <button className="DeleteButton" onClick={() => removeFromBasket(index)}>
                                    &#10006;
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Basket;
