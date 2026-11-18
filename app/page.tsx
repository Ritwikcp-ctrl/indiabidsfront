import { Pulse } from "@/components/sections/pulse"
import { Mirror } from "@/components/sections/mirror"
import { TensionFeed } from "@/components/sections/tension-feed"
import { Ritual } from "@/components/sections/ritual"
import { Hall } from "@/components/sections/hall"
import { Whisper } from "@/components/sections/whisper"

export default function Page() {
  return (
    <main>
      <Pulse />
      <Mirror />
      <TensionFeed />
      <Ritual />
      <Hall />
      <Whisper />
    </main>
  )
}
