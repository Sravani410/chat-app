const Message = require("../model/messageModel");

const addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;

    const data = await Message.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (data) {
      return res.status(201).json({
        msg: "Message added successfully",
      });
    } else {
      return res.status(404).json({
        msg: "Failed to add message to the database.",
      });
    }
  } catch (err) {
    next(err);
  }
};

const getMessage = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await Message.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updateAt: 1 });

    const projectedMessage = messages.map((el) => {
      return {
        fromSelf: el.sender.toString() === from,
        message: el.message.text,
      };
    });
    return res.status(200).json(projectedMessage);
  } catch (err) {
    next(err);
  }
};

module.exports = { addMessage, getMessage };
