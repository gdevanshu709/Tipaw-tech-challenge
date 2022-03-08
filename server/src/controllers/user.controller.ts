import { AuthenticationError, UserInputError } from 'apollo-server-errors'
import bcrypt from 'bcrypt'

import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config'

import {
    fetchAllUsers,
    findByEmail,
    createNewUser,
    deleteUserById,
    deleteUserWithEmail,
} from '../services/user.service'

import {
    UserRegistrationRules,
    UserAuthenticationRules,
} from '../util/validationSchemas';
import { ICreateUser, ILogin, IUser } from '../interfaces/User'

async function getUsers() {
    try {
        return await fetchAllUsers()
    } catch (error) {
        console.log('error', error)
        throw new Error('Internal Server Error')
    }
}

async function createUser(userData: ICreateUser) {
    try {


        // Validate Incoming New User Arguments
        await UserRegistrationRules.validate(userData, {abortEarly: false});
        const user = await findByEmail(userData.email)
        if (user) {
            throw new UserInputError('Email exists', {
                argumentName: 'email',
            })
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10)
        // eslint-disable-next-line no-param-reassign
        userData.password = hashedPassword
        const newUser = await createNewUser({
            ...userData,
            password: hashedPassword,
        })
        return {
            token: jwt.sign(newUser, JWT_SECRET, {
                expiresIn: '1d',
            }),
        }
    } catch (error:any) {
        console.log('error', error)
        if(error.name === 'ValidationError') {
            throw new UserInputError(error.errors.join(", "))
        }
        throw new Error('Internal Server Error')
    }
}

async function loginUser(userData: ILogin) {
    try {

        // Validate Incoming User Credentials
        await UserAuthenticationRules.validate(userData, { abortEarly: false });
        const user = await findByEmail(userData.email)
        if (!user) {
            throw new AuthenticationError('User not found')
        }
        const isMatch = await bcrypt.compare(userData.password, user.password)
        if (!isMatch) throw new AuthenticationError('Password is incorrect')
        return {
            token: jwt.sign(user, JWT_SECRET, {
                expiresIn: '1d',
            }),
        }
    } catch (error:any) {
        console.log('error', error)
        if(error.name === 'ValidationError') {
            throw new UserInputError(error.errors.join(", "))
        }
        throw new Error('Internal Server Error')
    }
}

async function getUserByToken(token: string) {
    try {
        if (!token) return null
        const user = jwt.verify(token, JWT_SECRET) as IUser
        return user
    } catch (error) {
        return null
    }
}

async function deleteUser(id: number) {
    try {
        return await deleteUserById(id)
    } catch (error) {
        console.log('error', error)
        throw new Error('Internal Server Error')
    }
}

async function deleteUserByEmail(email: string) {
    try {
        return await deleteUserWithEmail(email)
    } catch (error) {
        console.log('error', error)
        throw new Error('Internal Server Error')
    }
}

export {
    getUsers,
    createUser,
    loginUser,
    getUserByToken,
    deleteUser,
    deleteUserByEmail,
}
