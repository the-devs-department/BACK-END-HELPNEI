import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";

export const registerUser = async(userData: User) => {
    const userRepo = AppDataSource.getRepository(User);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    const newUser = userRepo.create(userData);
    await userRepo.save(newUser);
    return newUser;
};

export const login = async(email: string, password: string) => {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { email } });
    if (!user) throw new Error("Usuario com este e-mail não encontrado");
    
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("E-mail ou senha inválidos");
    }

    const token = jwt.sign({id: user.userId, email: user.email} ,process.env.JWT_SECRET, {expiresIn: '24h'});

    return { user, token };
}