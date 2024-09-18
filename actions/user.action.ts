'use server'; 
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export const allUsers = async () => {
    try {
        const session = await getServerSession(authOptions);
         
        if (!session) {
            // throw new Error("Unauthorized");
            return ;
        }
        const allUsers = await prisma.user.findMany({
            where: {
                email: {
                    not: session.user?.email
                } 
            }
        });
        return JSON.parse(JSON.stringify(allUsers));
    } catch (error) {
        console.error("An error occurred while fetching all users:", error);
        
    }
}

export const AdminUsers = async () => {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            // throw new Error("Unauthorized");
            return ;
        }
        const admin = await prisma.user.findUnique({
            where: {
                email: session.user?.email ?? undefined 
            },
           include:{
            isSubscription: {
                include:{
                    user: true
                }
            }
           }
        }); 
        return JSON.parse(JSON.stringify(admin));
    } catch (error) {
        console.log("An error occurred while fetching admin user:", error);
    }
}
export const PaticularUsers = async (id: string) => {
    try {  
        const allUsers = await prisma.user.findUnique({
            where: {
                id
            },
            
            include:{
                isSubscription: {
                    include:{
                        user: true
                    }
                }
                
               }
        }); 
        return JSON.parse(JSON.stringify(allUsers));
    } catch (error) {
        console.error("An error occurred while fetching particular user:", error); 
    }
} 
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
            // throw new Error("Unauthorized or session user email not found");
            return ;
        }
 
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
        return JSON.parse(JSON.stringify(updatedUser));

    } catch (error) {
        console.error("An error occurred while updating the user profile:", error); 
    }
};

export const userSubscription = async ({id}:{id:string|undefined}) => { 
    try {
        if (!id) {
           return [];
        }
        const subscribed = await prisma.subscription.findMany({
            where:{
                buyerId: id,
            },
            include:{
                user: true
            }
        });
        return  JSON.parse(JSON.stringify( subscribed ));
    } catch (error) {
        
    }
}
 

export const userWhoSubscribed = async ({ id }: { id: string | undefined }) => { 
    try {
        if (!id) {
            return [];
        }

        const buyers = await prisma.subscription.findMany({
            where: {
                userId: id, 
                buyerId: {
                    not: null 
                }
            },
            select: {
                buyerId: true, 
            }
        });

        // Get unique buyerIds from the results
        const uniqueBuyerIds = [...new Set(buyers.map(sub => sub.buyerId))].filter(id => id !== null) as string[];

        // Fetch users corresponding to the buyerIds
       
        const buyerUsers = await prisma.user.findMany({
            where: {
                id: {
                    in: uniqueBuyerIds // Find users whose ids match the buyerIds
                }
            }
        });

        return JSON.parse(JSON.stringify(buyerUsers));
    } catch (error) {
        console.error("Error fetching buyers: ", error);
     
    }
}
