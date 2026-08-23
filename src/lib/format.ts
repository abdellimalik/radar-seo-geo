import { differenceInHours, format, formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

export function formatPublished(iso: string): string {
  const date = new Date(iso);
  const hours = differenceInHours(new Date(), date);
  if (hours < 48) {
    return formatDistanceToNow(date, { addSuffix: true, locale: fr });
  }
  return format(date, "d MMM yyyy", { locale: fr });
}
