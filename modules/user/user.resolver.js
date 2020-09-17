import userService from './user.service';

const userQuery = {
    getUsers: () => userService.getUsers(),
    getUserByToken: (parent, args, context) => userService.getUser(context.user._id),
};

const userMutation = {
    loginUser: (parent, args) => userService.loginUser(args.user),
    updateUserByToken: (parent, args) => userService.updateUserByToken(args),
    registerUser: (parent, args) => userService.registerUser(args.user),
};

export {userQuery, userMutation};
