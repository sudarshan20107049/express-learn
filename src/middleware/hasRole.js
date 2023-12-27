
export const hasRole = (...rolesAllowed) => {
    return async (req, res, next) => {
        const userRole = req.userRole
        const validRole = rolesAllowed.includes(userRole)
        if(validRole){
            return next()
        }
        else {
            return res.status(403).json({message:"Invalid to access these Router it's only admin"})
        }
    }
}

export default hasRole