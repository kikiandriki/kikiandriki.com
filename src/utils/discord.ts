/**
 * Discord related utilities.
 */

/**
 * Convert an avatar hash to an avatar URL.
 */
export function getAvatarUrl(
  userId: string,
  avatarHash: string | null,
  discriminator: string,
  guildOverride: boolean = false,
): string {
  if (avatarHash) {
    if (guildOverride) {
      return `https://cdn.discordapp.com/guilds/558027628502712330/users/${userId}/avatars/${avatarHash}.png`
    }
    return `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.png`
  }
  return `https://cdn.discordapp.com/embed/avatars/${
    parseInt(discriminator || "0") % 5
  }.png`
}
