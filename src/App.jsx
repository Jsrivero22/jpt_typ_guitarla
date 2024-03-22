import Footer from './components/Footer';
import GuitarCard from './components/GuitarCard';
import Header from './components/Header';
import useCart from './hooks/useCart';

function App() {

    const {
        cart,
        guitars,
        addToCart,
        decreaseQuantity,
        emptyCart,
        increaseQuantity,
        removeFromCart,
        cartTotal,
        isEmpty
    } = useCart();

    return (

        <>
            <Header
                cart                ={ cart }
                removeFromCart      ={ removeFromCart }
                increaseQuantity    ={ increaseQuantity }
                decreaseQuantity    ={ decreaseQuantity }
                emptyCart           ={ emptyCart }
                cartTotal           ={ cartTotal }
                isEmpty             ={ isEmpty }
            />

            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>

                <div className="row mt-5">
                    { guitars.map( guitar => (
                        <GuitarCard
                            key         ={ guitar.id }
                            guitar      ={ guitar }
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
