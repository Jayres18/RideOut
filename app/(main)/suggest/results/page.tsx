import ResultsClient from './ResultsClient'

type Props = {
  searchParams: Promise<{ id?: string }>
}

export default async function ResultsPage({ searchParams }: Props) {
  const { id } = await searchParams
  return <ResultsClient id={id ?? null} />
}
