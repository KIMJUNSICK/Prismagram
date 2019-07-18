import { prisma } from "../../../../generated/prisma-client";
import { ROOM_FRAGMENT } from "../../../fragments";

export default {
  Mutation: {
    sendMessage: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { roomId, text, toId } = args;
      let room;

      if (roomId === undefined) {
        if (user.id !== toId) {
          room = await prisma
            .createRoom({
              participants: {
                connect: [{ id: toId }, { id: user.id }]
              }
            })
            .$fragment(ROOM_FRAGMENT);
        }
      } else {
        room = await prisma.room({ id: roomId }).$fragment(ROOM_FRAGMENT);
      }
      if (!room) {
        throw Error("not found Room!");
      }

      const getTo = room.participants.filter(
        participant => participant.id !== user.id
      );

      return await prisma.createMessage({
        room: {
          connect: {
            id: room.id
          }
        },
        text,
        from: {
          connect: {
            id: user.id
          }
        },
        to: {
          connect: {
            id: roomId ? getTo[0].id : toId
          }
        }
      });
    }
  }
};