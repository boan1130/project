import { Contorller } from "../abstract/Contorller";
import { Request, Response } from "express";
import { logger } from "../middlewares/log";
import { Service } from "../abstract/Service";
import { PageService } from "../Service/PageService";
import { DB } from "../app";
require('dotenv').config()

export class ReservationsController extends Contorller {
    protected service: Service;

    constructor() {
        super();
        this.service = new PageService();
    }

    public async test(req: Request, res: Response) {
        try {
            const { timeslot_id } = req.params;
            await DB.connection?.query("USE lab_b310;");
    
            const resp = await DB.connection?.query(
                "SELECT * FROM Reservations； "
            );
    
            res.send(resp);
        } catch (error) {
            console.error("SQL Query Error:", error);
            res.status(500).send({ error: "Database error" });
        }
    }
}