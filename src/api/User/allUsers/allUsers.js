import { prisma } from "../../../../generated/prisma-client";
export default {
  Query: {
    allUsers: () => {
      return prisma.users();
    }
  }
};
