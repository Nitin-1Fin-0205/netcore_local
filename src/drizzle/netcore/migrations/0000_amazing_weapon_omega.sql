-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE IF NOT EXISTS "Service_Priority" (
	"id" bigint PRIMARY KEY NOT NULL,
	"service_provider" text,
	"priority" bigint NOT NULL,
	"service" text,
	"is_active" boolean NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "__EFMigrationsHistory" (
	"MigrationId" varchar(150) PRIMARY KEY NOT NULL,
	"ProductVersion" varchar(32) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "application_log" (
	"id" bigint PRIMARY KEY NOT NULL,
	"created_date" timestamp with time zone NOT NULL,
	"user_code" uuid,
	"request_url" text,
	"log" text,
	"log_type" text,
	"log_stack_trace" text,
	"request" text,
	"token" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "communication_block_list" (
	"id" bigint PRIMARY KEY NOT NULL,
	"mobile_number" text,
	"email" text,
	"is_active" boolean NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"last_update_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "email_log" (
	"id" bigint PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"log_type" text NOT NULL,
	"log" text NOT NULL,
	"netcore_message" text,
	"netcore_message_id" text,
	"netcore_Submitted_at" text,
	"netcore_status" text,
	"bouncereasonid" bigint,
	"customargs1" text,
	"customargs2" text,
	"email" text,
	"fromaddress" text,
	"ip" text,
	"msize" bigint,
	"subject" text,
	"tags" text,
	"type" text,
	"url" text,
	"useragent" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "email_templates" (
	"id" bigint PRIMARY KEY NOT NULL,
	"body" text,
	"body_type" text,
	"is_active" boolean NOT NULL,
	"subject" text,
	"created_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hangfire_logs" (
	"id" bigint PRIMARY KEY NOT NULL,
	"scheduler" text,
	"createdAt" timestamp with time zone NOT NULL,
	"type" text,
	"description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "push_notification_log" (
	"id" bigint PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"log_type" text,
	"log" text,
	"message_id" text,
	"response_id" text,
	"response_status" text,
	"service" text,
	"email" text,
	"mobile_number" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sms_log" (
	"id" bigint PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"log_type" text NOT NULL,
	"log" text NOT NULL,
	"netcore_status" text,
	"netcore_request_id" text,
	"netcore_submitted_at" text,
	"feedid" bigint DEFAULT 0,
	"service_provider" text,
	"service_provider_id" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sms_mobile_request" (
	"id" bigint PRIMARY KEY NOT NULL,
	"mobile_number" text,
	"request_id" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sms_template" (
	"id" bigint PRIMARY KEY NOT NULL,
	"template_id" text,
	"template" text,
	"credential_id" bigint NOT NULL,
	"is_active" boolean NOT NULL,
	"created_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sms_template_credentials" (
	"id" bigint PRIMARY KEY NOT NULL,
	"feed_id" text,
	"user_name" text,
	"password" text,
	"entity_id" text,
	"is_active" boolean NOT NULL,
	"sms_url" text,
	"created_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "whatsapp_log" (
	"id" bigint PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"log_type" text NOT NULL,
	"log" text NOT NULL,
	"netcore_message" text,
	"netcore_message_id" text,
	"netcore_Submitted_at" text,
	"netcore_status" text,
	"mobile_number" text,
	"source" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "whatsapp_template" (
	"id" bigint PRIMARY KEY NOT NULL,
	"template" text,
	"template_id" text,
	"template_credential_id" bigint NOT NULL,
	"is_active" boolean NOT NULL,
	"created_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "whatsapp_template_credentials" (
	"id" bigint PRIMARY KEY NOT NULL,
	"url" text,
	"message_type" text,
	"recipient_type" text,
	"source" text,
	"x_apiheader" text,
	"is_active" boolean NOT NULL,
	"created_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "push_notification_token" (
	"id" bigint PRIMARY KEY NOT NULL,
	"user_code" uuid NOT NULL,
	"token" text,
	"created_at" timestamp NOT NULL,
	"last_updated_at" timestamp NOT NULL,
	"is_active" boolean
);

*/