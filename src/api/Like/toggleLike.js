import { isAuthenticated } from "../../middleware";
import { prisma } from "../../../generated/prisma-client";

export default {
  Mutation: {
    toggleLike: async (_, args, { request }) => {
      isAuthenticated(request);
      const { postId } = args;
      const { user } = request;
      const filtetOpt = {
        AND: [
          {
            user: {
              id: user.id
            }
          },
          {
            post: {
              id: postId
            }
          }
        ]
      };

      try {
        const existingLike = await prisma.$exists.like(filtetOpt);
        if (existingLike) {
          await prisma.deleteManyLikes(filtetOpt);
        } else {
          await prisma.createLike({
            user: {
              connect: {
                id: user.id
              }
            },
            post: {
              connect: {
                id: postId
              }
            }
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};
