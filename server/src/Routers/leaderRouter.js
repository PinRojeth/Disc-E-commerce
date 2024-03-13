const express = require("express");
const router = express.Router();

const CatchError = require("../Middlewares/CatchError");
const ErrorHandler = require("../Utils/ErrorHandler");
const Leader = require("../Models/leaders");

router
  .route("/")
  .get(
    CatchError(async (req, res, next) => {
      const allLeader = await Leader.find();

      if (!allLeader) {
        throw new ErrorHandler("leaders is not found", 404);
      }

      res.status(200).json({
        status: "success",
        data: allLeader,
      });
    })
  )
  .post(
    CatchError(async (req, res, next) => {
      const { name, image, designation, abbr, description, featured } =
        req.body;

      const leader = new Leader({
        name,
        image,
        designation,
        abbr,
        description,
        featured,
      });

      const createLeader = await Leader.create(leader);

      res.status(201).json({
        status: "success",
        data: createLeader,
      });
    })
  );

router
  .route("/:leaderId")
  .get(
    CatchError(async (req, res, next) => {
      const getLeaderById = await Leader.findById(req.params.leaderId);

      if (!getLeaderById) {
        throw new ErrorHandler("This leaderId is not exist", 404);
      }

      res.status(200).json({
        status: "success",
        data: getLeaderById,
      });
    })
  )
  .patch(
    CatchError(async (req, res, next) => {
      const updateLeader = await Leader.findByIdAndUpdate(
        req.params.leaderId,
        req.body,
        { new: true, runValidators: true }
      );

      if (!updateLeader) {
        throw new ErrorHandler("This leaderId is not exist", 404);
      }

      res.status(200).json({
        status: "success",
        data: updateLeader,
      });
    })
  )
  .delete(
    CatchError(async (req, res, next) => {
      const deleteLeader = await Leader.findByIdAndDelete(req.params.leaderId);

      if (!deleteLeader) {
        throw new ErrorHandler("This leaderId is not exist", 404);
      }

      res.status(200).json({
        status: "success",
        data: "leader data is delete successfully",
      });
    })
  );

module.exports = router;
