/* eslint-env node */

/* node version v20.12.0 at least =>  //https://nodejs.org/en/download/package-manager 
commands: 
    fnm env --use-on-cd | Out-String | Invoke-Expression
    fnm use --install-if-missing 20
*/
import { fakerEN_US as faker } from '@faker-js/faker'
import { createClient } from '@supabase/supabase-js'

const PROJECT_URL = process.env.SUPABASE_URL
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE

const supabase = createClient(PROJECT_URL, SERVICE_ROLE)

const logErrorAndExit = (tableName, error) => {
  console.error(
    `An error occurred in table '${tableName}' with code ${error.code}: ${error.message}`,
  )
  process.exit(1)
}

const logStep = stepMessage => {
  console.log(stepMessage)
}

const seedProjects = async numEntries => {
  logStep('Seeding projects...')
  const projects = []

  for (let i = 0; i < numEntries; i++) {
    const name = faker.lorem.words(3)

    projects.push({
      name,
      slug: faker.helpers.slugify(name),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      collaborators: faker.helpers.arrayElements([1, 2, 3]),
    })
  }
  const { data, error } = await supabase
    .from('projects')
    .insert(projects)
    .select('id')

  if (error) return logErrorAndExit('Projects', error)

  logStep('Projects seeded successfully.')

  return data
}

const seedTasks = async (numEntries, projectsIds) => {
  logStep('Seeding tasks...')
  const tasks = []

  for (let i = 0; i < numEntries; i++) {
    tasks.push({
      name: faker.lorem.words(3),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      description: faker.lorem.paragraph(),
      due_date: faker.date.future(),
      project_id: faker.helpers.arrayElement(projectsIds),
      collaborators: faker.helpers.arrayElements([1, 2, 3]),
    })
  }

  const { data, error } = await supabase
    .from('tasks')
    .insert(tasks)
    .select('id')

  if (error) return logErrorAndExit('Tasks', error)

  logStep('Tasks seeded successfully.')

  return data
}

const seedDatabase = async numEntriesPerTable => {
  const projectsIds = (await seedProjects(numEntriesPerTable)).map(
    project => project.id,
  )
  await seedTasks(numEntriesPerTable, projectsIds)
}

const numEntriesPerTable = 10

seedDatabase(numEntriesPerTable)
