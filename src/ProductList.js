import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Grid, Rating, Typography, useMediaQuery, useTheme } from '@mui/material'
import axios from 'axios'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const ProductList = () => {
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));
    const [products, setProducts] = useState()
    const [cartproducts, setCartproducts] = useState([])
    const [showCartItems, setshowCartItems] = useState(false)
    const fetchData = async () => {
        try {
            const response = await axios.get("https://dummyjson.com/products")
            setProducts(response?.data?.products)

            console.log("products", products);
        } catch (error) {
            console.log(error);
        }
    }
    const addProductToCart = (item) => {
        setCartproducts(prevCartProducts => [...prevCartProducts, item]);
        setshowCartItems(true)
    }

    const DELIVERY_CHARGE = 50;

    // Calculate the total price including delivery charges
    const totalPrice = cartproducts.reduce((total, item) => {
        return total + item.price + DELIVERY_CHARGE;
    }, 0);

    const handleRazorpay = () => {
        const Razor = new window.Razorpay({
            key: "rzp_test_7y0z68ppfzy0AI",
            amount: totalPrice * 100,
            currency: "INR",
            description: cartproducts.title,
            order_id: "",
            prefill: {
                contact: 9021337035
            },
            image: "",
            handler: response => {

            }
        })
        Razor.open()
    }

    useEffect(() => {
        fetchData()
    }, [])




    return (
        <>
            <Grid sx={{
                display: "flex", margin: "20px 25px", justifyContent: !showCartItems ? "end" : "space-between",
            }}>
                {showCartItems && <Typography onClick={() => setshowCartItems(false)}
                    disabled={showCartItems == false}
                    sx={{
                        color: "gray",
                        fontSize: "18px",
                        cursor: "pointer"
                    }}>Back</Typography>}
                <Grid sx={{ display: "flex", cursor: "pointer" }}>
                    <AddShoppingCartIcon />
                    <Typography onClick={() => setshowCartItems(true)} sx={{
                        fontSize: "18px"
                    }}>cart</Typography>
                </Grid>

            </Grid>
            {!showCartItems ? <>
                <Grid sx={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }} >
                    {products?.map((item, index) =>
                        <Card sx={{ borderRadius: "4px", width: "345px" }} style={{ border: "1px solid rgba(14,4,5,0.2)" }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={item.thumbnail}
                                    alt="image"
                                    sx={{
                                        margin: "5px",
                                    }}
                                />
                                <Rating
                                    sx={{
                                        marginX: "5px",
                                        fontSize: "14px"
                                    }}
                                    name="simple-controlled"
                                    value={item.rating}
                                    precision={0.5}
                                    readOnly
                                />
                                <CardContent sx={{
                                    borderLeft: "5px solid #ffce32"
                                }}>
                                    <Typography sx={{
                                        fontWeight: 700,
                                        fontSize: "20px",
                                        overflow: "hidden",
                                        whiteSpace: "nowrap",
                                        textOverflow: "ellipsis",
                                        color: "#002f34"
                                    }}>
                                        {item.brand}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontSize: "14px",
                                            overflow: "hidden",
                                            whiteSpace: "nowrap",
                                            textOverflow: "ellipsis",
                                            color: "#002f34",
                                            margin: "2px 0px 0px"
                                        }}
                                    >
                                        {item.title}
                                    </Typography>
                                    <Typography sx={{
                                        fontWeight: 700,
                                        fontSize: "20px",
                                        overflow: "hidden",
                                        whiteSpace: "nowrap",
                                        textOverflow: "ellipsis",
                                        color: "#002f34"
                                    }}>
                                        ₹{item.price}
                                    </Typography>
                                    <Typography sx={{
                                        fontWeight: 400,
                                        fontSize: "14px",
                                        overflow: "hidden",
                                        whiteSpace: "nowrap",
                                        textOverflow: "ellipsis",
                                        color: "#002F34A3",
                                        marginTop: "5px"
                                    }} >
                                        {item.description}
                                    </Typography>
                                    <Grid sx={{ marginTop: "10px", display: "flex", justifyContent: "space-between" }}>
                                        <Box sx={{ backgroundColor: "#ffce32", width: "100px", color: "white", fontSize: "16px", textAlign: "center", borderRadius: "3px", fontWeight: 600, padding: "5px 5px" }}
                                            onClick={() => addProductToCart(item)}
                                        >
                                            Add to cart
                                        </Box>
                                        <Box sx={{ backgroundColor: "#ffce32", width: "100px", color: "white", fontSize: "16px", textAlign: "center", borderRadius: "3px", fontWeight: 600, padding: "5px 5px" }}
                                            onClick={() => addProductToCart(item)}
                                        >
                                            Buy Now
                                        </Box>
                                    </Grid>


                                </CardContent>
                            </CardActionArea>
                        </Card>
                    )}
                </Grid>
            </>
                :
                cartproducts.length > 0 ? <Grid display={"flex"} justifyContent={"center"} flexDirection={"column"} alignItems={"center"}marginY={"25px"} >
                    {
                        cartproducts.map((item, index) => <Grid sx={{ display: "flex", justifyContent: "center" }}>
                            <Card sx={{ display: 'flex', width: isSm ? "300px" : "600px", marginTop: "20px", height: isSm ? "150px" : "250px", display: "flex", alignItems: "center" }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: isSm ? "100px" : "200px", height: isSm ? "100px" : "200px" }}
                                    image={item.thumbnail}
                                    alt="img"
                                />
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Typography sx={{
                                            fontWeight: 700,
                                            fontSize: "20px",
                                            overflow: "hidden",
                                            whiteSpace: "nowrap",
                                            textOverflow: "ellipsis",
                                            color: "#002f34"
                                        }}>
                                            {item.title}
                                        </Typography>
                                        <Typography sx={{
                                            fontSize: "14px",
                                            overflow: "hidden",
                                            whiteSpace: "nowrap",
                                            textOverflow: "ellipsis",
                                            color: "#002f34",
                                            margin: "2px 0px 0px"
                                        }}

                                        >
                                            {item.brand}
                                        </Typography>
                                        <Typography sx={{
                                            fontWeight: 700,
                                            fontSize: "20px",
                                            overflow: "hidden",
                                            whiteSpace: "nowrap",
                                            textOverflow: "ellipsis",
                                            color: "#002f34"
                                        }}>
                                            ₹{item.price}
                                        </Typography>
                                        <Typography sx={{
                                            fontWeight: 400,
                                            fontSize: "14px",
                                            color: "#002F34A3",
                                        }} >
                                            {item.description}
                                        </Typography>
                                    </CardContent>

                                </Box>

                            </Card>
                        </Grid>

                        )
                    }
                    <Card sx={{ width: isSm ? "300px" : "600px", marginY: "15px" }}>
                        <CardContent>

                            <Typography
                                sx={{
                                    fontWeight: 600,
                                    fontSize: "18px"
                                }}
                            >PRICE DETAILS</Typography>
                            {cartproducts.map((item) => <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography
                                    sx={{
                                        fontSize: "15px",
                                        color: "#212121"
                                    }}
                                >{item.title}</Typography>
                                <Typography
                                    sx={{
                                        fontSize: "15px",
                                        fontWeight: 600,
                                        color: "#212121"
                                    }}
                                >₹{item.price}</Typography>
                            </Grid>
                            )}
                            <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography sx={{
                                    fontSize: "15px",
                                    color: "#212121"
                                }}>Delivery Charges</Typography>
                                <Typography sx={{
                                    fontSize: "15px",
                                    fontWeight: 600,
                                    color: "#212121"
                                }}>₹50</Typography>
                            </Grid>
                            <hr />
                            <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>Total Amount</Typography>
                                <Typography sx={{
                                    fontSize: "18px",
                                    fontWeight: 600,
                                    color: "#212121"
                                }}>₹{totalPrice}</Typography>
                            </Grid>
                        </CardContent>
                    </Card>

                    <Button variant='contained' sx={{ width: isSm ? "100%" : "40%" }} onClick={handleRazorpay}>Place order</Button>
                </Grid>:
                <Grid sx={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", height:"80vh"}}>
                    <Typography sx={{fontSize:"20px",color: "#002f34",fontWeight:600 }}>Your cart is empty!</Typography>
                    <Typography sx={{fontSize:"14px",color: "#002f34", }}>Add items to it now.</Typography>
                    <Button sx={{marginTop:"10px"}} variant='contained' onClick={()=>setshowCartItems(false)}>Shop Now</Button>
                </Grid>
                }



        </>
    )
}

export default ProductList