import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middleware";

export default {
  Mutation: {
    addComment: async (_, args, { request }) => {
      isAuthenticated(request);
      const { text, postId } = args;
      const { user } = request;
      const comment = await prisma.createComment({
        text,
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
      return comment;
    }
  }
};
