import prisma from '../../prisma'
import { ICreateUser } from '../interfaces/User'

const fetchAllUsers = () => prisma.user.findMany()

const createNewUser = (userData: ICreateUser) =>
    prisma.user.create({
        data: userData,
    })

const findByEmail = (email: string) =>
    prisma.user.findUnique({
        where: {
            email,
        },
    })

const deleteUserById = (id: number) =>
    prisma.user.delete({
        where: {
            id,
        },
    })

const deleteUserWithEmail = (email: string) =>
    prisma.user.delete({
        where: {
            email,
        },
    })

export {
    fetchAllUsers,
    createNewUser,
    findByEmail,
    deleteUserById,
    deleteUserWithEmail,
}
