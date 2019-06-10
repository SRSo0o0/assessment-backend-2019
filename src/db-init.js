const { User, Incident } = require('./domain/models')

async function seedUsers() {

  await User.deleteMany({});

  const user1 = new User({
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Engineer',
  });

  const user2 = new User({
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    role: 'Supervisor',
  });

  const user3 = new User({
    name: 'Jane Woe',
    email: 'jane.Woe@example.com',
    role: 'Supervisor',
  });

  const user4 = new User({
    name: 'John Koe',
    email: 'john.koe@example.com',
    role: 'Engineer',
  });
  const eng1 = await user1.save();
  await user2.save();
  await user3.save();
  const eng2 = await user4.save();

  const incdnt1 = new Incident({
    title: 'first Incident',
    description: 'populated first incident',
    assignee: eng1._id.toString(),
    status: 'Created',
  })

  const incdnt2 = new Incident({
    title: 'Second Incident',
    description: 'populated Second incident',
    assignee: eng2._id.toString(),
    status: 'Created',
  })

  await incdnt1.save();
  await incdnt2.save();

  console.log('INFO: User DB seeded')

}

module.exports = {
  seedUsers,
}
