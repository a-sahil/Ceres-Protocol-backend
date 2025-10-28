import { Request, Response } from 'express';
import Warehouse from '../models/Warehouse';

// --- UPDATE registerWarehouse ---
export const registerWarehouse = async (req: Request, res: Response) => {
  try {
    // Add walletAddress to the destructured body
    const { warehouseName, ownerName, capacity, location, description, price, walletAddress } = req.body;

    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      return res.status(400).json({ message: 'At least one image is required.' });
    }

    const images = (req.files as Express.Multer.File[]).map(file => file.path);

    const newWarehouse = new Warehouse({
      warehouseName,
      ownerName,
      capacity,
      location,
      description,
      price,
      images,
      walletAddress, // Save the wallet address
      isBooked: false, // Default to not booked
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

// --- ADD THIS ENTIRE NEW FUNCTION ---
// @desc    Mark a warehouse as booked
// @route   PUT /api/warehouses/:id/book
export const bookWarehouse = async (req: Request, res: Response) => {
  try {
    const warehouse = await Warehouse.findById(req.params.id);

    if (warehouse) {
      if (warehouse.isBooked) {
        return res.status(400).json({ message: 'Warehouse is already booked' });
      }

      warehouse.isBooked = true;
      const updatedWarehouse = await warehouse.save();
      res.json(updatedWarehouse);
    } else {
      res.status(404).json({ message: 'Warehouse not found' });
    }
  } catch (error) {
     res.status(500).json({ message: 'Server Error' });
  }
};

// ... keep getWarehouses and getWarehouseById as they are
export const getWarehouses = async (req: Request, res: Response) => {
  try {
    const warehouses = await Warehouse.find({}).sort({ createdAt: -1 });
    res.json(warehouses);
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching warehouses' });
  }
};

export const getWarehouseById = async (req: Request, res: Response) => {
  try {
    const warehouse = await Warehouse.findById(req.params.id);

    if (warehouse) {
      res.json(warehouse);
    } else {
      res.status(404).json({ message: 'Warehouse not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};