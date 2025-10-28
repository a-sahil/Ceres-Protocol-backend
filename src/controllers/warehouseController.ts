import { Request, Response } from 'express';
import Warehouse from '../models/Warehouse';

export const registerWarehouse = async (req: Request, res: Response) => {
  try {
    const { warehouseName, ownerName, capacity, location, description,price  } = req.body;

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
      price,
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

// ADD THIS NEW FUNCTION:
export const getWarehouses = async (req: Request, res: Response) => {
  try {
    // Fetch all warehouses, sorted by newest first
    const warehouses = await Warehouse.find({}).sort({ createdAt: -1 });
    res.json(warehouses);
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching warehouses' });
  }
};

// ADD THIS NEW FUNCTION
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