export const stripPhoneToDigits = (value: string) => value.replace(/\D/g, '');

export const formatPhone = (value: string) => {
  const digits = stripPhoneToDigits(value);

  if (digits.length <= 3) {
    return digits;
  }

  if (digits.length <= 7) {
    return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  }

  if (digits.length <= 11) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
  }

  return digits;
};
