import userModel from "../models/userModel.js";


// add products to user cart
const addToCart = async (req, res) => {
    try{
        const { userId, itemId, size } = req.body;
        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;
            }
            else{
                cartData[itemId][size] = 1;
            }
        }
        else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        await userModel.findByIdAndUpdate(userId, {cartData})
        res.json({success: true, message: "Product added to cart successfully"});
    }
    catch(error){
        console.log(error)
        res.json({success: false, message: error.message});
    }
}


// update user cart
const updateCart = async (req, res) => {
    try{
        const { userId, itemId, size, quantity } = req.body
        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        cartData[itemId][size] = quantity
        await userModel.findByIdAndUpdate(userId, {cartData})
        res.json({success: true, message: "Cart updated successfully"});
    }
    catch(error){
        console.log(error)
        res.json({success: false, message: error.message});
    }
}

// get user cart
const getUserCart = async (req, res) => {
    try{
        const { userId } = req.body;
        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;
        res.json({success: true, message: cartData});
    }
    catch(error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// merge a guest cart into the authenticated user's saved cart
const syncCart = async (req, res) => {
    try {
        const { userId, cartData = {} } = req.body
        const userData = await userModel.findById(userId)

        if (!userData) {
            return res.json({success: false, message: 'User not found'})
        }

        const mergedCart = JSON.parse(JSON.stringify(userData.cartData || {}))

        for (const itemId in cartData) {
            if (!mergedCart[itemId]) mergedCart[itemId] = {}

            for (const size in cartData[itemId]) {
                const quantity = Math.max(0, Math.floor(Number(cartData[itemId][size]) || 0))
                if (quantity > 0) {
                    mergedCart[itemId][size] = (Number(mergedCart[itemId][size]) || 0) + quantity
                }
            }
        }

        await userModel.findByIdAndUpdate(userId, {cartData: mergedCart})
        res.json({success: true, cartData: mergedCart})
    }
    catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

export { addToCart, updateCart, getUserCart, syncCart }
