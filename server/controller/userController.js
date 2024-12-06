// Use getUserModel() instead of directly accessing UserModel

const { getUserModel } = require('../postgres/postgres.js');

const getAllEmp = async (req, res) => {
    try {
        // Access the UserModel using the getUserModel function
        const UserModel = getUserModel();

        // Get all users from the database
        const users = await UserModel.findAll(); 

        if (!Array.isArray(users) || users.length === 0) {
            return res.status(200).json({ "error": "users not found" });
        }

        const userList = users.map(user => user.get({ plain: true }));
        return res.status(200).json(userList);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "error": "internal server error" });
    }
};

const addEmp = async (req, res) => {
    // Access the UserModel using the getUserModel function
    const UserModel = getUserModel(); // accessing the req table in the database
    const {name, email, designation} = req.body;
    const empId = req.user.id // taking data from user side via body in the form of object
    try{
        const emp = await UserModel.findOne({where: {empId: empId}});
        if(emp==null){
            await UserModel.create(req.body);
            return res.status(201).json({message: "employee added successfully"})
        }
        return res.status(200).json({message: "employe is already existing"})
    }
    catch(error){
        console.log(error);
        return res.status(500).json({ "error": "internal server error" });
    }
};

const updateEmp = async(req, res) =>{
    const UserModel = getUserModel(); // accessing the required table in the database
    let empId = req.params.empId; // empId which was passed in URL 
    const {name , email, designation}=req.body; 
    try{
        const emp = await UserModel.update( // parameters: 1.data to be added, 2.condition 
            {name,email,designation},
            {
                where:{
                    empId:empId,
                }
                //, returning:true  // it returns an array. we can also print updated data by doing emp[1][0]. // emp[0] - - > 0 = value not updated, 1 = value updated. // emp[1] = array of data filled. since, we have only one entry. emp[1][0] - - > our data.
            }
        )
        return res.status(200).json({message: "updated successfullly"}); // .json({message: "updated successfully"}, emp[1][0]);
    }catch(error){
        console.log(error);
        return res.status(500).json({ "error": "internal server error" });
    }
}

const deleteEmp = async (req, res) => {
    const UserModel = getUserModel();   // required table
    let empId = req.params.empId; 
    try{
        const emp = await UserModel.findOne({where: {empId: empId}});   // required row
        if(emp==null){
            return res.status(404).json({message: "employee not found"});
        }
        // else
        await emp.destroy();
        return res.status(200).json({message: "employee record deleted"})
    }catch(error){
        console.log(error);
        return res.status(500).json({ "error": "internal server error" });
    }
}

module.exports = { getAllEmp, addEmp, updateEmp, deleteEmp };

/*
Earlier version of the code:

const {UserModel} = require ('../postgres/postgres.js'); // EARLIER


const getAllEmp = async(req, res) =>{
    try{
        if (!UserModel) {
            return res.status(500).json({"error": "UserModel is not initialized or database connection failed"});
        }        
        const users = await UserModel.findAll();  // default async function in sequelize to get all records
        if(!Array.isArray(users) || users.length==0){
            return res.status(200).json({"error": "users not found"});
        }
        const userList = users.map(user => user.get({ plain: true }));
        return res.status(200).json(userList);
        // return res.status(200).json(users);
    }catch(error){
        console.log(error);
        return res.status(500).json({"error": "internal server error"});
    }
    // console.log('GET');
}

module.exports = {
    getAllEmp
};

*/