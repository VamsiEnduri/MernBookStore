import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// post the data to db
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishedYear) {
      return res.status(400).send({
        message: "pls send all req fileds:title,author,publishYear",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishedYear: req.body.publishedYear,
    };
    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// get all dtaa from db
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return setTimeout(() => {
      res.status(200).json({
        count: books.length,
        data: books,
      });
    }, 1000);
  } catch (err) {
    console.log(err.message);
    res.send({ message: res.message });
  }
});

// get data of single id

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// update a book based on id
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishedYear) {
      return res.status(400).send({
        message: "pls send all req fileds:title,author,publishYear",
      });
    }

    const { id } = req.params;
    const updateData = await Book.findByIdAndUpdate(id, req.body);
    if (!updateData) {
      return res.status(404).send("book not found");
    }
    return res.status(200).json({ message: "book updated sucessfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// delete a book based on id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const dleteData = await Book.findByIdAndDelete(id, req.body);

    if (!dleteData) {
      return res.status(404).send("book not found");
    }
    return res.send({ message: "book deleted successfully" });
  } catch (err) {
    console.log(err.message);
    res.send({ message: err.message });
  }
});

export default router;
