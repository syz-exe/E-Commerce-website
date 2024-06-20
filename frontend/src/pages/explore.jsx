import { ItemCard } from "../components/itemcard";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navbar } from "../components/navbar";

export function Explore() {
    // const [products, setProducts] = useState([]);
    // const [filter, setFilter] = useState("");

    const pro = {
        _id: "66138175b4850580421ac27e",
        name: "Nike Court Vision Low Next Nature",
        img: "court_vision_low_next_nature_shoes.png",
        price: "20000",
        Category: "Shoes"
    }

    // useEffect(() => {
    //     axios.get("http://localhost:3000/brandname/explore/")
    //         .then(response => {
    //             setProducts(response.data.products);
    //         })
    // }, [])

    return (
        <>
            <Navbar></Navbar>
            <div className="p-4  grid grid-cols-2 gap-4 lg:grid-cols-5 sm:grid-cols-3">
                {/* {products.map(product => (
                    <ItemCard product={product} />
                    )
                    )}; */}
                <ItemCard product={pro} />
                <ItemCard product={pro} />
                <ItemCard product={pro} />
                <ItemCard product={pro} />
                <ItemCard product={pro} />
                <ItemCard product={pro} />
                <ItemCard product={pro} />
            
            </div>
        </>
    )
}