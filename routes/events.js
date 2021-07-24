const router = require("express").Router();

const Event = require('../models/Events');


router.post("/", async (req, res) => {
  const newevent = new Event(req.body);
  try {
    const savedevent = await newevent.save();
    res.status(200).json(savedevent);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Get events
// /events
router.get("/", async (req, res) => {
    try {
      const events = await Event.find();
      res.status(200).json(events);
    } catch (err) {
      res.status(500).json(err);
    }
  });



 // Get specific events
// /events/:id
router.get("/:id", async (req, res) => {
    try {
      const events = await Event.findById({_id : req.params.id})
      res.status(200).json(events);
    } catch (err) {
      res.status(500).json(err);
    }
  }); 


  
  //UPDATE events
  // events/:id
  router.put("/:id", async (req, res) => {
    try {
      const events = await Event.findById(req.params.id);
      if (events.email === req.body.email) {
        try {
          const updatedEvents = await Event.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedEvents);
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can update only your post!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //DELETE Event
  // event/:id

  router.delete("/:id", async (req, res) => {
    try {
      const events = await Event.findById(req.params.id);
      if (events.email === req.body.email) {
        try {
          await events.delete();
          res.status(200).json("Event has been deleted...");
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can delete only your event!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
 
  

module.exports = router;
