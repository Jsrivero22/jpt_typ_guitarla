import { useEffect, useState } from 'react';
import Footer from './components/Footer';
import GuitarCard from './components/GuitarCard';
import Header from './components/Header';
import { db } from './data/db';

function App() {

    const initialCart = JSON.parse(localStorage.getItem('cart')) || [];

    const [ guitars ] = useState(db);
    const [ cart, setCart ] = useState(initialCart);

    const MAX_ITEMS = 5;
    const MIN_ITEMS = 1;

    useEffect(() => localStorage.setItem('cart', JSON.stringify(cart)), [cart])

    const addToCart = item => {

        const itemExists = cart.findIndex(guitar => guitar.id === item.id);

        if (itemExists >= 0) { // Si el item ya existe en el carrito

            if (cart[itemExists].quantity >= MAX_ITEMS) return;

            const updatedCart = [ ...cart ];
            updatedCart[itemExists].quantity += 1;
            setCart( updatedCart );
        } else {
            setCart([ ...cart, { ...item, quantity: 1 } ]);
        }
    }

    const removeFromCart = id => {
        // const guitarsUpdated = cart.filter(guitar => guitar.id !== id);
        // setCart( guitarsUpdated );

        setCart( prevCart => prevCart.filter( guitar => guitar.id !== id ) );
    }

    const increaseQuantity = id => {
        // const updatedCart = cart.map( item => {
        //     if (item.id === id && item.quantity < MAX_ITEMS) {
        //         return {
        //             ...item,
        //             quantity: item.quantity++
        //         }
        //     }
        //         return item;
        // })
        // setCart( updatedCart );

        setCart( prevCart => prevCart.map( item => item.id === id && item.quantity < MAX_ITEMS ? { ...item, quantity: item.quantity++ } : item));
    }

    const decreaseQuantity = id => {

        // const updatedCart = cart.map( item => {
        //     if (item.id === id && item.quantity > MIN_ITEMS) {
        //         return {
        //             ...item,
        //             quantity: item.quantity--
        //         }
        //     }
        //         return item;
        // });
        // setCart( updatedCart );

        setCart( prevCart => prevCart.map( item => item.id === id && item.quantity > MIN_ITEMS ? { ...item, quantity: item.quantity-- } : item));

    }

    const emptyCart = () => setCart([]);

    return (

        <>
            <Header
                cart                ={ cart }
                removeFromCart      ={ removeFromCart }
                increaseQuantity    ={ increaseQuantity }
                decreaseQuantity    ={ decreaseQuantity }
                emptyCart           ={ emptyCart }
            />

            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>

                <div className="row mt-5">
                    { guitars.map( guitar => (
                        <GuitarCard
                            key         ={ guitar.id }
                            guitar      ={ guitar }
                            setCart     ={ setCart }
                            addToCart   ={ addToCart }
                        />
                    ))}
                </div>
            </main>

            <Footer />
        </>

    )
}

export default App
