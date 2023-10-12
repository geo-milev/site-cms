const isAdminOrEditor = ({ req: { user } }) => user && (user.role === 'admin' || user.role === 'editor');

export { isAdminOrEditor }
