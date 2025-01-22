import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { PrismaClient } from'@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const SECRET_JWT = process.env.SECRET_JWT;

const login = async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) return res.status(400).send({message: 'Please Provide All Fields'});

    try{
        const userExist = await prisma.user.findUnique({
            where : {               
                email:email
            }
        });
        console.log(userExist);
        if (!userExist) return res.status(400).json({message: 'Invalid Credentials'});

        const isMatch = await bcrypt.compare(password, userExist.password);
        if (!isMatch) return res.status(400).json({message: 'Invalid Credentials'});

        const jwtPayload = {
            id: userExist.id,
            username: userExist.username,
            email: userExist.email
        }
        console.log(jwtPayload);
        
        const token = jwt.sign(jwtPayload, SECRET_JWT, { expiresIn: '1h' });

        return res.status(200).send({message: 'Anda Berhasil Login'});
    }catch (err) {
        console.error(err);
        res.status(500).json({message:'Internal Server Error'})
    }
}

const register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) return res.status(400).send({ message: 'Please provide all fields' });

    try {
        const userExist = await prisma.user.findFirst({
            where : {
                OR :[
                    { username : username },
                    { email : email }
                ]
            }
        });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        if (userExist) return res.status(400).json({ message: 'USER SUDAH ADA' });

        const createUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            }
        });
        if (!createUser) return res.status(400).json({ message: 'GAGAL REGISTER' });

        return res.status(200).send({ message : "anda berhasil register" });
    } catch (error) {
        return res.status(500).send({ message : "Internal Server Error" });
    }
}

export { login, register };