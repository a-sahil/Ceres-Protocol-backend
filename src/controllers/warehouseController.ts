import { Request, Response } from 'express';
import Warehouse from '../models/Warehouse';

export const registerWarehouse = async (req: Request, res: Response) => {
  try {
    const { warehouseName, ownerName, capacity, location, description } = req.body;

    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      return res.status(400).json({ message: 'At least one image is required.' });
    }

    // Map uploaded files to their paths
    const images = (req.files as Express.Multer.File[]).map(file => file.path);

    const newWarehouse = new Warehouse({
      warehouseName,
      ownerName,
      capacity,
      location,
      description,
      images,
    });

    const savedWarehouse = await newWarehouse.save();

    res.status(201).json(savedWarehouse);
  } catch (error) {
    if (error instanceof Error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    } else {
        res.status(500).json({ message: 'An unknown server error occurred' });
    }
  }
};