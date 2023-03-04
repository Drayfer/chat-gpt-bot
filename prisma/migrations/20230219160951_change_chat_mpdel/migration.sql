-- AlterTable
ALTER TABLE "Chat" ALTER COLUMN "session" SET DEFAULT 0,
ALTER COLUMN "session" DROP DEFAULT;
DROP SEQUENCE "Chat_session_seq";
