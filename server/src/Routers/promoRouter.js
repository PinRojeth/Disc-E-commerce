const express = require("express");
const router = express.Router();

const CatchError = require("../Middlewares/CatchError");
const ErrorHandler = require("../Utils/ErrorHandler");
const Promotion = require("../Models/promotions");

router
  .route("/")
  .get(
    CatchError(async (req, res, next) => {
      const allPromotion = await Promotion.find();

      if (!allPromotion) {
        throw new ErrorHandler("Promotion Item is not exist", 404);
      }

      res.status(200).json({
        status: "success",
        data: allPromotion,
      });
    })
  )
  .post(
    CatchError(async (req, res, next) => {
      const { name, image, label, price, description, featured } = req.body;
      const promotion = new Promotion({
        name,
        image,
        label,
        price,
        description,
        featured,
      });

      const createPromo = await Promotion.create(promotion);

      res.status(201).json({
        status: "success",
        data: createPromo,
      });
    })
  );

router
  .route("/:promoId")
  .get(
    CatchError(async (req, res, next) => {
      const getPromoById = await Promotion.findById(req.params.promoId);

      if (!getPromoById) {
        throw new ErrorHandler("This promotion doesn't exist", 404);
      }

      res.status(200).json({
        status: "success",
        data: getPromoById,
      });
    })
  )
  .patch(
    CatchError(async (req, res, next) => {
      const updatePromo = await Promotion.findByIdAndUpdate(
        req.params.promoId,
        req.body,
        { new: true, runValidators: true }
      );

      if (!updatePromo) {
        throw new ErrorHandler("This promoId is not exist", 404);
      }

      res.status(200).json({
        status: "success",
        data: updatePromo,
      });
    })
  )
  .delete(
    CatchError(async (req, res, next) => {
      const deletePromo = await Promotion.findByIdAndDelete(req.params.promoId);

      if (!deletePromo) {
        throw new ErrorHandler("This promoId is not exist");
      }

      res.status(200).json({
        status: "success",
        data: "the promotion is delete successfully",
      });
    })
  );

module.exports = router;
