import { generateSecret, sendScretMail } from "../../../utils";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    requestSecret: async (_, args, { request }) => {
      const { email } = args;
      const loginSecret = generateSecret();
      console.log(request.user);
      try {
        throw Error();
        await prisma.updateUser({ data: { loginSecret }, where: { email } });
        sendScretMail(email, loginSecret);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};
