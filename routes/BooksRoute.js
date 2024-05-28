
import express from "express";
import { Book } from '../models/bookmodel.js';



const router = express.Router();


router.post('/create',async (req,res)=>{
    try{
      if(
        !req.body.title || 
        !req.body.author || 
        !req.body.publishYear ) 
      {
        return res.status(400).send({
          message: 'Send all required fields: title, author, publishYear',
        });
      }
      const newBook = {
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear, 
      };

      const book = await Book.create(newBook);

      return res.status(201).send(book);
    } catch(err){
      console.log(err.message);
      res.status(500).send({ message : err.message });
    }
});

router.get('/tasks', async (req,res) => {
  try{
    const books = await Book.find({});

    return res.send(books)
  }
  catch(err) {
      console.log(err.message);
      res.status(500).send({message: err.message});
    }
});


router.get('/:id', async (req,res) => {
  try{

    const { id } = req.params;

    const books = await Book.findById(id);

    return res.status(200).json(books);
  }catch(err) {
      console.log(err.message);
      res.status(500).send({message: err.message});
    }
});

router.put('/edit/:id', async (req,res)=>{
  try{
    if(
      !req.body.title || 
        !req.body.author || 
        !req.body.publishYear ) 
        {
          return res.status(400).send({
            message: 'Send all required fields: title, author, publishYear',
          });
        }

      const { id } = req.params;

      const result = await Book.findByIdAndUpdate(id, req.body);

      if(!result){
        return res.status(404).json({message: 'Book not found'});
      }

      return res.status(200).send({ message: 'Book updated sucessfully'});

  } catch(err){
    console.log(err.message)
    res.status(500).send({message: error.message});
  }
})

router.delete('/:id', async (req,res)=>{
  try{

     const { id } = req.params;

     const result = await Book.findByIdAndDelete(id);

      if(!result)
      {
          return res.status(404).json({message: 'Book not found '});
      }
      return res.status(200).send({message: 'Book deleted successfully'}); 

  }catch(err){
    console.log(err.message);
    res.status(500).send({message: err.message});
  }
})


export default router;