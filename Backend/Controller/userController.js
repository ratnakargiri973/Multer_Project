import File from "../Model/userModel.js";

export const uploadFiles = async (req, res) => {
  console.log(req.file);

  if (!req.file) {
    return res.status(500).send("No File is uploaded");
  }

  const newFile = new File({
    filename: req.file.filename,
    originalName: req.file.originalname, // Correct field name
  });

  try {
    await newFile.save();
    res.status(200).json({
      message: 'File uploaded and saved to MongoDB successfully',
      filename: req.file.filename,
    });
  } catch (error) {
    res.status(500).send('Error saving file to MongoDB');
  }
};
