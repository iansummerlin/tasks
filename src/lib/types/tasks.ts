import { z } from "zod";

export const taskBoardSchema = z.object({
  id: z.number().int().positive().optional(),
  name: z.string(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});

export type TaskBoard = z.infer<typeof taskBoardSchema>;

export const taskBoardSectionSchema = z.object({
  id: z.number().int().positive().optional(),
  task_board_id: z.number().int().positive(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  name: z.string(),
});

export type TaskBoardSection = z.infer<typeof taskBoardSectionSchema>;

export const taskBoardSectionTaskSchema = z.object({
  id: z.number().int().positive().optional(),
  task_board_section_id: z.number().int().positive(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  completed_at: z.date().nullable().optional(),
  archived_at: z.date().nullable().optional(),
  name: z.string(),
  description: z.string().nullable().optional(),
});

export type TaskBoardSectionTask = z.infer<typeof taskBoardSectionTaskSchema>;

export const taskBoardSectionTaskItemSchema = z.object({
  id: z.number().int().positive().optional(),
  task_board_section_task_id: z.number().int().positive(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  completed_at: z.date().nullable().optional(),
  name: z.string(),
});

export type TaskBoardSectionTaskItem = z.infer<
  typeof taskBoardSectionTaskItemSchema
>;

export const taskBoardTagSchema = z.object({
  id: z.number().int().positive().optional(),
  task_board_id: z.number().int().positive(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  name: z.string(),
  color: z.string(),
});

export type TaskBoardTag = z.infer<typeof taskBoardTagSchema>;

export const taskBoardSectionTaskTagSchema = z.object({
  id: z.number().int().positive().optional(),
  task_board_section_task_id: z.number().int().positive(),
  task_board_tag_id: z.number().int().positive(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});

export type TaskBoardSectionTaskTag = z.infer<
  typeof taskBoardSectionTaskTagSchema
>;
