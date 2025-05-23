import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";

export const registerUser = async (userData: User) => {
    const userRepo = AppDataSource.getRepository(User);

    const existingUser = await userRepo.findOne({ where: { email: userData.email } });
    if (existingUser) {
        const error = new Error("E-mail já cadastrado") as any;
        error.status = 409;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    const newUser = userRepo.create(userData);

    try {
        await userRepo.save(newUser);
    } catch (err: any) {
        if (err.code === 'ER_DUP_ENTRY') {
            const dupError = new Error("E-mail já cadastrado") as any;
            dupError.status = 409;
            throw dupError;
        }
        throw err;
    }

    return newUser;
};

export const login = async (email: string, password: string) => {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { email } });
    if (!user) {
        const error = new Error("Usuário com este e-mail não encontrado") as any;
        error.status = 404;
        throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        const error = new Error("E-mail ou senha inválidos") as any;
        error.status = 401;
        throw error;
    }

    const token = jwt.sign(
        { id: user.userId, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: '24h' }
    );

    return { user, token };
};
