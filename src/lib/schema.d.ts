/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/tasks": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get Tasks
         * @description Get Tasks
         */
        get: operations["get-tasks"];
        put?: never;
        /**
         * Create Task
         * @description Create Task
         */
        post: operations["crate-task"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/tasks/{taskId}": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Task ID */
                taskId: string;
            };
            cookie?: never;
        };
        /**
         * Get Task by ID
         * @description Get Task by ID
         */
        get: operations["get-task-by-id"];
        put?: never;
        post?: never;
        /**
         * Delete Task by ID
         * @description Delete Task by ID
         */
        delete: operations["delete-task-by-id"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/healthz": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * healthz
         * @description Get health state
         */
        get: operations["healthz"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        /** TaskCore */
        TaskCore: {
            /** Format: uri */
            site_url: string;
            duration_day: number;
            condition_query: string;
            is_public: boolean;
        };
        /** TaskRequest */
        TaskRequest: components["schemas"]["TaskCore"];
        /** TaskResponse */
        TaskResponse: components["schemas"]["TaskCore"] & {
            /** Format: uuid */
            readonly id: string;
            /** Format: date-time */
            readonly created_at: string;
            /** Format: uuid */
            readonly created_by: string;
            /** Format: date-time */
            readonly updated_at: string;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    "get-tasks": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TaskResponse"][];
                };
            };
        };
    };
    "crate-task": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": components["schemas"]["TaskRequest"];
            };
        };
        responses: {
            /** @description Created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "get-task-by-id": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Task ID */
                taskId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TaskResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "delete-task-by-id": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Task ID */
                taskId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    healthz: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
}
