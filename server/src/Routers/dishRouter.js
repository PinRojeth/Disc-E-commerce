const express = require("express");
const router = express.Router();

const CatchError = require("../Middlewares/CatchError");
const ErrorHandler = require("../Utils/ErrorHandler");
const Dishes = require("../Models/dishes");
const authentication = require("../Middlewares/authenticate");
router
  .route("/")
  .get(
    authentication.verifyOrdinaryUser,
    CatchError(async (req, res, next) => {
      const allDishes = await Dishes.find();

      if (!allDishes) {
        throw new ErrorHandler("Disc is not exist", 404);
      }

      res.status(200).json({
        status: "success",
        data: { Dishes: allDishes },
      });
    })
  )
  .post(
    authentication.verifyOrdinaryUser,
    authentication.verifyAdmin,
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
    authentication.verifyOrdinaryUser,
    CatchError(async (req, res, next) => {
      const getOneDisc = await Dishes.findById(req.params.dishId);

      if (!getOneDisc) {
        throw new ErrorHandler("This ID is not exist", 404);
      }

      res.status(200).json({
        status: "success",
        data: { Disc: getOneDisc },
      });
    })
  )
  .patch(
    authentication.verifyOrdinaryUser,
    authentication.verifyAdmin,
    CatchError(async (req, res, next) => {
      const updateDisc = await Dishes.findByIdAndUpdate(
        req.params.dishId,
        req.body,
        { new: true, runValidators: true }
      );

      console.log(updateDisc);
      if (!updateDisc) {
        throw new ErrorHandler("This ID is not exist", 404);
      }

      res.status(200).json({
        status: "success",
        data: updateDisc,
      });
    })
  )
  .delete(
    authentication.verifyOrdinaryUser,
    authentication.verifyAdmin,
    CatchError(async (req, res, next) => {
      const deleteDisc = await Dishes.findByIdAndDelete(req.params.dishId);

      if (!deleteDisc) {
        throw new ErrorHandler("This ID is not exist", 404);
      }

      res.status(200).json({
        status: "success",
        message: "Data has been deleted",
      });
    })
  );

router
  .route("/:dishId/comments")
  .get(
    authentication.verifyOrdinaryUser,
    CatchError(async (req, res, next) => {
      const dish = await Dishes.findById(req.params.dishId);

      if (!dish) {
        throw new ErrorHandler("This dishId is not exist", 404);
      }

      const comments = dish.comments;

      res.status(200).json({
        status: "success",
        data: {
          comments,
        },
      });
    })
  )
  .post(
    authentication.verifyOrdinaryUser,
    CatchError(async (req, res, next) => {
      const { comment, rating } = req.body;
      const dish = await Dishes.findById(req.params.dishId);

      if (!dish) {
        throw new ErrorHandler("Invalid DishId", 404);
      }
      const newComment = {
        rating,
        comment,
        author: req.user.username,
      };

      dish.comments.push(newComment);

      await dish.save();

      res.status(201).json({
        status: "success",
        data: {
          newComment,
        },
      });
    })
  )

  // If admin wanted to clear all of the comments
  .delete(
    authentication.verifyOrdinaryUser,
    authentication.verifyAdmin,
    CatchError(async (req, res, next) => {
      const dish = await Dishes.findById(req.params.dishId);
      if (!dish) {
        throw new ErrorHandler("Invalid dishId", 404);
      }

      dish.comments = [];

      await dish.save();
      res.status(200).json({
        status: "success",
        message: "Comments deleted successfully",
      });
    })
  );

router
  .route("/:dishId/comments/:commentId")
  .get(
    authentication.verifyOrdinaryUser,
    CatchError(async (req, res, next) => {
      const dish = await Dishes.findById(req.params.dishId);

      if (!dish) {
        throw new ErrorHandler("Invalid DishId", 404);
      }

      // Find specific commentId
      const comment = dish.comments.id(req.params.commentId);

      if (!comment) {
        throw new ErrorHandler("The commendId is invalid", 404);
      }

      res.status(200).json({
        status: "success",
        data: {
          comment,
        },
      });
    })
  )
  .patch(
    authentication.verifyOrdinaryUser,
    authentication.verifyAdmin,
    CatchError(async (req, res, next) => {
      // must declare req.params.commentId outside
      const commentId = req.params.commentId;
      const updatedDish = await Dishes.findByIdAndUpdate(
        req.params.dishId,
        {
          $set: {
            "comments.$[commentId].rating": req.body.rating,
            "comments.$[commentId].comment": req.body.comment,
          },
        },
        { new: true, arrayFilters: [{ "commentId._id": commentId }] }
      );

      if (!updatedDish) {
        throw new ErrorHandler("Dish or comment not found", 404);
      }

      const updatedComment = updatedDish.comments.id(commentId);

      res.status(200).json({
        status: "success",
        data: {
          comment: updatedComment,
        },
      });
    })
  )
  .delete(
    authentication.verifyOrdinaryUser,
    authentication.verifyAdmin,
    CatchError(async (req, res, next) => {
      const dish = await Dishes.findById(req.params.dishId);
      const comment = dish.comments.id(req.params.commentId);

      if (!dish || !comment) {
        throw new ErrorHandler("Invalid DishId or CommentId", 404);
      }

      dish.comments.remove(comment);
      await dish.save();

      res.status(200).json({
        status: "success",
        message: `This commentId:${comment._id} has been deleted`,
      });
    })
  );

module.exports = router;
