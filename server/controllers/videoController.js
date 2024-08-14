const Video = require('../models/video');
const fs = require('fs');

const getVideos = async (req, res) => {
  try {
    const data = await Video.find()
    res.status(200).json({ data })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error?.message ?? 'Something went wrong' })
  }
};

const addVideo = async (req, res) => {
  try {
    const { title, subtitle, url, status } = req?.body

    const data = new Video({ title, subtitle, url, status })
    await data.save()
    res.status(201).json({ data, message: 'Video created successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error?.message ?? 'Something went wrong' })
  }
}

const getVideoById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Video.findById(id);
    if (!data) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error?.message ?? 'Something went wrong' })
  }
}

const updateVideo = async (req, res) => {
  const { _id, title, subtitle, url, status } = req.body;
  const image = req?.file?.filename;
  try {
    const data = await Video.findById(_id);
    if (!data) {
      return res.status(404).json({ message: 'Video not found' });
    }

    await Video.updateOne({ _id }, {
      $set: { title, subtitle, url, status }
    })
    res.status(200).json({ data, message: 'Video updated successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error?.message ?? 'Something went wrong' })
  }
};

const deleteVideo = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Video.findByIdAndDelete(id);
    if (!data) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.status(200).json({ message: 'Video deleted successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error?.message ?? 'Something went wrong' })
  }
};

module.exports = {
  getVideos,
  addVideo,
  getVideoById,
  updateVideo,
  deleteVideo
}