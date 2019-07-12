export const USER_FRAGMENT = `
    fragment UserParts on User{
        id
        firstName
        lastName
        bio
        posts {
            id
            caption
        }
    }
`;
