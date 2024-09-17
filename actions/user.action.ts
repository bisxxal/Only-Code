'use server'; 
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export const allUsers = async () => {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            throw new Error("Unauthorized");
        }

        const allUsers = await prisma.user.findMany({
            where: {
                email: {
                    not: session.user?.email
                } 
            }
        });

        return allUsers;

    } catch (error) {
        console.error("An error occurred while fetching all users:", error);
        // Optionally return a more specific result or throw again
        throw new Error("Unable to fetch users");
    }
}

export const AdminUsers = async () => {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            throw new Error("Unauthorized");
        }
        const admin = await prisma.user.findUnique({
            where: {
                email: session.user?.email ?? undefined 
            },
           
        }); 

        return admin;

    } catch (error) {
        console.log("An error occurred while fetching admin user:", error);
        
    }
}
export const PaticularUsers = async (id: string) => {
    try {  
        const allUsers = await prisma.user.findUnique({
            where: {
                id
            }
        }); 
        return allUsers; 
    } catch (error) {
        console.error("An error occurred while fetching particular user:", error); 
    }
}
// console.log(allUsers());

interface UpdateUserProps {
    backgroundImage: string;
    name: string;
    image: string;
    description: string;
    subscriptionPrice: number;
}
export const updateUserProfile = async ({ backgroundImage ,name , image,description ,subscriptionPrice  }: UpdateUserProps) => {
    try {
       
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.email) {
            throw new Error("Unauthorized or session user email not found");
        }

        // Update the user's profile with the new background image
        const updatedUser = await prisma.user.update({
            where: {
                email: session.user.email
            },
            data: {
                backgoundImage: backgroundImage,
                name,
                image,
                description,
                subscriptionPrice
            },
        });

        // Return the updated user information
        return updatedUser;

    } catch (error) {
        console.error("An error occurred while updating the user profile:", error);
        throw new Error("Unable to update user profile");
    }
};
