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

const seedProjects = async () => {
  const name = faker.lorem.words(3)

  await supabase.from('projects').insert({
    name: name,
    slug: faker.helpers.slugify(name),
    status: faker.helpers.arrayElement(['in-progress', 'completed']),
    collaborators: faker.helpers.arrayElements([1, 2, 3]),
  })
}

await seedProjects()
