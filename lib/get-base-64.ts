import { getPlaiceholder } from "plaiceholder"

export async function getBase64(src: string) {
  const res = await fetch(src)

  const buffer = await res.arrayBuffer()

  const { base64 } = await getPlaiceholder(Buffer.from(buffer))

  return base64
}