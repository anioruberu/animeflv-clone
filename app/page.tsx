// @ts-nocheck
import AnimeGrid from './components/AnimeGrid'

export const dynamic = 'force-dynamic'

export default async function Home () {
  try {
    const baseUrl = process.env.HOST || 'http://localhost:3000'
    const apiUrl = `${baseUrl}/api/latestEpisodes`
    const anime: {
      link: string,
      img: string,
      title: string,
      episode: string
    }[] = await fetch(apiUrl, { next: { revalidate: 300 } }).then((res) => res.json())
    return (
      <AnimeGrid anime={anime} />
    )
  } catch (error) {
    console.error('[v0] Error fetching anime data:', error)
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Error loading anime data</h1>
        <p>Please ensure the API is properly configured and the HOST environment variable is set.</p>
      </div>
    )
  }
}
