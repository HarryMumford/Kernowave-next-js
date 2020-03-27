import Link from 'next/link'

export default function Index() {
  return (
    <div>
      <p>Hello Next.js</p>
      <Link href="/about">
        <a>About Page</a>
      </Link>
      <Link href="/beach/8">
        <a>Praa Sands</a>
      </Link>
      <Link href="/beach/3">
        <a>Gwithian</a>
      </Link>
    </div>
  )
}
