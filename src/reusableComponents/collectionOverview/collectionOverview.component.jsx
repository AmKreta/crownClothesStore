import React from 'react';

//importing reusable components
import ItemCard from '../itemcard/itemCard.component';

const CollectionOverview = ({ collection, addItemToCart }) => {

    return (
        collection?.map((item, index) => (
            <ItemCard {...item} index={index} key={index} addItemToCart={addItemToCart} />
        ))
    );
}

export default CollectionOverview;