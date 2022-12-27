import firebaseApp from '../helpers/firebase/index.js';
import Admins from '../models/Admins.js';

const getAllAdmins = async (req, res) => {
  const queriesArray = Object.keys(req.query);
  try {
    const admins = await Admins.find(req.query);
    if (!admins) {
      throw {
        message: 'Admin not found.', status: 404,
      };
    }
    if (queriesArray.length === 0) {
      return res.status(200).json({
        message: 'Admins found.',
        data: admins,
      });
    }
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
    });
  }
};

const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const admins = await Admins.findById(id);
    if (!admins) {
      throw {
        message: 'Admin not found.', status: 404,
      };
    }
    return res.status(200).json({
      message: 'Admin found.',
      data: admins,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
    });
  }
};

const createAdmin = async (req, res) => {
  try {

    const newFirebaseUser = await firebaseApp.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });

    await firebaseApp.auth().setCustomUserClaims(newFirebaseUser.uid, { role: 'ADMIN' });

    const admin = new Admins({
      email: req.body.email,
      password: req.body.password,
      firebaseUid: newFirebaseUser.uid,
    });

    const result = await admin.save();
    if (!result) {
      throw {
        message: 'Could not create a new admin.', status: 400,
      };
    }
    return res.status(201).json({
      message: 'New admin successfully created.',
      data: result,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
    });
  }
};

const editAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Admins.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: true },
    );
    await firebaseApp.auth().updateUser(result.firebaseUid, {
      email: req.body.email,
      password: req.body.password,
    });
    if (!result) {
      throw {
        message: 'Admin not found.', status: 404,
      };
    }
    return res.status(200).json({
      message: `Admin with the ID ${req.params.id} has been updated.`,
      data: result,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
    });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admins.findById(req.params.id);
    await firebaseApp.auth().deleteUser(admin.firebaseUid);
    const result = await Admins.findByIdAndDelete(req.params.id);
    if (!result) {
      throw {
        message: 'Admin not found.', status: 404,
      };
    }
    return res.status(204).json({
      message: `Admin with the ID ${req.params.id} has been deleted.`,
      data: result,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
    });
  }
};

export default {
  createAdmin,
  getAllAdmins,
  getAdminById,
  editAdmin,
  deleteAdmin,
};