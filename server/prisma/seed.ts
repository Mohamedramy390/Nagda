import 'dotenv/config';
import { PrismaClient, TicketStatus, TicketPriority, UserRole } from '../generated/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting database seed...');

  // ─── Clean Up ────────────────────────────────────────────────────────────────
  await prisma.message.deleteMany();
  await prisma.ticket.deleteMany();
  await prisma.user.deleteMany();
  await prisma.slaPolicy.deleteMany();
  await prisma.department.deleteMany();
  await prisma.office.deleteMany();
  console.log('🧹 Cleared existing data');

  // ─── Offices ─────────────────────────────────────────────────────────────────
  const cairoOffice = await prisma.office.create({
    data: { name: 'Cairo HQ', timeZone: 'Africa/Cairo' },
  });
  const alexOffice = await prisma.office.create({
    data: { name: 'Alexandria Branch', timeZone: 'Africa/Cairo' },
  });
  console.log('🏢 Created offices');

  // ─── Departments ─────────────────────────────────────────────────────────────
  const itDept = await prisma.department.create({ data: { name: 'IT Support' } });
  const hrDept = await prisma.department.create({ data: { name: 'Human Resources' } });
  const financeDept = await prisma.department.create({ data: { name: 'Finance' } });
  const supportDept = await prisma.department.create({ data: { name: 'Customer Support' } });
  console.log('🏛️  Created departments');

  // ─── SLA Policies ────────────────────────────────────────────────────────────
  const slaLow = await prisma.slaPolicy.create({
    data: {
      name: 'Standard – Low Priority',
      priority: TicketPriority.LOW,
      responseTimeMin: 480,   // 8 hours
      resolutionTimeMin: 4320, // 3 days
      is24x7: false,
    },
  });
  const slaMedium = await prisma.slaPolicy.create({
    data: {
      name: 'Standard – Medium Priority',
      priority: TicketPriority.MEDIUM,
      responseTimeMin: 240,   // 4 hours
      resolutionTimeMin: 1440, // 1 day
      is24x7: false,
    },
  });
  const slaHigh = await prisma.slaPolicy.create({
    data: {
      name: 'Critical – High Priority',
      priority: TicketPriority.HIGH,
      responseTimeMin: 60,    // 1 hour
      resolutionTimeMin: 480,  // 8 hours
      is24x7: true,
    },
  });
  console.log('📋 Created SLA policies');

  // ─── Users ───────────────────────────────────────────────────────────────────
  const hashPassword = (pwd: string) => bcrypt.hash(pwd, 10);

  const admin = await prisma.user.create({
    data: {
      name: 'Ahmed Hassan',
      email: 'admin@nagda.io',
      password: await hashPassword('Admin@1234'),
      phone: '+201001234567',
      role: UserRole.ADMIN,
      position: 'System Administrator',
      departmentId: itDept.id,
      officeId: cairoOffice.id,
    },
  });

  const agent1 = await prisma.user.create({
    data: {
      name: 'Sara Mohamed',
      email: 'sara.agent@nagda.io',
      password: await hashPassword('Agent@1234'),
      phone: '+201012345678',
      role: UserRole.AGENT,
      position: 'IT Support Specialist',
      departmentId: itDept.id,
      officeId: cairoOffice.id,
    },
  });

  const agent2 = await prisma.user.create({
    data: {
      name: 'Khaled Omar',
      email: 'khaled.agent@nagda.io',
      password: await hashPassword('Agent@1234'),
      phone: '+201023456789',
      role: UserRole.AGENT,
      position: 'Customer Support Lead',
      departmentId: supportDept.id,
      officeId: alexOffice.id,
    },
  });

  const agent3 = await prisma.user.create({
    data: {
      name: 'Nour Salah',
      email: 'nour.agent@nagda.io',
      password: await hashPassword('Agent@1234'),
      phone: '+201034567890',
      role: UserRole.AGENT,
      position: 'Finance Support Agent',
      departmentId: financeDept.id,
      officeId: cairoOffice.id,
    },
  });

  const employee1 = await prisma.user.create({
    data: {
      name: 'Mona Adel',
      email: 'mona.employee@nagda.io',
      password: await hashPassword('Employee@1234'),
      phone: '+201045678901',
      role: UserRole.EMPLOYEE,
      position: 'HR Coordinator',
      departmentId: hrDept.id,
      officeId: cairoOffice.id,
    },
  });

  const customer1 = await prisma.user.create({
    data: {
      name: 'Youssef Ibrahim',
      email: 'youssef@example.com',
      password: await hashPassword('Customer@1234'),
      phone: '+201056789012',
      role: UserRole.CUSTOMER,
      position: '',
    },
  });

  const customer2 = await prisma.user.create({
    data: {
      name: 'Layla Farouk',
      email: 'layla@example.com',
      password: await hashPassword('Customer@1234'),
      phone: '+201067890123',
      role: UserRole.CUSTOMER,
      position: '',
    },
  });

  const customer3 = await prisma.user.create({
    data: {
      name: 'Tarek Mansour',
      email: 'tarek@example.com',
      password: await hashPassword('Customer@1234'),
      phone: '+201078901234',
      role: UserRole.CUSTOMER,
      position: '',
    },
  });
  console.log('👥 Created users');

  // ─── Tickets ─────────────────────────────────────────────────────────────────
  const now = new Date();
  const hoursAgo = (h: number) => new Date(now.getTime() - h * 60 * 60 * 1000);
  const hoursFromNow = (h: number) => new Date(now.getTime() + h * 60 * 60 * 1000);

  // Ticket 1 – High priority, open, no agent yet
  const ticket1 = await prisma.ticket.create({
    data: {
      subject: 'Unable to access company VPN',
      status: TicketStatus.OPEN,
      priority: TicketPriority.HIGH,
      category: 'Network',
      description: 'I cannot connect to the VPN since this morning. I get "Authentication failed" even though my credentials are correct.',
      departmentId: itDept.id,
      requesterId: customer1.id,
      slaPolicyId: slaHigh.id,
      responseDueAt: hoursFromNow(1),
      resolutionDueAt: hoursFromNow(8),
      createdAt: hoursAgo(0.5),
    },
  });

  // Ticket 2 – Medium priority, in progress, assigned
  const ticket2 = await prisma.ticket.create({
    data: {
      subject: 'Laptop screen flickering intermittently',
      status: TicketStatus.IN_PROGRESS,
      priority: TicketPriority.MEDIUM,
      category: 'Hardware',
      description: 'My laptop screen starts flickering after about 20 minutes of use. It stops when I shake the lid slightly.',
      departmentId: itDept.id,
      requesterId: customer2.id,
      agentId: agent1.id,
      slaPolicyId: slaMedium.id,
      responseDueAt: hoursFromNow(2),
      resolutionDueAt: hoursFromNow(22),
      createdAt: hoursAgo(2),
    },
  });

  // Ticket 3 – Low priority, open
  const ticket3 = await prisma.ticket.create({
    data: {
      subject: 'Request for additional software license',
      status: TicketStatus.OPEN,
      priority: TicketPriority.LOW,
      category: 'Software',
      description: 'Our team needs an additional license for Adobe Acrobat Pro. Please advise on the procurement process.',
      departmentId: itDept.id,
      requesterId: employee1.id,
      slaPolicyId: slaLow.id,
      responseDueAt: hoursFromNow(7),
      resolutionDueAt: hoursFromNow(70),
      createdAt: hoursAgo(5),
    },
  });

  // Ticket 4 – High priority, in progress, assigned
  const ticket4 = await prisma.ticket.create({
    data: {
      subject: 'Payment gateway returning 500 errors',
      status: TicketStatus.IN_PROGRESS,
      priority: TicketPriority.HIGH,
      category: 'Billing',
      description: 'Customers are unable to complete checkout. The payment gateway is returning HTTP 500 errors since 09:00 AM.',
      departmentId: financeDept.id,
      requesterId: customer3.id,
      agentId: agent3.id,
      slaPolicyId: slaHigh.id,
      responseDueAt: hoursFromNow(0.5),
      resolutionDueAt: hoursFromNow(6),
      createdAt: hoursAgo(1),
    },
  });

  // Ticket 5 – Medium priority, closed
  const ticket5 = await prisma.ticket.create({
    data: {
      subject: 'Email notifications not being delivered',
      status: TicketStatus.CLOSED,
      priority: TicketPriority.MEDIUM,
      category: 'Email',
      description: 'System email notifications for order confirmations stopped working. Customers are not receiving their order receipts.',
      departmentId: supportDept.id,
      requesterId: customer1.id,
      agentId: agent2.id,
      slaPolicyId: slaMedium.id,
      responseDueAt: hoursAgo(20),
      resolutionDueAt: hoursAgo(5),
      resolvedAt: hoursAgo(6),
      closedAt: hoursAgo(3),
      createdAt: hoursAgo(30),
    },
  });

  // Ticket 6 – Low priority, closed
  const ticket6 = await prisma.ticket.create({
    data: {
      subject: 'Update department listing on company portal',
      status: TicketStatus.CLOSED,
      priority: TicketPriority.LOW,
      category: 'General',
      description: 'The HR department name on the employee portal is outdated. Please update it to "People & Culture".',
      departmentId: hrDept.id,
      requesterId: employee1.id,
      agentId: agent1.id,
      slaPolicyId: slaLow.id,
      resolvedAt: hoursAgo(48),
      closedAt: hoursAgo(47),
      createdAt: hoursAgo(72),
    },
  });
  console.log('🎫 Created tickets');

  // ─── Messages ────────────────────────────────────────────────────────────────
  // Ticket 1 messages
  await prisma.message.createMany({
    data: [
      {
        content: 'I cannot connect to the VPN since this morning. I get "Authentication failed" even though my credentials are correct. This is urgent as I work remotely.',
        ticketId: ticket1.id,
        userId: customer1.id,
        createdAt: hoursAgo(0.5),
      },
    ],
  });

  // Ticket 2 messages
  await prisma.message.createMany({
    data: [
      {
        content: 'My laptop screen starts flickering after about 20 minutes of use. Model is Dell XPS 15, 2 years old.',
        ticketId: ticket2.id,
        userId: customer2.id,
        createdAt: hoursAgo(2),
      },
      {
        content: 'Thank you for reaching out. I have assigned this to myself. Could you please tell me if the flickering happens on an external monitor too?',
        ticketId: ticket2.id,
        userId: agent1.id,
        createdAt: hoursAgo(1.5),
      },
      {
        content: "I tried with an external monitor and it's fine there. The issue seems specific to the laptop screen.",
        ticketId: ticket2.id,
        userId: customer2.id,
        createdAt: hoursAgo(1),
      },
      {
        content: "That suggests a loose display cable or a failing LCD. I'll schedule an in-person inspection for tomorrow. Does 10 AM work for you?",
        ticketId: ticket2.id,
        userId: agent1.id,
        createdAt: hoursAgo(0.75),
      },
    ],
  });

  // Ticket 4 messages
  await prisma.message.createMany({
    data: [
      {
        content: 'URGENT: Our payment gateway is down. Customers cannot checkout. Revenue impact is high. Please escalate immediately.',
        ticketId: ticket4.id,
        userId: customer3.id,
        createdAt: hoursAgo(1),
      },
      {
        content: "I am on it. I've identified a configuration change that was pushed this morning. Rolling back now.",
        ticketId: ticket4.id,
        userId: agent3.id,
        createdAt: hoursAgo(0.75),
      },
      {
        content: 'Rollback in progress. ETA 15 minutes. Will update you shortly.',
        ticketId: ticket4.id,
        userId: agent3.id,
        createdAt: hoursAgo(0.5),
      },
    ],
  });

  // Ticket 5 messages (closed)
  await prisma.message.createMany({
    data: [
      {
        content: 'Order confirmation emails have stopped going out. Customers are complaining. Please help ASAP.',
        ticketId: ticket5.id,
        userId: customer1.id,
        createdAt: hoursAgo(30),
      },
      {
        content: "I've looked into this. The SMTP configuration had an expired API key. I've rotated it and emails are flowing again.",
        ticketId: ticket5.id,
        userId: agent2.id,
        createdAt: hoursAgo(27),
      },
      {
        content: 'Confirmed, emails are working now. Thank you for the quick fix!',
        ticketId: ticket5.id,
        userId: customer1.id,
        createdAt: hoursAgo(26),
      },
      {
        content: 'Great! Closing this ticket. Let us know if the issue recurs.',
        ticketId: ticket5.id,
        userId: agent2.id,
        createdAt: hoursAgo(25),
      },
    ],
  });

  // Ticket 6 messages (closed)
  await prisma.message.createMany({
    data: [
      {
        content: 'Please update the HR department name on the employee portal to "People & Culture".',
        ticketId: ticket6.id,
        userId: employee1.id,
        createdAt: hoursAgo(72),
      },
      {
        content: 'Done! The name has been updated across the portal. Please verify and let me know if anything else needs changing.',
        ticketId: ticket6.id,
        userId: agent1.id,
        createdAt: hoursAgo(50),
      },
      {
        content: 'Looks perfect, thank you!',
        ticketId: ticket6.id,
        userId: employee1.id,
        createdAt: hoursAgo(49),
      },
    ],
  });

  console.log('💬 Created messages');

  // ─── Summary ─────────────────────────────────────────────────────────────────
  console.log('\n✅ Seed complete!');
  console.log('──────────────────────────────────────');
  console.log('  Offices     :', 2);
  console.log('  Departments :', 4);
  console.log('  SLA Policies:', 3);
  console.log('  Users       :', 8, '(1 admin, 3 agents, 1 employee, 3 customers)');
  console.log('  Tickets     :', 6);
  console.log('  Messages    :', 12);
  console.log('──────────────────────────────────────');
  console.log('\n🔑 Login credentials (all roles):');
  console.log('  Admin    → admin@nagda.io        / Admin@1234');
  console.log('  Agent 1  → sara.agent@nagda.io   / Agent@1234');
  console.log('  Agent 2  → khaled.agent@nagda.io / Agent@1234');
  console.log('  Agent 3  → nour.agent@nagda.io   / Agent@1234');
  console.log('  Employee → mona.employee@nagda.io / Employee@1234');
  console.log('  Customer → youssef@example.com   / Customer@1234');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
