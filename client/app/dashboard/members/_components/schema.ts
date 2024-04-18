import { z } from "zod";
export const userSchema = z.object({
  user: z.object({
    _id: z.string(),
    name: z.string(),
    username: z.string(),
    profilePic: z.string(),
  }),
  email: z.string(),
  roles: z.array(z.string()),
  createdAt: z.string(),
});

export type User = z.infer<typeof userSchema>;

/**
 * {
        "_id": "661de6638091bb13c1e0a387",
        "name": "Omar Hansali",
        "username": "o.hansali",
        "profilePic": "https://api.dicebear.com/8.x/initials/svg?fontSize=40&seed=Omar%20Hansali",
        "email": "omarhansali@gmail.com",
        "roles": [
            "user"
        ],
        "createdAt": "2024-04-16T02:45:55.848Z",
        "updatedAt": "2024-04-16T02:45:55.848Z"
    }
 */
