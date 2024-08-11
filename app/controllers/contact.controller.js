const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const ContactService = require("../services/contact.service");

// Create and Save a new Contact
exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, "Name can not be empty!"));
    }

    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.create(req.body);
        return res.send(document);
    } catch (error) {
        console.log(error);
        next(new ApiError(500, "An error occurred while creating the contact!"));
    }
};

// Find all contacts
exports.findAll = async (req, res, next) => {
    let document = [];
    try {
        const contactService = new ContactService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            document = await contactService.findByName(name);
            // http://localhost:3000/api/contacts?name=Anh
        } else {
            document = await contactService.find({});
           // http://localhost:3000/api/contacts
        }

    } catch (error){
        return next(
            new ApiError(500, "An error occurred while retrieving contacts!")
        );
    }
    return res.send(document);
};

exports.findOne = (req, res) => {
    res.send({ message: "FindOne handler" });
};
exports.update = (req, res) => {
    res.send({ message: "Update handler" });
};

exports.delete = (req, res) => {
    res.send({ message: "Delete handler" });
}

exports.deleteAll = (req, res) => {
    res.send({message: "DeleteAll handler"});
};

exports.findAllFavorite = (req, res) => {
    res.send({message: "FindAllFavorite handler"});
};