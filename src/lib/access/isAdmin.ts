const isAdmin = ({ req: { user } }) => user && user.role === 'admin';

export { isAdmin }
