import { Request, Response } from "express";

import Issue, {IIsue} from '../models/issue';

import { ObjectId } from "mongoose";    

export const postNewIssue = async (req: Request, res: Response): Promise<void> => {
    const {title, description, priority, user}: IIsue = req.body;

    const usuario: ObjectId = req.body.usuarioConfirmado._id;

    const issueData = {
        title,
        description,
        priority,
        user: usuario,
        createAt: new Date()
    }


    const issue = new Issue(issueData);

    await issue.save();

    res.status(201).json({
        issue
    });
}