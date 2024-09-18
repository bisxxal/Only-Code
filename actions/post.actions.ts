"use server";
 
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

type PostArgs = {
  text: string;
  mediaUrl?: string;
  mediaType?: "image" | "video";
  isPublic: boolean;
};

export const createPostAction = async ({
  text,
  isPublic,
  mediaUrl,
  mediaType,
}: PostArgs) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error("Unauthorized");
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email || "",
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const newPost = await prisma.post.create({
      data: {
        text,
        mediaUrl,
        mediaType,
        isPublic,
        userId: user?.id,
      },
    });

    return JSON.parse(JSON.stringify({ newPost }));
  } catch (error) {}
};

interface PostStats {
  imageCount: number;
  videoCount: number;
  totalLikes: number;
}
export const CoverImage = async (userId: string): Promise<PostStats> => {
  try {
    const [imageCountResult, videoCountResult, allPosts] = await Promise.all([
      prisma.post.count({
        where: {
          userId,
          mediaType: "image",
          mediaUrl:{
            not: ''
          }
        },
      }),
      prisma.post.count({
        where: {
          userId,
          mediaType: "video",
          mediaUrl:{
            not: ''
          }
        },
      }),
      prisma.post.findMany({
        where: {
          userId,
        },
        select: {
          likes: true,
        },
      }),
    ]);

    const totalLikes = allPosts.reduce(
      (accumulator, post) => accumulator + post.likes,
      0
    );

    return JSON.parse(JSON.stringify({   imageCount: imageCountResult, videoCount: videoCountResult, totalLikes  }))
    
  } catch (error) {
    console.error("Error fetching post statistics:", error);
    throw error;
  }
};

export const PaticularPost = async ({ userId }: { userId: string }) => {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }
    const session = await getServerSession(authOptions);

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email || "",
      },
      

      select: {
        id: true,
      },
    });

    const post = await prisma.post.findMany({
      where: {
        userId: userId,
      },
      orderBy:{
        createdAt: 'desc'
    },
      include: {
        comments: {
          include: {
            user: true,
          },
        },
        likelist: { where: { userId: user?.id } },
      },
    });
 
    return JSON.parse(JSON.stringify(post));
  } catch (error) {}
};

export const PaticularPostForMedia = async ({ userId }: { userId: string }) => {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }
    const session = await getServerSession(authOptions);

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email || "",
      },

      select: {
        id: true,
      },
    });

    const post = await prisma.post.findMany({
      where: {
        userId: userId,
        mediaUrl: {
          not: '',
        },
      },
      orderBy:{
        createdAt: 'desc'
    },
      include: {
        comments: {
          include: {
            user: true,
          },
        },
        likelist: { where: { userId: user?.id } },
      },
    });
 
    return JSON.parse(JSON.stringify(post));
  } catch (error) {}
};


export const setLike = async ({ postId }: { postId: string }) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new Error("Post not found");
    }

    const like = await prisma.like.findFirst({
      where: {
        postId: post.id,
      },
    });

    if (like) {
      await prisma.like.delete({
        where: {
          id: like.id,
        },
      });
    } else {
      await prisma.like.create({
        data: {
          postId: post.id,
          userId: post.userId,
        },
      });
    }
  } catch (error) {}
};

export const postsAll = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error("Unauthorized");
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email || "",
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const posts = await prisma.post.findMany({
      include: {
        comments: {
          include: {
            user: true,
          },
        },
        likelist: { where: { userId: user.id } },
      },
    }); 
    return  JSON.parse(JSON.stringify({posts }))
  } catch (error) {}
};

export const deletePost = async ({ id }: { id: string }) => {
  try {
    const session = await getServerSession(authOptions);

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email || "",
      },

      select: {
        id: true,
      },
    });

    const post = await prisma.post.findUnique({
      where: {
        id,
        userId: user?.id,
      },
    });

    if (!post || !user) {
      throw new Error("Post not found");
    }

    await prisma.post.delete({
      where: {
        id: post.id,
      },
    });

    return  JSON.parse(JSON.stringify({ success:true }))
  } catch (error) {}
};

export async function likePostAction(postId: string) {

  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email || "",
    },
     
  });

  if (!user) {
    throw new Error("Unauthorized");
  }
  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: { likes: true, likelist: { where: { userId: user.id } } },
  });

  if (!post) { return JSON.parse(JSON.stringify({ success:false })) }       

  let newLikes: number;
  if (post.likelist.length > 0) {
    newLikes = Math.max(post.likes - 1, 0);
    await prisma.like.deleteMany({
      where: { postId: postId, userId: user.id },
    });
  } else {
    newLikes = post.likes + 1;
    await prisma.like.create({
      data: { postId: postId, userId: user.id },
    });
  }

  await prisma.post.update({
    where: { id: postId },
    data: { likes: newLikes },
  });

  return  JSON.parse(JSON.stringify({ success:true }))
}


export async function commentOnPostAction(postId: string, text: string) {
  try { 
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      throw new Error("Unauthorized: No user email found.");
    } 
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {  
      return JSON.parse(JSON.stringify({ success:false }))
    }

    // Check if the post exists
     
    await prisma.comment.create({
      data: {
        text,
        postId,
        userId: user.id,
      },
    });

    return  JSON.parse(JSON.stringify({ success:true }))

  } catch (error) {
    // Detailed error logging
    console.error("Error commenting on the post:");
    throw new Error("Failed to comment on the post. Please try again later.");
  }
}  
export const postForPublicUser = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      throw new Error("Unauthorized: No user email found.");
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      throw new Error("Unauthorized: User not found.");
    }

    const posts = await prisma.post.findMany({
      where: {
        OR: [
          { isPublic: true }, // Condition 1: Post is public
          {
            user: {
              isSubscription: {
                some: {
                  buyerId: user.id, // Condition 2: The user is subscribed
                },
              },
            },
          },
        ],
      },
      orderBy:{
        createdAt: 'desc'
    },
      include: {
        comments: {
          include: {
            user: true, // Include details of users who commented
          },
        },
        likelist: true,
        user: {
          include: {
            isSubscription: true, // Include subscription details of the post's user
          },
        },
      },
    });

    return JSON.parse(JSON.stringify({ posts }));

  } catch (error) {
    console.log("Error while fetching public posts:", error);
    throw error;
  }
};
