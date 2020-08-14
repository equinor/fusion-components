import { PersonRole } from "@equinor/fusion";

const sortRoles = (a: PersonRole, b: PersonRole) => {
    return a.displayName.localeCompare(b.displayName);
};

export default sortRoles;
