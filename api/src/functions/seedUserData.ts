import { PrismaClient } from '@prisma/client';

export const seedUserData = async (db: PrismaClient, userId: number) => {
  const colors = await db.color.createManyAndReturn({
    data: [
      { userId, color: "Blue" },
      { userId, color: "Green" },
      { userId, color: "Yellow" },
      { userId, color: "Orange" },
      { userId, color: "Purple" },
      { userId, color: "Pink" },
      { userId, color: "Brown" },
      { userId, color: "Black" },
      { userId, color: "White" },
      { userId, color: "Gray" },
    ]
  })

  const itemTypes = await db.itemType.createManyAndReturn({
    data: [
      { userId, itemType: "Cooking equipment" },
      { userId, itemType: "Camping equipment" },
      { userId, itemType: "Tools" },
      { userId, itemType: "Furniture" },
      { userId, itemType: "Clothes" },
      { userId, itemType: "Books" },
      { userId, itemType: "Electronics" },
      { userId, itemType: "Toys" },
      { userId, itemType: "Other" },
    ],
  });

  const notesPromise = db.note.createMany({
    data: [
      {
        userId,
        path: "/Home",
        content: [
          "### Welcome to your Daily Buddy!",
          "This is your first note. You can add new notes by clicking on the plus icon.",
          "All notes are prefixed with their parent, so you can organize them as you want.",
        ].join("\n\n"),
      },
      {
        userId,
        path: "/Home/Work",
        content: "A place for all my work notes.",
      },
      {
        userId,
        path: "/Home/Work/Yearly review",
        content: "My notes about this year's review and goals.",
      },
      {
        userId,
        path: "/Home/Personal",
        content: "A place for all my personal notes.",
      },
      {
        userId,
        path: "/Home/Personal/Expenses",
        content: "A place to note all my expenses.",
      }
    ]
  });

  const journalPromise = db.journal.create({
    data: {
      userId,
      content: "A place to write down my thoughts today.",
      forDate: new Date(),
    },
  });

  const personPromise1 =  db.person.create({
    data: {
      userId,
      name: "Mom",
    },
  });
  const personPromise2 = db.person.create({
    data: {
      userId,
      name: "Dad",
      CallLog: {
        create: {
          userId,
          note: "Here's where I write notes about my last call with mom.",
        },
      },
    },
  });

  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
  const tenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 10));
  const streaksPromise = db.streak.createMany({
    data: [
      {
        userId,
        name: "Be a better person",
        last_date: yesterday,
      },
      {
        userId,
        name: "No junk food",
        last_date: tenDaysAgo,
      }
    ],
  });

  const tasksPromise = db.task.createMany({
    data: [
      {
        userId,
        title: "Try out Daily Buddy :)",
        completed: false,
        dueDate: new Date(),
        priority: 3,
      },
      {
        userId,
        title: "Write a journal entry for today",
        completed: false,
        dueDate: new Date(),
        priority: 3,
      },
      {
        userId,
        title: "Write a call log for my last call with dad",
        completed: false,
        dueDate: new Date(),
        priority: 3,
      },
      {
        userId,
        title: "Change the Filestack API key in Settings",
        completed: false,
        dueDate: new Date(),
        priority: 3,
      },
      {
        userId,
        title: "Repaint the house",
        completed: false,
        dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
        priority: 5,
      },
      {
        userId,
        title: "Sign up for a gym membership",
        completed: true,
        completedAt: yesterday,
        dueDate: yesterday,
        priority: 2,
      }
    ],
  });

  const roomPromise1 = db.room.create({
    data: {
      userId,
      name: "Kitchen",
      StorageUnit: {
        create: {
          userId,
          name: "Cabinet",
          Drawer: {
            create: {
              userId,
              level: 5,
              note: "The top shelf on the left.",
              Item: {
                create: {
                  userId,
                  name: "Spices",
                  colorId: colors[0].id,
                  itemTypeId: itemTypes[0].id,
                },
              },
            },
          },
        },
      },
    },
  });
  const roomPromise2 = db.room.create({
    data: {
      userId,
      name: "Living room",
      StorageUnit: {
        create: {
          userId,
          name: "Bookshelf",
          Drawer: {
            create: {
              userId,
              level: 1,
              note: "Left side of the shelf.",
              Item: {
                create: {
                  userId,
                  name: "The old tablet",
                  colorId: colors[1].id,
                  itemTypeId: itemTypes[6].id,
                },
              },
            },
          },
        },
      },
    },
  });
  const roomPromise3 = db.room.create({
    data: {
      userId,
      name: "Bedroom",
      StorageUnit: {
        create: {
          userId,
          name: "The large dresser",
          Drawer: {
            create: {
              userId,
              level: 2,
              note: "At the bottom.",
              Item: {
                create: {
                  userId,
                  name: "Winter coat",
                  colorId: colors[2].id,
                  itemTypeId: itemTypes[4].id,
                },
              },
            },
          },
        },
      },
    },
  });

  const shoppingListPromise1 = db.shoppingList.create({
    data: {
      userId,
      name: "Groceries",
      ShoppingListItem: {
        create: [
          { name: "Apples" },
          { name: "Bananas" },
          { name: "Oranges" },
          { name: "Pineapple", bought: true },
          { name: "Strawberries", bought: true },
        ],
      },
    },
  });

  const shoppingListPromise2 = db.shoppingList.create({
    data: {
      userId,
      name: "Amazon",
      ShoppingListItem: {
        create: [
          { name: "Amazon gift card" },
          { name: "A new tablet" },
          { name: "A new phone", bought: true },
        ],
      },
    },
  });

  await db.grocery.createMany({
    data: [
      {
        userId,
        name: "Apples",
        boughtAt: new Date(),
        expireAt: new Date(new Date().setDate(new Date().getDate() + 10)),
      },
      {
        userId,
        name: "Bananas",
        boughtAt: new Date(),
        expireAt: new Date(new Date().setDate(new Date().getDate() + 1)),
      },
    ],
  });

  const projectPromise = db.project.create({
    data: {
      userId,
      name: "Best website ever",
      description: "Build the new website for my business",
      ProjectStage: {
        create: [
          { name: "Research", 
            ProjectTask: {
              create: [
                { name: "Check similar websites", status: "PENDING", labels: ["Research"] },
              ],
            },
          },
          { name: "Design", 
            ProjectTask: {
              create: [
                { name: "Find a designer", status: "PENDING", labels: ["Design"] },
              ],
            },
          },
          { name: "Development", 
            ProjectTask: {
              create: [
                { name: "Find a developer to implement the design", status: "PENDING", labels: ["Development"] },
              ],
            },
          },
          { name: "Deployment", 
            ProjectTask: {
              create: [
                { name: "Deploy the website", status: "PENDING", labels: ["Deployment"] },
              ],
            },
          },
        ],
      },
    },
  });
  const settingsPromise = db.setting.create({
    data: {
      key: "filestack_api_key",
      value: "CHANGE_ME",
    },
  });

  const calendarPromise = db.calendar.createMany({
    data: [
      {
        color: "#FF0000",
        title: "Funny holidays calendar",
        userId,
        url: "https://www.webcal.guru/en-US/download_calendar?calendar_instance_id=10",
      },
      {
        color: "#FF0000",
        title: "Premiere movies",
        userId,
        url: "https://www.webcal.guru/en-US/download_calendar?calendar_instance_id=23593",
      },
    ],
  });

  await Promise.all([
    notesPromise,
    journalPromise,
    personPromise1, 
    personPromise2, 
    streaksPromise, 
    tasksPromise, 
    roomPromise1, 
    roomPromise2, 
    roomPromise3, 
    shoppingListPromise1, 
    shoppingListPromise2, 
    projectPromise,
    settingsPromise,
    calendarPromise,
  ]);
}