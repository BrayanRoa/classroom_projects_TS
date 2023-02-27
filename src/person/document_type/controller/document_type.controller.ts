import { Request, Response } from 'express';
import { DeleteResult, UpdateResult } from 'typeorm';
import { HttpResponse } from '../../../shared/response/http-response';
import { DocumentTypeService } from '../service/document_type.service';


export class DocumentTypeController {

    constructor(
        private readonly httpResponse: HttpResponse = new HttpResponse(),
        private readonly documentService: DocumentTypeService = new DocumentTypeService()
    ) { }

    async findAll(_req: Request, res: Response) {
        try {
            const documents = await this.documentService.findAll();
            (!documents)
                ? this.httpResponse.NotFound(res, `no documents registered yet`)
                : this.httpResponse.Ok(res, documents)
        } catch (e) {
            return this.httpResponse.Error(res, e)
        }
    }

    async findOneBy(req: Request, res: Response) {
        try {
            const { id } = req.params
            const document = await this.documentService.findById(id);
            (!document)
                ? this.httpResponse.NotFound(res, `document with id ${id} not found`)
                : this.httpResponse.Ok(res, document)
        } catch (e) {
            return this.httpResponse.Error(res, e)
        }
    }

    async findOneByWithPersons(req: Request, res: Response) {
        try {
            const { id } = req.params
            const document = await this.documentService.findByIdWithPersons(id);
            (!document)
                ? this.httpResponse.NotFound(res, `document with id ${id} not found`)
                : this.httpResponse.Ok(res, document)
        } catch (e) {
            return this.httpResponse.Error(res, e)
        }
    }

    async create(req: Request, res: Response) {
        try {
            const body = req.body
            const newDocument = await this.documentService.create(body);
            this.httpResponse.Ok(res, newDocument)
        } catch (e) {
            return this.httpResponse.Custom(res, e)
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { name } = req.body
            const document: UpdateResult = await this.documentService.update(id, name);
            (document.affected === 0)
                ? this.httpResponse.NotFound(res, `document with id ${id} not found`)
                : this.httpResponse.Ok(res, `document updated successfully`)
        } catch (e) {
            return this.httpResponse.Error(res, e)
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params
            const document: DeleteResult = await this.documentService.delete(id);
            (document.affected === 0)
                ? this.httpResponse.NotFound(res, `document with id ${id} not found`)
                : this.httpResponse.Ok(res, `document deleted successfully`)
        } catch (e) {
            return this.httpResponse.Error(res, e)
        }
    }
}