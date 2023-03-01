import { SubjectService } from '../service/subject.service';
import { HttpResponse } from '../../../shared/response/http-response';
import { Request, Response } from 'express';
import { UpdateResult } from 'typeorm';


export class SubjectController {

    constructor(
        private readonly subjectService: SubjectService = new SubjectService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) { }

    async findAll(_req: Request, res: Response) {
        try {
            const subjects = await this.subjectService.findAll();
            (subjects?.length === 0)
                ? this.httpResponse.NotFound(res, `no registered subject yet`)
                : this.httpResponse.Ok(res, subjects);
        } catch (error) {
            this.httpResponse.Error(res, error);
        }
    }

    async findOneById(req: Request, res: Response) {
        try {
            const { id } = req.params
            const subject = await this.subjectService.findOneById(id);
            (!subject)
                ? this.httpResponse.NotFound(res, `subject not found`)
                : this.httpResponse.Ok(res, subject);
        } catch (error) {
            this.httpResponse.Error(res, error);
        }
    }

    async findOneWithteachers(req: Request, res: Response) {
        try {
            const { id } = req.params
            const subject_groups = await this.subjectService.findOneWithteachers(id);
            (!subject_groups)
                ? this.httpResponse.NotFound(res, `matter without groups`)
                : this.httpResponse.Ok(res, subject_groups);
        } catch (error) {
            this.httpResponse.Error(res, error);
        }
    }

    async create(req: Request, res: Response) {
        try {
            await this.subjectService.create(req.body);
            this.httpResponse.Created(res, `Subject created successfully`);
        } catch (error) {
            this.httpResponse.Custom(res, error);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { code } = req.params
            const subject:UpdateResult = await this.subjectService.update(code, req.body);
            (subject.affected === 0)
                ? this.httpResponse.NotFound(res, `Subject with id ${code} not found`)
                : this.httpResponse.Ok(res, `Subject updated successfully`);
        } catch (error) {
            this.httpResponse.Custom(res, error);
        }
    }

}