import { BUSINESSCOLLECTION } from "constants/collections";
import { database } from "../database";

export const insertBusiness = async (req: Request, res: Response) => {    
    const businessDAO = database?.collection(BUSINESSCOLLECTION);
    const {body} = req;
    console.log("body", body);
    await businessDAO.insertMany([body]);
};