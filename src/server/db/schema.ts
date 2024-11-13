// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
  type InferInsertModel,
  type InferSelectModel,
  relations,
} from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  timestamp,
  varchar,
  pgTable,
  pgEnum,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `uno_${name}`);

export const user = pgTable(
  "user",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }),
    email: varchar("email", { length: 256 }).unique(),
    password: varchar("password", { length: 256 }),
  },
  (table) => {
    return {
      indexOnEmail: index("user_email_index").on(table.email),
      indexOnPassword: index("user_password_index").on(table.password),
    };
  },
);

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
}));

export type CreateUser = InferInsertModel<typeof user>;
export type User = InferSelectModel<typeof user>;
export type UpdateUser = Partial<CreateUser>;

export const session = pgTable(
  "session",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    userId: integer("user_id")
      .references(() => user.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      })
      .notNull(),
    token: varchar("token", { length: 250 }).notNull(),
    expiresAt: timestamp("expires_at").notNull(),
  },
  (table) => {
    return {
      indexOnToken: index("session_token_index").on(table.token),
    };
  },
);

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export type CreateSession = InferInsertModel<typeof session>;
export type Session = InferSelectModel<typeof session>;
export type UpdateSession = Partial<CreateSession>;

export const cardColor = pgEnum("color", [
  "red",
  "green",
  "blue",
  "yellow",
  "wild",
]);

export const cardType = pgEnum("type", [
  "number",
  "draw_two",
  "reverse",
  "skip",
  "wild",
  "wild_draw_four",
  "wild_shuffle_hands",
  "wild_customizable",
]);

export const card = pgTable(
  "card",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    color: cardColor("color").notNull(),
    type: cardType("type").notNull(),
    value: integer("value"),
  },
  (table) => {
    return {
      indexOnId: index("card_id_index").on(table.id),
    };
  },
);

export type Card = InferSelectModel<typeof card>;
export type CreateCard = InferInsertModel<typeof card>;
export type UpdateCard = Partial<CreateCard>;
