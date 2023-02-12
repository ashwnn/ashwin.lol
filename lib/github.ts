const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN
const GITHUB_GRAPHQL_ENDPOINT = `https://api.github.com/graphql`

async function GQLQuery(query: string, variables: any) {
  const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify({
      query,
      variables
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  })
  return response.json()
}

async function getCommits() {
  const query = `query recentCommits($date: DateTime) {
        viewer {
          contributionsCollection(from: $date) {
            totalCommitContributions
          }
        }
      }`
  const date = new Date()
  date.setDate(date.getDate() - 7)
  const variables = {
    date: date.toISOString()
  }

  return GQLQuery(query, variables)
}

async function getUserData() {
  const query = `query {
      viewer {
        starredRepositories(last: 5) {
          edges {
            node {
              name
              url
            }
          }
        }
      }
      }
      `

  return GQLQuery(query, null);
}

export { getCommits, getUserData }