export const USER_FRAGMENT = `
        id
        avatar
        userName
`;

export const COMMENT_FRAGMENT = `
        id
        text
        user{
            ${USER_FRAGMENT}
        }
`;

export const FILE_FRAGMENT = `
        id
        url
`;

export const MESSAGE_FRAGMENT = `
        id
        text
        from {
            ${USER_FRAGMENT}
        }
        to {
            ${USER_FRAGMENT}
        }
`;

export const ROOM_FRAGMENT = `
    fragment RoomParts on Room{
        id
        participants {
            ${USER_FRAGMENT}
        }
        messages {
            ${MESSAGE_FRAGMENT}
        }
    }
`;
