export enum USERTYPE {
    ADMIN,
    CUSTOMER,
    BUSINESSOWNER,
    EMPLOYEE
};

export function isUserTypeValid(value) {
    for (const key of Object.keys(USERTYPE)) {
        if (USERTYPE[key] === value) {
            return true;
        }
    }
    return false;
}