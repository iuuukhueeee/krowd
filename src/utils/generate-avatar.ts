import { botttsNeutral } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

export default function generateAvatar(seed?: string) {
  return createAvatar(botttsNeutral, {
    seed,
  }).toDataUriSync();
}
