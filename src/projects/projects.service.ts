import { Injectable, NotFoundException } from '@nestjs/common';

export type ProjectStatus = 'PLANNED' | 'ACTIVE' | 'DONE';

export interface Project {
  id: number;
  name: string;
  description?: string;
  status: ProjectStatus;
}

export interface CreateProjectInput {
  name: string;
  description?: string;
  status?: ProjectStatus;
}

export type UpdateProjectInput = Partial<CreateProjectInput>;

@Injectable()
export class ProjectsService {
  private projects: Project[] = [
    {
      id: 1,
      name: 'Onboarding',
      description: 'Week 3 NestJS tasks',
      status: 'ACTIVE',
    },
  ];

  findAll(status?: ProjectStatus): Project[] {
    if (!status) return this.projects;
    const filtered = this.projects.filter((p) => p.status === status);
    if (filtered.length === 0) {
      throw new NotFoundException('No projects found for that status');
    }
    return filtered;
  }

  findOne(id: number): Project {
    const project = this.projects.find((p) => p.id === id);
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  create(dto: CreateProjectInput): Project {
    const newProject: Project = {
      id: this.projects.length ? Math.max(...this.projects.map((p) => p.id)) + 1 : 1,
      name: dto.name,
      description: dto.description,
      status: dto.status ?? 'PLANNED',
    };
    this.projects.push(newProject);
    return newProject;
  }

  update(id: number, dto: UpdateProjectInput): Project {
    const existing = this.findOne(id);
    const updated: Project = {
      ...existing,
      ...dto,
      status: dto.status ?? existing.status,
    };
    this.projects = this.projects.map((p) => (p.id === id ? updated : p));
    return this.findOne(id);
  }

  remove(id: number): Project {
    const removed = this.findOne(id);
    this.projects = this.projects.filter((p) => p.id !== id);
    return removed;
  }
}

