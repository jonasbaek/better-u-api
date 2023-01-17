import bcrypt from "bcrypt";
import authService from "../services/auth.js";

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await authService.loginService(email);
    if (!user) {
      return res.status(404).send({ message: "Invalid email or password!" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid email or password!" });
    }
    const token = authService.generateToken(user.id);
    res.send(token);
  } catch (err) {
    res.status("500").send(err.message);
  }
};

export { login };
