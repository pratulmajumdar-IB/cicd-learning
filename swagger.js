const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Cloud Run Demo API",
      version: "1.0.0",
      description: "API documentation for Cloud Run Demo",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    tags: [
      {
        name: "Authentication",
        description: "User registration and authentication APIs",
      },
      {
        name: "Users",
        description: "User management APIs",
      },
      {
        name: "Orders",
        description: "Order management APIs",
      },
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "64f123456789abcdef123456",
            },
            name: {
              type: "string",
              minLength: 2,
              maxLength: 50,
              example: "John Doe",
            },
            email: {
              type: "string",
              format: "email",
              example: "john@example.com",
            },
            age: {
              type: "integer",
              minimum: 18,
              maximum: 120,
              example: 25,
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        RegisterUser: {
          type: "object",
          required: ["name", "email", "age", "password"],
          properties: {
            name: {
              type: "string",
              minLength: 2,
              maxLength: 50,
              example: "John Doe",
            },
            email: {
              type: "string",
              format: "email",
              example: "john@example.com",
            },
            age: {
              type: "integer",
              minimum: 18,
              maximum: 120,
              example: 25,
            },
            password: {
              type: "string",
              minLength: 2,
              maxLength: 50,
              example: "Password@123",
            },
          },
        },
        LoginUser: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "john@example.com",
            },
            password: {
              type: "string",
              minLength: 2,
              maxLength: 50,
              example: "Password@123",
            },
          },
        },
        UpdateUser: {
          type: "object",
          required: ["name", "email", "age"],
          properties: {
            name: {
              type: "string",
              minLength: 2,
              maxLength: 50,
              example: "John Smith",
            },
            email: {
              type: "string",
              format: "email",
              example: "johnsmith@example.com",
            },
            age: {
              type: "integer",
              minimum: 18,
              maximum: 120,
              example: 30,
            },
          },
        },
        UserFilterResponse: {
          type: "object",
          properties: {
            users: {
              type: "array",
              items: {
                $ref: "#/components/schemas/User",
              },
            },
            pagination: {
              type: "object",
              properties: {
                page: {
                  type: "integer",
                  example: 1,
                },
                limit: {
                  type: "integer",
                  example: 10,
                },
                total: {
                  type: "integer",
                  example: 25,
                },
                totalPages: {
                  type: "integer",
                  example: 3,
                },
              },
            },
          },
        },
        Order: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "64f123456789abcdef123456",
            },
            user: {
              type: "string",
              example: "64f123456789abcdef654321",
            },
            product: {
              type: "string",
              example: "Laptop",
            },
            quantity: {
              type: "integer",
              minimum: 1,
              example: 2,
            },
            total: {
              type: "number",
              minimum: 0,
              example: 1500,
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        CreateOrder: {
          type: "object",
          required: ["user", "product", "quantity", "total"],
          properties: {
            user: {
              type: "string",
              description: "MongoDB ID of the user",
              example: "64f123456789abcdef123456",
            },
            product: {
              type: "string",
              example: "Laptop",
            },
            quantity: {
              type: "integer",
              minimum: 1,
              example: 2,
            },
            total: {
              type: "number",
              minimum: 0,
              example: 1500,
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Something went wrong",
            },
          },
        },
        ErrorWithDetails: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Failed to create user",
            },
            error: {
              type: "string",
              example: "Validation failed",
            },
          },
        },
      },
      responses: {
        UserNotFound: {
          description: "User not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
        ValidationError: {
          description: "Validation error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorWithDetails",
              },
            },
          },
        },
        ServerError: {
          description: "Server error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorWithDetails",
              },
            },
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
