import { PersonService } from '../service/person.service';
import { HttpResponse } from '../../../shared/response/http-response';
import { Request, Response } from 'express';
import { DeleteResult } from 'typeorm';


export class PersonController {

    constructor(
        private readonly personService: PersonService = new PersonService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) { }

    async findAll(_req: Request, res: Response) {
        try {
            const persons = await this.personService.findAll();
            (persons?.length === 0)
                ? this.httpResponse.NotFound(res, `no registered persons yet`)
                : this.httpResponse.Ok(res, persons)
        } catch (error) {
            this.httpResponse.Error(res, error)
        }
    }

    async findOneBy(req: Request, res: Response) {
        try {
            const { term } = req.params
            const person = await this.personService.findOneBy(term);
            (!person)
                ? this.httpResponse.NotFound(res, `person with term ${term} not found`)
                : this.httpResponse.Ok(res, person)
        } catch (error) {
            this.httpResponse.Error(res, error)
        }
    }

    async create(req: Request, res: Response) {
        try {
            await this.personService.create(req.body);
            this.httpResponse.Created(res, `person created successfully`)
        } catch (error) {
            this.httpResponse.Custom(res, error);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params
            const personUpdate = await this.personService.update(id, req.body);
            (personUpdate.affected === 0)
                ? this.httpResponse.NotFound(res, `person with id ${id} not found`)
                : this.httpResponse.Ok(res, `Person updated successfully`);
        } catch (error) {
            this.httpResponse.Error(res, error);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params
            const person: DeleteResult = await this.personService.delete(id);
            (person.affected === 0)
                ? this.httpResponse.NotFound(res, `person with id ${id} not found`)
                : this.httpResponse.Ok(res, `person deleted successfully`);
        } catch (error) {
            this.httpResponse.Error(res, error);
        }
    }

    async getPeopleByRole(req: Request, res: Response) {
        try {
            const { role } = req.params
            const teachers = await this.personService.getPeopleByRole(role);
            (teachers?.length === 0)
                ? this.httpResponse.NotFound(res, `no registered persons yet`)
                : this.httpResponse.Ok(res, teachers);
        } catch (error) {
            this.httpResponse.Error(res, error);
        }
    }

    async getAllPersonOfGroup(req: Request, res: Response) {
        try {
            const { id } = req.params
            const persons = await this.personService.getAllPersonOfGroup(id);
            (persons?.length === 0)
                ? this.httpResponse.NotFound(res, `There are no people registered in this group yet`)
                : this.httpResponse.Ok(res, persons);
        } catch (error) {
            this.httpResponse.Error(res, error);
        }
    }

    async mySubjects(req: Request, res: Response) {
        try {
            const { mail } = req.params
            const subjects = await this.personService.mySubjects(mail);
            (!subjects)
                ? this.httpResponse.NotFound(res, `person with email ${mail} not found`)
                : this.httpResponse.Ok(res, subjects);
        } catch (error) {
            this.httpResponse.Error(res, error);
        }
    }

    async uploadImg(req: Request, res: Response) {
        try {
            const {id} = req.params
            await this.personService.uploadImage(id, req.files?.archivo)
            this.httpResponse.Ok(res, `image upload successfully`)
        } catch (error:any) {
            this.httpResponse.NotFound(res, error.message);
        }
    }
}