require('dotenv').config();
const express=require('express');
const cors=require('cors');

const customerRoutes=require('./routes/customerRoutes');
const orderRoutes=require('./routes/orderRoutes');

const app=express();
app.use(cors());
app.use(express.json());

app.use('./customers', customerRoutes);
app.use('./order', orderRoutes);

app.use((err,req,res,next)=>{
    res.status(500),json({error:err.message});
});

app.listen(process.env.PORT,()=>
console.log(`Server running on port ${process.env.PORT}`));