import { BaseService } from '../../../config/base.service';
import { ProjectEntity } from '../entity/project.entity';
import { GroupService } from '../../group/service/group.service';
import { ProjectDTO } from '../dto/project.dto';
import { UpdateProjectDTO } from '../dto/update_project.dto';
import readXlsxFile from "read-excel-file/node";
import path from "path"
import fs from "fs"
export class ProjectService extends BaseService<ProjectEntity>{

    constructor(
        private readonly groupService: GroupService = new GroupService(),
    ) {
        super(ProjectEntity)
    }

    async findOneById(id: string): Promise<ProjectEntity | null> {
        try {
            return (await this.execRepository).findOneBy({ id })
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async findOneByName(name: string): Promise<ProjectEntity | null> {
        try {
            return (await this.execRepository)
                .createQueryBuilder("project")
                .where("project.name = :name", { name })
                .getOne()
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async create(body: ProjectDTO) {
        try {
            const group = await this.groupService.findOneBy(body.group)
            if (!group) throw new Error(`Group not found`)
            if (group) {
                const newProject = (await this.execRepository).create(body)
                newProject.group = group
                return (await this.execRepository).save(newProject)
            }
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async update(id: string, body: UpdateProjectDTO) {
        try {
            return (await this.execRepository).update(id, body)
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async uploadExcelProjects(group_id: string, fileName: string) {
        try {
            const pathArchivo = path.join(__dirname, `../../../uploads/${fileName}`);
            await readXlsxFile(pathArchivo).then(async (rows) => {
                rows.shift()
                for (const project of rows) {
                    const exist = await this.findOneByName(project[0].toString())
                    if (!exist) {
                        let newProject = new ProjectDTO()
                        newProject.name = project[0].toString()
                        newProject.description = project[1].toString()
                        newProject.number_of_students = +project[2]
                        newProject.state = project[3].toString()
                        newProject.group = group_id
                        await this.create(newProject)
                    }
                }
            }).catch((error) => {
                throw new Error(error)
            })
            if (fs.existsSync(pathArchivo)) {
                fs.unlinkSync(pathArchivo);
            }
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}