import { Request, Response } from 'express';
import { Repository } from 'typeorm';

export class BaseController<T> {
    constructor(private repository: Repository<T>) {}

    async getAll(req: Request, res: Response) {
        const items = await this.repository.find();
        return res.json(items);
    }

    async getOne(req: Request, res: Response) {
        const id = req.params.id;
        const item = await this.repository.findOne({ where: { id } as any });
        if (!item) return res.status(404).json({ message: 'Not found' });
        return res.json(item);
    }

    async create(req: Request, res: Response) {
        const newItem = this.repository.create(req.body);
        const result = await this.repository.save(newItem);
        return res.status(201).json(result);
    }

    async update(req: Request, res: Response) {
        const id = req.params.id;
        const result = await this.repository.update(id, req.body);
        if (result.affected === 0) return res.status(404).json({ message: 'Not found' });
        const updated = await this.repository.findOne({ where: { id } as any });
        return res.json(updated);
    }

    async delete(req: Request, res: Response) {
        const id = req.params.id;
        const result = await this.repository.delete(id);
        if (result.affected === 0) return res.status(404).json({ message: 'Not found' });
        return res.status(204).send();
    }
}