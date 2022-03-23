import ErrorModel from "../shared/models/error.model";
import User from "./models/user.model";

export default class AuthState {
    user: User;
    error: ErrorModel;
}

export const initializeState = (): AuthState => {
    return { user: null, error: null };
};
