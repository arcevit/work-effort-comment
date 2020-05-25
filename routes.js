const express = require('express');
const router = express.Router();
let {connectDB}=require('./connect-db')

router.get('/:work_effort_id/comments', async (req, res) => {
  let { work_effort_id } = req.params;
  let db = await connectDB();
  let comments = await db
    .collection(`comments`)
    .find({ work_effort_id: +work_effort_id })
    .toArray();
  if (comments.length === 0) return res.status(404).send('no work effort found');
  res.status(200).json(comments);
});

router.post('/:work_effort_id/comments/new', async (req, res) => {
  let comment = req.body;
  let { work_effort_id } = req.params;
  comment.work_effort_id = +work_effort_id;
  let db = await connectDB();
  if (!db) return res.status(500).send('error occured');
  let collection = db.collection(`comments`);
  await collection.insertOne(comment);
  res.status(200).send('comment added successfully');
});

router.delete('/:work_effort_id/comments/:id', async (req, res) => {
  const { work_effort_id, id } = req.params;
  let db = await connectDB();
  if (!db) return res.status(500).send('error occured');
  let comment = await db
    .collection(`comments`)
    .deleteOne({ id: +id, work_effort_id: +work_effort_id });
  if (comment.deletedCount === 0) return res.status(500).send('comment not deleted');
  res.status(200).send('comment removed successfully');
});

module.exports = router;
