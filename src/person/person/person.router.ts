import { PersonController } from './controller/person.controller';
import { BaseRouter } from '../../shared/router/router';
import { PersonMiddleware } from './middleware/person.middleware';

export class PersonRouter extends BaseRouter<PersonController, PersonMiddleware>{

    constructor() {
        super(PersonController, PersonMiddleware)
    }

    routes(): void {

        /*
        * Gets all the people registered in the system
        */
        this.router.get(
            "/persons",
            // (req, res, next) => this.middleware.validarJwt(req, res, next),
            (req, res) => this.controller.findAll(req, res)
        )

        /*
        * Gets all people by - allowed (código o correo institucional)
        */
        this.router.get(
            "/person/:term",
            (req, res) => this.controller.findOneBy(req, res)
        )

        /*
        * register a person in the system
        */
        this.router.post(
            "/person/create",
            (req, res, next) => this.middleware.personValidator(req, res, next),
            (req, res) => this.controller.create(req, res)
        )

        /*
        * update a person's information
        */
        this.router.patch(
            "/person/update/:id",
            (req, res, next) => this.middleware.uuidValidator(req, res, next),
            (req, res, next) => this.middleware.personValidator(req, res, next),
            (req, res, next) => this.middleware.validarJwt(req, res, next),
            (req, res) => this.controller.update(req, res)
        )

        /*
        * set a person's status to false
        */
        this.router.delete(
            "/person/delete/:id",
            (req, res, next) => this.middleware.uuidValidator(req, res, next),
            (req, res) => this.controller.delete(req, res)
        )

        /*
        * Gets all people by their role - allowed (docente o estudiante) 
        */
        this.router.get('/person/:role/all',
            (req, res) => this.controller.getPeopleByRole(req, res)
        )

        /*
        * gets all people in a group
        */
        this.router.get('/persons/group/:id',
            (req, res, next) => [this.middleware.uuidValidator(req, res, next)],
            (req, res) => this.controller.getAllPersonOfGroup(req, res)
        )

        /*
        * obtains the subjects in which the person is enrolled
        */
        this.router.get('/person/subjects/:mail',
            (req, res) => this.controller.mySubjects(req, res)
        )

        /*
        * update the person's profile picture 
        */
        this.router.post(
            '/person/image/:id',
            (req, res, next) => this.middleware.existFile(req, res, next),
            (req, res) => this.controller.uploadImg(req, res)
        )

        /*
        * shows the list of projects of the person 
        */
        this.router.get('/person/my_projects/:mail',
            (req, res) => this.controller.viewMyProjects(req, res)
        )
    }
}