const express = require("express");
const mongoose = require("mongoose")
const {MONGO_URI} = require("./config")
const Posts = require("./models/posts")


const app = express();


app.use(express.json())



mongoose.connect(MONGO_URI,
    { useNewUrlParser: true,
        useUnifiedTopology: true,
    })
.then(()=> console.log('MongoDB connected'))
.catch(err => console.log(err))


app.get('/', async(req, res) =>{
    try {
        const posts = await Posts.find()
        if(!posts) throw new Error('No items')
        res.status(200).json(posts)
    } catch(err){
        res.status(400).json({message : err})
    }
})

app.post('/', async (req, res) =>{
    const newPost = new Posts(req.body)
    try {
            const post = await newPost.save()
            if(!post) throw Error('Something went wrong')
            res.status(200).json(post)
   
        
    } catch(err){
        res.status(400).json({message : err})
    }
})


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});