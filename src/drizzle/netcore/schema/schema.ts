import {
  pgTable,
  bigint,
  text,
  boolean,
  timestamp,
  varchar,
  uuid,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const Service_Priority = pgTable('Service_Priority', {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint('id', { mode: 'number' }).primaryKey().notNull(),
  service_provider: text('service_provider'),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  priority: bigint('priority', { mode: 'number' }).notNull(),
  service: text('service'),
  is_active: boolean('is_active').notNull(),
  updated_at: timestamp('updated_at', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
});

export const __EFMigrationsHistory = pgTable('__EFMigrationsHistory', {
  MigrationId: varchar('MigrationId', { length: 150 }).primaryKey().notNull(),
  ProductVersion: varchar('ProductVersion', { length: 32 }).notNull(),
});

export const application_log = pgTable('application_log', {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint('id', { mode: 'number' }).primaryKey().notNull(),
  created_date: timestamp('created_date', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  user_code: uuid('user_code'),
  request_url: text('request_url'),
  log: text('log'),
  log_type: text('log_type'),
  log_stack_trace: text('log_stack_trace'),
  request: text('request'),
  token: text('token'),
});

export const communication_block_list = pgTable('communication_block_list', {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint('id', { mode: 'number' }).primaryKey().notNull(),
  mobile_number: text('mobile_number'),
  email: text('email'),
  is_active: boolean('is_active').notNull(),
  created_at: timestamp('created_at', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  last_update_at: timestamp('last_update_at', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
});

export const email_log = pgTable('email_log', {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint('id', { mode: 'number' }).primaryKey().notNull(),
  created_at: timestamp('created_at', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  log_type: text('log_type').notNull(),
  log: text('log').notNull(),
  netcore_message: text('netcore_message'),
  netcore_message_id: text('netcore_message_id'),
  netcore_Submitted_at: text('netcore_Submitted_at'),
  netcore_status: text('netcore_status'),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  bouncereasonid: bigint('bouncereasonid', { mode: 'number' }),
  customargs1: text('customargs1'),
  customargs2: text('customargs2'),
  email: text('email'),
  fromaddress: text('fromaddress'),
  ip: text('ip'),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  msize: bigint('msize', { mode: 'number' }),
  subject: text('subject'),
  tags: text('tags'),
  type: text('type'),
  url: text('url'),
  useragent: text('useragent'),
});

export const email_templates = pgTable('email_templates', {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint('id', { mode: 'number' }).primaryKey().notNull(),
  body: text('body'),
  body_type: text('body_type'),
  is_active: boolean('is_active').notNull(),
  subject: text('subject'),
  created_at: timestamp('created_at', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
});

export const hangfire_logs = pgTable('hangfire_logs', {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint('id', { mode: 'number' }).primaryKey().notNull(),
  scheduler: text('scheduler'),
  createdAt: timestamp('createdAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  type: text('type'),
  description: text('description'),
});

export const push_notification_log = pgTable('push_notification_log', {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint('id', { mode: 'number' }).primaryKey().notNull(),
  created_at: timestamp('created_at', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  log_type: text('log_type'),
  log: text('log'),
  message_id: text('message_id'),
  response_id: text('response_id'),
  response_status: text('response_status'),
  service: text('service'),
  email: text('email'),
  mobile_number: text('mobile_number'),
});

export const sms_log = pgTable('sms_log', {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint('id', { mode: 'number' }).primaryKey().notNull(),
  created_at: timestamp('created_at', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  log_type: text('log_type').notNull(),
  log: text('log').notNull(),
  netcore_status: text('netcore_status'),
  netcore_request_id: text('netcore_request_id'),
  netcore_submitted_at: text('netcore_submitted_at'),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  feedid: bigint('feedid', { mode: 'number' }).default(0),
  service_provider: text('service_provider'),
  service_provider_id: text('service_provider_id'),
});

export const sms_mobile_request = pgTable('sms_mobile_request', {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint('id', { mode: 'number' }).primaryKey().notNull(),
  mobile_number: text('mobile_number'),
  request_id: text('request_id'),
});

export const sms_template = pgTable('sms_template', {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint('id', { mode: 'number' }).primaryKey().notNull(),
  template_id: text('template_id'),
  template: text('template'),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  credential_id: bigint('credential_id', { mode: 'number' }).notNull(),
  is_active: boolean('is_active').notNull(),
  created_at: timestamp('created_at', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
});

export const sms_template_credentials = pgTable('sms_template_credentials', {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint('id', { mode: 'number' }).primaryKey().notNull(),
  feed_id: text('feed_id'),
  user_name: text('user_name'),
  password: text('password'),
  entity_id: text('entity_id'),
  is_active: boolean('is_active').notNull(),
  sms_url: text('sms_url'),
  created_at: timestamp('created_at', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
});

export const whatsapp_log = pgTable('whatsapp_log', {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint('id', { mode: 'number' }).primaryKey().notNull(),
  created_at: timestamp('created_at', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  log_type: text('log_type').notNull(),
  log: text('log').notNull(),
  netcore_message: text('netcore_message'),
  netcore_message_id: text('netcore_message_id'),
  netcore_Submitted_at: text('netcore_Submitted_at'),
  netcore_status: text('netcore_status'),
  mobile_number: text('mobile_number'),
  source: text('source'),
});

export const whatsapp_template = pgTable('whatsapp_template', {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint('id', { mode: 'number' }).primaryKey().notNull(),
  template: text('template'),
  template_id: text('template_id'),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  template_credential_id: bigint('template_credential_id', {
    mode: 'number',
  }).notNull(),
  is_active: boolean('is_active').notNull(),
  created_at: timestamp('created_at', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
});

export const whatsapp_template_credentials = pgTable(
  'whatsapp_template_credentials',
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint('id', { mode: 'number' }).primaryKey().notNull(),
    url: text('url'),
    message_type: text('message_type'),
    recipient_type: text('recipient_type'),
    source: text('source'),
    x_apiheader: text('x_apiheader'),
    is_active: boolean('is_active').notNull(),
    created_at: timestamp('created_at', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
  },
);

export const push_notification_token = pgTable('push_notification_token', {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint('id', { mode: 'number' }).primaryKey().notNull(),
  user_code: uuid('user_code').notNull(),
  token: text('token'),
  created_at: timestamp('created_at', { mode: 'string' }).notNull(),
  last_updated_at: timestamp('last_updated_at', { mode: 'string' }).notNull(),
  is_active: boolean('is_active'),
});
