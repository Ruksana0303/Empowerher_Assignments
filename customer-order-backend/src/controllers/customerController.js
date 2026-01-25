const supabase=require('../supabasesClient');
exports.registerCustomer=async(req, res)=>{
    const {full_name,email,phone}=req.body;

    if(!product_name||quantity||price||customerId){
        return res.status(400).json({error: "Missing fields"});
    }

    const{ error }=await supabase.from('orders').insert([{
        product_name,
        quantity,
        price,
        customer_id: customerId
    }]);

    if( error) return res.status(400).json({error:error.message});

    res.status(201).json({message: 'Order created'});
};