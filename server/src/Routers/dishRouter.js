const express = require("express");
const router = express.Router();

const CatchError = require("../Middlewares/CatchError");
const ErrorHandler = require("../Utils/ErrorHandler");
const Dishes = require("../Models/dishes");

router
  .route("/")
  .get(
    CatchError(async (req, res, next) => {
      const allDishes = await Dishes.find();

      if (!allDishes) {
        throw new ErrorHandler("Disc is not exist", "404");
      }

      res.status(200).json({
        status: "success",
        data: allDishes,
      });
    })
  )
  .post(
    CatchError(async (req, res, next) => {
      const { name, image, description, price, category, feature, label } =
        req.body;
      console.log(req.body);

      const disc = new Dishes({
        name,
        image,
        description,
        price,
        category,
        feature,
        label,
        comments: [],
      });
      console.log(req.body.comments.message);
      const createDisc = await Dishes.create(disc);

      res.status(201).json({
        status: "success",
        data: createDisc,
      });
    })
  );

router
  .route("/:dishId")
  .get(
    CatchError(async (req, res, next) => {
      const getOneDisc = await Dishes.findById(req.params.dishId);

      if (!getOneDisc) {
        throw new ErrorHandler("This ID is not exist", "404");
      }

      res.status(200).json({
        status: "success",
        data: getOneDisc,
      });
    })
  )
  .patch(
    CatchError(async (req, res, next) => {
      const updateDisc = await Dishes.findByIdAndUpdate(
        req.params.dishId,
        req.body,
        { new: true, runValidators: true }
      );

      console.log(updateDisc);
      if (!updateDisc) {
        throw new ErrorHandler("This ID is not exist", "404");
      }

      res.status(200).json({
        status: "success",
        data: updateDisc,
      });
    })
  )
  .delete(
    CatchError(async (req, res, next) => {
      const deleteDisc = await Dishes.findByIdAndDelete(req.params.dishId);

      if (!deleteDisc) {
        throw new ErrorHandler("This ID is not exist", "404");
      }

      res.status(200).json({
        status: "success",
        message: "Data has been deleted",
      });
    })
  );

module.exports = router;
