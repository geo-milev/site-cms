const isAdminOrSelf = ({ req: { user } }) => {
    if (!user) return false;

    if (user.role === 'admin') {
        return true;
    }

    return {
        email: {
            equals: user.email
        }
    };
}

export { isAdminOrSelf }
