export function phoneValidator(phone) {
  if (!phone) return "Phone can't be empty.";
  if (phone.length != 10) return "Phone must be at least 10 numbers long.";
  return "";
}
