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
  boolean,
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
    username: varchar("username", { length: 256 }).unique(),
    password: varchar("password", { length: 256 }),
  },
  (table) => {
    return {
      indexOnUsername: index("user_username_index").on(table.username),
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

export const gameDirection = pgEnum("direction", [
  "clockwise",
  "counter_clockwise",
]);

export const gameStatus = pgEnum("status", ["waiting", "active", "finished"]);

export const game = pgTable("game", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  startedAt: timestamp("started_at").notNull(),
  endedAt: timestamp("ended_at"),
  direction: gameDirection("direction").notNull(),
  status: gameStatus("status").notNull(),
});

export const gameRelations = relations(game, ({ many }) => ({
  players: many(player),
}));

export type CreateGame = InferInsertModel<typeof game>;
export type Game = InferSelectModel<typeof game>;
export type UpdateGame = Partial<CreateGame>;

export const player = pgTable("player", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  gameId: integer("game_id")
    .references(() => game.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
  userId: integer("user_id")
    .references(() => user.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
  turnOrder: integer("turn_order").notNull(),
  hasCalledUno: boolean("has_called_uno").notNull().default(false),
  currentTurn: boolean("current_turn").notNull().default(false),
});

export const playerRelations = relations(player, ({ one }) => ({
  game: one(game, {
    fields: [player.gameId],
    references: [game.id],
  }),
}));

export type CreatePlayer = InferInsertModel<typeof player>;
export type Player = InferSelectModel<typeof player>;
export type UpdatePlayer = Partial<CreatePlayer>;

export const playerHand = pgTable("player_hand", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  playerId: integer("player_id")
    .references(() => player.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
  cardId: integer("card_id")
    .references(() => card.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
});

export const playerHandRelations = relations(playerHand, ({ one }) => ({
  player: one(player, {
    fields: [playerHand.playerId],
    references: [player.id],
  }),
  card: one(card, {
    fields: [playerHand.cardId],
    references: [card.id],
  }),
}));

export type CreatePlayerHand = InferInsertModel<typeof playerHand>;
export type PlayerHand = InferSelectModel<typeof playerHand>;
export type UpdatePlayerHand = Partial<CreatePlayerHand>;

export const gameTurn = pgTable("game_turn", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  gameId: integer("game_id")
    .references(() => game.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
  playerId: integer("player_id")
    .references(() => player.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
  cardId: integer("card_id")
    .references(() => card.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
  isSkipped: boolean("is_skipped").notNull().default(false),
  turnNumber: integer("turn_number").notNull(),
  chosenColor: cardColor("chosen_color"),
  playedAt: timestamp("played_at").notNull().defaultNow(),
});

export const gameTurnRelations = relations(gameTurn, ({ one }) => ({
  game: one(game, {
    fields: [gameTurn.gameId],
    references: [game.id],
  }),
  player: one(player, {
    fields: [gameTurn.playerId],
    references: [player.id],
  }),
  card: one(card, {
    fields: [gameTurn.cardId],
    references: [card.id],
  }),
}));

export type CreateGameTurn = InferInsertModel<typeof gameTurn>;
export type GameTurn = InferSelectModel<typeof gameTurn>;
export type UpdateGameTurn = Partial<CreateGameTurn>;
