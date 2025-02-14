// import { createUser } from "../services/userService.js";

const createUser = (req, res) => {
  try {
    console.log(req.body);
    // await createUser(req.body);
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { createUser };
